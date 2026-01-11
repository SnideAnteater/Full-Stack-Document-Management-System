export enum DocumentType {
  PDF = "PDF",
  DOCX = "DOCX",
  TXT = "TXT",
  XLSX = "XLSX",
  PPTX = "PPTX",
  IMAGE = "IMAGE",
  OTHER = "OTHER",
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size?: number | null;
  createdAt: Date;
  updatedAt: Date;
  folderId?: string | null;
}

export interface Folder {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  documentCount?: number;
}

export interface DocumentRow {
  id: string;
  name: string;
  type: DocumentType;
  size?: number | null;
  folder_id?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface FolderRow {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateDocumentRequest {
  name: string;
  type: DocumentType;
  folderId?: string | null;
}

export interface CreateFolderRequest {
  name: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
}

export interface QueryResult {
  affectedRows: number;
  insertId: number;
}
