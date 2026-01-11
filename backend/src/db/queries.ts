import pool from "./database";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import {
  Document,
  Folder,
  DocumentRow,
  FolderRow,
  DocumentType,
  CreateDocumentRequest,
  CreateFolderRequest,
} from "../types";
import { nanoid } from "nanoid";

// Helper functions

function rowToDocument(row: DocumentRow): Document {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    size: row.size || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    folderId: row.folder_id || undefined,
  };
}

function rowToFolder(row: FolderRow & { document_count?: number }): Folder {
  return {
    id: row.id,
    name: row.name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    documentCount: row.document_count || 0,
  };
}

// Document Queries

export async function getAllDocuments(): Promise<Document[]> {
  const [rows] = await pool.query<DocumentRow[] & RowDataPacket[]>(
    "SELECT * FROM documents ORDER BY created_at DESC"
  );
  return rows.map(rowToDocument);
}

export async function getDocumentById(id: string): Promise<Document | null> {
  const [rows] = await pool.query<DocumentRow[] & RowDataPacket[]>(
    "SELECT * FROM documents WHERE id = ?",
    [id]
  );
  return rows.length > 0 ? rowToDocument(rows[0]) : null;
}

export async function getDocumentsByFolderId(
  folderId: string
): Promise<Document[]> {
  const [rows] = await pool.query<DocumentRow[] & RowDataPacket[]>(
    "SELECT * FROM documents WHERE folder_id = ? ORDER BY created_at DESC",
    [folderId]
  );
  return rows.map(rowToDocument);
}

export async function createDocument(
  data: CreateDocumentRequest
): Promise<Document> {
  const id = nanoid();
  const size = Math.floor(Math.random() * 5000000); // Random size for demo

  await pool.query<ResultSetHeader>(
    "INSERT INTO documents (id, name, type, size, folder_id) VALUES (?, ?, ?, ?, ?)",
    [id, data.name, data.type, size, data.folderId || null]
  );

  const document = await getDocumentById(id);
  if (!document) {
    throw new Error("Failed to create document");
  }
  return document;
}

export async function deleteDocument(id: string): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM documents WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}

export async function searchDocuments(query: string): Promise<Document[]> {
  const [rows] = await pool.query<DocumentRow[] & RowDataPacket[]>(
    "SELECT * FROM documents WHERE name LIKE ? ORDER BY created_at DESC",
    [`%${query}%`]
  );
  return rows.map(rowToDocument);
}

// Folder Queries

export async function getAllFolders(): Promise<Folder[]> {
  const [rows] = await pool.query<
    (FolderRow & { document_count: number })[] & RowDataPacket[]
  >(
    `SELECT f.*, COUNT(d.id) as document_count 
     FROM folders f 
     LEFT JOIN documents d ON f.id = d.folder_id 
     GROUP BY f.id 
     ORDER BY f.created_at DESC`
  );
  return rows.map(rowToFolder);
}

export async function getFolderById(id: string): Promise<Folder | null> {
  const [rows] = await pool.query<
    (FolderRow & { document_count: number })[] & RowDataPacket[]
  >(
    `SELECT f.*, COUNT(d.id) as document_count 
     FROM folders f 
     LEFT JOIN documents d ON f.id = d.folder_id 
     WHERE f.id = ? 
     GROUP BY f.id`,
    [id]
  );
  return rows.length > 0 ? rowToFolder(rows[0]) : null;
}

export async function createFolder(data: CreateFolderRequest): Promise<Folder> {
  const id = nanoid();

  await pool.query<ResultSetHeader>(
    "INSERT INTO folders (id, name) VALUES (?, ?)",
    [id, data.name]
  );

  const folder = await getFolderById(id);
  if (!folder) {
    throw new Error("Failed to create folder");
  }
  return folder;
}

export async function deleteFolder(id: string): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM folders WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}

export async function searchFolders(query: string): Promise<Folder[]> {
  const [rows] = await pool.query<
    (FolderRow & { document_count: number })[] & RowDataPacket[]
  >(
    `SELECT f.*, COUNT(d.id) as document_count 
     FROM folders f 
     LEFT JOIN documents d ON f.id = d.folder_id 
     WHERE f.name LIKE ? 
     GROUP BY f.id 
     ORDER BY f.created_at DESC`,
    [`%${query}%`]
  );
  return rows.map(rowToFolder);
}

export async function getAllDocumentsInFolder(
  folderId: string
): Promise<Document[]> {
  const [rows] = await pool.query<DocumentRow[] & RowDataPacket[]>(
    "SELECT * FROM documents WHERE folder_id = ? ORDER BY created_at DESC",
    [folderId]
  );
  return rows.map(rowToDocument);
}
