"use client";

import { Folder } from "@/types";
import { formatDate } from "@/lib/utils";
import { FolderIcon, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export interface FolderGridProps {
  folders: Folder[];
  onDelete?: (id: string) => void;
  onFolderClick?: (id: string) => void;
}

export function FolderGrid({
  folders,
  onDelete,
  onFolderClick,
}: FolderGridProps) {
  if (folders.length === 0) {
    return (
      <div className="flex min-h-50 items-center justify-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700">
        <p className="text-zinc-500 dark:text-zinc-400">No folders found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {folders.map((folder) => (
        <Card
          key={folder.id}
          className="group relative"
          onClick={() => onFolderClick?.(folder.id)}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                  <FolderIcon className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div className="flex-1">
                  <CardTitle className="truncate text-base">
                    {folder.name}
                  </CardTitle>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {folder.documentCount || 0} documents
                  </p>
                </div>
              </div>
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(folder.id);
                  }}
                  className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label={`Delete ${folder.name}`}
                >
                  <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Created {formatDate(folder.createdAt)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
