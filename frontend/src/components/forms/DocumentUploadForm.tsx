"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  documentUploadSchema,
  DocumentUploadFormData,
  DocumentType,
} from "@/types";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Upload } from "lucide-react";
import { documentsApi } from "@/lib/api/document.service";
import { foldersApi } from "@/lib/api/folder.service";
import { useEffect, useState } from "react";

export interface DocumentUploadFormProps {
  onSubmit?: (data: DocumentUploadFormData) => void;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export function DocumentUploadForm({
  onSubmit,
  onCancel,
  onSuccess,
}: DocumentUploadFormProps) {
  const [folders, setFolders] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [isLoadingFolders, setIsLoadingFolders] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<DocumentUploadFormData>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: {
      name: "",
      type: DocumentType.PDF,
      folderId: null,
    },
  });

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const data = await foldersApi.getAll();
        const folderOptions = [
          { value: "", label: "No Folder (Root)" },
          ...data.map((folder) => ({
            value: folder.id,
            label: folder.name,
          })),
        ];
        setFolders(folderOptions);
      } catch (error) {
        console.error("Failed to fetch folders:", error);
        setFolders([{ value: "", label: "No Folder (Root)" }]);
      } finally {
        setIsLoadingFolders(false);
      }
    };

    fetchFolders();
  }, []);

  const onFormSubmit = async (data: DocumentUploadFormData) => {
    try {
      // Convert empty string to null for folderId
      const submitData = {
        ...data,
        folderId: data.folderId || null,
      };

      await documentsApi.uploadDocument(submitData);

      reset();
      onSuccess?.();
      onSubmit?.(submitData);
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error ? error.message : "Failed to upload document",
      });
    }
  };

  const documentTypeOptions = Object.values(DocumentType).map((type) => ({
    value: type,
    label: type,
  }));

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <Input
        {...register("name")}
        id="document-name"
        label="Document Name"
        placeholder="Enter document name (e.g., Report.pdf)"
        error={errors.name?.message}
        autoFocus
      />

      <Select
        {...register("type")}
        id="document-type"
        label="Document Type"
        options={documentTypeOptions}
        error={errors.type?.message}
      />

      <Select
        {...register("folderId")}
        id="folder-select"
        label="Folder"
        options={folders}
        error={errors.folderId?.message}
        disabled={isLoadingFolders}
      />

      {errors.root && (
        <p className="text-sm text-red-600">{errors.root.message}</p>
      )}

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          <Upload className="h-4 w-4" />
          {isSubmitting ? "Uploading..." : "Upload Document"}
        </Button>
      </div>
    </form>
  );
}
