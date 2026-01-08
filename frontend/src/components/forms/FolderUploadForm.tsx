"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { folderCreateSchema, FolderCreateFormData } from "@/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FolderPlus } from "lucide-react";

export interface FolderUploadFormProps {
  onSubmit: (data: FolderCreateFormData) => void;
  onCancel?: () => void;
}

export function FolderUploadForm({
  onSubmit,
  onCancel,
}: FolderUploadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FolderCreateFormData>({
    resolver: zodResolver(folderCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  const onFormSubmit = (data: FolderCreateFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <Input
        {...register("name")}
        id="folder-name"
        label="Folder Name"
        placeholder="Enter folder name"
        error={errors.name?.message}
        autoFocus
      />

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          <FolderPlus className="h-4 w-4" />
          {isSubmitting ? "Creating..." : "Create Folder"}
        </Button>
      </div>
    </form>
  );
}
