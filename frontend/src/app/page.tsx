"use client";

import { useState, useMemo } from "react";
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
import { FilePlus, FolderPlus } from "lucide-react";

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
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

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
    const newDocument: Document = {
      id: generateId(),
      name: data.name,
      type: data.type,
      size: Math.floor(Math.random() * 5000000), // Random size for demo
      createdAt: new Date(),
      updatedAt: new Date(),
      folderId: data.folderId,
    };

    setDocuments((prev) => [newDocument, ...prev]);
    setIsDocumentModalOpen(false);
  };

  const handleAddFolder = (data: FolderCreateFormData) => {
    const newFolder: Folder = {
      id: generateId(),
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      documentCount: 0,
    };

    setFolders((prev) => [newFolder, ...prev]);
    setIsFolderModalOpen(false);
  };

  const handleDeleteDocument = (id: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    }
  };

  const handleDeleteFolder = (id: string) => {
    if (confirm("Are you sure you want to delete this folder?")) {
      setFolders((prev) => prev.filter((folder) => folder.id !== id));
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

        {/* Folders Section */}
        {filteredFolders.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Folders
            </h2>
            <FolderGrid
              folders={filteredFolders}
              onDelete={handleDeleteFolder}
              onFolderClick={(id) => console.log("Folder clicked:", id)}
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
