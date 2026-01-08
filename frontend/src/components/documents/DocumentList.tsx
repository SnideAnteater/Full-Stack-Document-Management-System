"use client";

import { Document } from "@/types";
import { formatDate, formatBytes } from "@/lib/utils";
import {
  FileText,
  FileImage,
  FileSpreadsheet,
  File,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DocumentType } from "@/types";

export interface DocumentListProps {
  documents: Document[];
  onDelete?: (id: string) => void;
}

const iconMap: Record<DocumentType, typeof FileText> = {
  [DocumentType.PDF]: FileText,
  [DocumentType.DOCX]: FileText,
  [DocumentType.TXT]: FileText,
  [DocumentType.XLSX]: FileSpreadsheet,
  [DocumentType.PPTX]: FileText,
  [DocumentType.IMAGE]: FileImage,
  [DocumentType.OTHER]: File,
};

export function DocumentList({ documents, onDelete }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="flex min-h-50 items-center justify-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700">
        <p className="text-zinc-500 dark:text-zinc-400">No documents found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-black">
            {documents.map((document) => {
              const Icon = iconMap[document.type];
              return (
                <tr
                  key={document.id}
                  className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">
                        {document.name}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-full bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                      {document.type}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {document.size ? formatBytes(document.size) : "-"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {formatDate(document.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(document.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300"
                        aria-label={`Delete ${document.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
