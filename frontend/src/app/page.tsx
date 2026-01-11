"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Document,
  Folder,
  DocumentType,
  DocumentUploadFormData,
  FolderCreateFormData,
} from "@/types";
import { generateId, filterDocuments, filterFolders } from "@/lib/utils";
import { DocumentList } from "@/components/documents/DocumentList";
import { FolderGrid } from "@/components/folders/FolderGrid";
import { SearchBar } from "@/components/search/SearchBar";
import { DocumentUploadForm } from "@/components/forms/DocumentUploadForm";
import { FolderUploadForm } from "@/components/forms/FolderUploadForm";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, FilePlus, FolderPlus } from "lucide-react";
import { documentsApi } from "@/lib/api/document.service";
import { foldersApi } from "@/lib/api/folder.service";

// Sample initial data
const initialDocuments: Document[] = [
  {
    id: "1",
    name: "Project Proposal.pdf",
    type: DocumentType.PDF,
    size: 2048000,
    createdAt: new Date("2026-01-05T10:30:00"),
    updatedAt: new Date("2026-01-05T10:30:00"),
    folderId: null,
  },
  {
    id: "2",
    name: "Financial Report.xlsx",
    type: DocumentType.XLSX,
    size: 512000,
    createdAt: new Date("2026-01-06T14:20:00"),
    updatedAt: new Date("2026-01-06T14:20:00"),
    folderId: null,
  },
  {
    id: "3",
    name: "Meeting Notes.txt",
    type: DocumentType.TXT,
    size: 8192,
    createdAt: new Date("2026-01-07T09:15:00"),
    updatedAt: new Date("2026-01-07T09:15:00"),
    folderId: null,
  },
];

const initialFolders: Folder[] = [
  {
    id: "f1",
    name: "Projects",
    createdAt: new Date("2026-01-01T08:00:00"),
    updatedAt: new Date("2026-01-01T08:00:00"),
    documentCount: 5,
  },
  {
    id: "f2",
    name: "Reports",
    createdAt: new Date("2026-01-02T10:00:00"),
    updatedAt: new Date("2026-01-02T10:00:00"),
    documentCount: 3,
  },
];

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFolderName, setSelectedFolderName] = useState<string>("");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [docsData, foldersData] = await Promise.all([
        documentsApi.getAll(),
        foldersApi.getAll(),
      ]);
      // console.log("Fetched documents:", docsData);
      setDocuments(docsData);
      setFolders(foldersData);
    } catch (err) {
      console.error("Failed to load data:", err);
      setError("Failed to load data. Please check if the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFolderClick = async (folderId: string) => {
    try {
      setIsLoading(true);
      const folderDocs = await foldersApi.getDocumentsByFolderId(folderId);
      const folder = folders.find((f) => f.id === folderId);
      setDocuments(folderDocs);
      setSelectedFolderId(folderId);
      setSelectedFolderName(folder?.name || "");
    } catch (err) {
      console.error("Failed to load folder documents:", err);
      setError("Failed to load folder documents");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToAll = async () => {
    setSelectedFolderId(null);
    setSelectedFolderName("");
    await loadData();
  };

  // Filter documents and folders based on search query
  const filteredDocuments = useMemo(
    () => filterDocuments(documents, { query: searchQuery, type: "all" }),
    [documents, searchQuery]
  );

  const filteredFolders = useMemo(
    () => filterFolders(folders, searchQuery),
    [folders, searchQuery]
  );

  const handleAddDocument = (data: DocumentUploadFormData) => {
    setIsDocumentModalOpen(false);
    // Reload data to get the updated list
    if (selectedFolderId) {
      handleFolderClick(selectedFolderId);
    } else {
      loadData();
    }
  };

  const handleAddFolder = (data: FolderCreateFormData) => {
    setIsFolderModalOpen(false);
    loadData();
  };

  const handleDeleteDocument = async (id: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      try {
        await documentsApi.deleteDocument(id);
        if (selectedFolderId) {
          handleFolderClick(selectedFolderId);
        } else {
          loadData();
        }
      } catch (err) {
        console.error("Failed to delete document:", err);
        setError("Failed to delete document");
      }
    }
  };

  const handleDeleteFolder = async (id: string) => {
    if (confirm("Are you sure you want to delete this folder?")) {
      try {
        await foldersApi.deleteFolder(id);
        loadData();
      } catch (err) {
        console.error("Failed to delete folder:", err);
        setError("Failed to delete folder");
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Document Management System
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Manage your documents and folders efficiently
          </p>
        </div>

        {/* Search and Actions */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 sm:max-w-md">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setIsDocumentModalOpen(true)}>
              <FilePlus className="h-4 w-4" />
              Add Document
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsFolderModalOpen(true)}
            >
              <FolderPlus className="h-4 w-4" />
              New Folder
            </Button>
          </div>
        </div>

        {/* Back Button and Breadcrumb */}
        {selectedFolderId && (
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleBackToAll}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Documents
            </Button>
            <h2 className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {selectedFolderName}
            </h2>
          </div>
        )}

        {/* Folders Section */}
        {filteredFolders.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Folders
            </h2>
            <FolderGrid
              folders={filteredFolders}
              onDelete={handleDeleteFolder}
              onFolderClick={handleFolderClick}
            />
          </div>
        )}

        {/* Documents Section */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Documents
          </h2>
          <DocumentList
            documents={filteredDocuments}
            onDelete={handleDeleteDocument}
          />
        </div>

        {/* Modals */}
        <Modal
          isOpen={isDocumentModalOpen}
          onClose={() => setIsDocumentModalOpen(false)}
          title="Add New Document"
        >
          <DocumentUploadForm
            onSubmit={handleAddDocument}
            onCancel={() => setIsDocumentModalOpen(false)}
          />
        </Modal>

        <Modal
          isOpen={isFolderModalOpen}
          onClose={() => setIsFolderModalOpen(false)}
          title="Create New Folder"
        >
          <FolderUploadForm
            onSubmit={handleAddFolder}
            onCancel={() => setIsFolderModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
}
