import { z } from "zod";

// Response interface
export interface Response {
  success: boolean;
  data?: any;
}

// Document types enum
export enum DocumentType {
  PDF = "PDF",
  DOCX = "DOCX",
  TXT = "TXT",
  XLSX = "XLSX",
  PPTX = "PPTX",
  IMAGE = "IMAGE",
  OTHER = "OTHER",
}

// Document interface
export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size?: number; // in bytes
  createdAt: Date;
  updatedAt: Date;
  folderId?: string | null;
}

// Folder interface
export interface Folder {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  documentCount?: number;
}

// Zod validation schema for document upload
export const documentUploadSchema = z.object({
  name: z
    .string()
    .min(1, "Document name is required")
    .max(255, "Document name must be less than 255 characters")
    .regex(/^[^<>:"/\\|?*]+$/, "Document name contains invalid characters"),
  type: z.nativeEnum(DocumentType, {
    message: "Please select a valid document type",
  }),
  folderId: z.string().optional().nullable(),
});

export type DocumentUploadFormData = z.infer<typeof documentUploadSchema>;

// Zod validation schema for folder creation
export const folderCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Folder name is required")
    .max(255, "Folder name must be less than 255 characters")
    .regex(/^[^<>:"/\\|?*]+$/, "Folder name contains invalid characters"),
});

export type FolderCreateFormData = z.infer<typeof folderCreateSchema>;

// Search filter type
export interface SearchFilter {
  query: string;
  type?: DocumentType | "folder" | "all";
}
