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

export interface DocumentUploadFormProps {
  onSubmit: (data: DocumentUploadFormData) => void;
  onCancel?: () => void;
}

export function DocumentUploadForm({
  onSubmit,
  onCancel,
}: DocumentUploadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DocumentUploadFormData>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: {
      name: "",
      type: DocumentType.PDF,
      folderId: null,
    },
  });

  const onFormSubmit = (data: DocumentUploadFormData) => {
    onSubmit(data);
    reset();
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

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          <Upload className="h-4 w-4" />
          {isSubmitting ? "Adding..." : "Add Document"}
        </Button>
      </div>
    </form>
  );
}
