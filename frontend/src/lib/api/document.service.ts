import { Document, DocumentUploadFormData, Response } from "@/types";
import { apiClient } from "./client";

export const documentsApi = {
  getAll: async (): Promise<Document[]> => {
    const response: Response = await apiClient(`/api/documents`);
    if (!response.success) {
      throw new Error("Failed to fetch documents");
    }
    return response.data;
  },
  getDocumentById: async (documentId: string): Promise<Document> =>
    apiClient(`/api/documents/${documentId}`),
  uploadDocument: async (data: DocumentUploadFormData): Promise<Document> => {
    const response: Response = await apiClient("/api/documents", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // console.log("Upload Document Response:", response);

    if (!response.success) {
      throw new Error("Failed to upload document");
    }
    return response.data;
  },
  deleteDocument: async (documentId: string): Promise<void> =>
    apiClient(`/api/documents/${documentId}`, {
      method: "DELETE",
    }),
};
