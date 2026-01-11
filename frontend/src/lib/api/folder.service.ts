import { Document, Folder, FolderCreateFormData, Response } from "@/types";
import { apiClient } from "./client";

export const foldersApi = {
  getAll: async (): Promise<Folder[]> => {
    const response: Response = await apiClient(`/api/folders`);
    if (!response.success) {
      throw new Error("Failed to fetch folders");
    }
    return response.data;
  },
  getDocumentsByFolderId: async (folderId: string): Promise<Document[]> => {
    const response: Response = await apiClient(`/api/folders/${folderId}`);
    if (!response.success) {
      throw new Error("Failed to fetch documents in folder");
    }
    return response.data;
  },
  createFolder: async (data: FolderCreateFormData): Promise<Folder> => {
    const response: Response = await apiClient("/api/folders", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.success) {
      throw new Error("Failed to create folder");
    }
    return response.data;
  },
  deleteFolder: async (id: string): Promise<void> =>
    apiClient(`/api/folders/${id}`, {
      method: "DELETE",
    }),
};
