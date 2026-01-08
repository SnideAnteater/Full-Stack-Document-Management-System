import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Document, Folder, DocumentType, SearchFilter } from "@/types";

/**
 * Merges Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Filter documents based on search query and type
 */
export function filterDocuments(
  documents: Document[],
  filter: SearchFilter
): Document[] {
  let filtered = documents;

  // Filter by search query
  if (filter.query.trim()) {
    const query = filter.query.toLowerCase();
    filtered = filtered.filter((doc) => doc.name.toLowerCase().includes(query));
  }

  // Filter by type
  if (filter.type && filter.type !== "all" && filter.type !== "folder") {
    filtered = filtered.filter((doc) => doc.type === filter.type);
  }

  return filtered;
}

/**
 * Filter folders based on search query
 */
export function filterFolders(folders: Folder[], query: string): Folder[] {
  if (!query.trim()) {
    return folders;
  }

  const searchQuery = query.toLowerCase();
  return folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery)
  );
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
}

/**
 * Infer document type from file extension
 */
export function inferDocumentType(filename: string): DocumentType {
  const ext = getFileExtension(filename);

  const typeMap: Record<string, DocumentType> = {
    pdf: DocumentType.PDF,
    doc: DocumentType.DOCX,
    docx: DocumentType.DOCX,
    txt: DocumentType.TXT,
    xls: DocumentType.XLSX,
    xlsx: DocumentType.XLSX,
    ppt: DocumentType.PPTX,
    pptx: DocumentType.PPTX,
    jpg: DocumentType.IMAGE,
    jpeg: DocumentType.IMAGE,
    png: DocumentType.IMAGE,
    gif: DocumentType.IMAGE,
    svg: DocumentType.IMAGE,
  };

  return typeMap[ext] || DocumentType.OTHER;
}

/**
 * Generate a unique ID (simple implementation for demo)
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
