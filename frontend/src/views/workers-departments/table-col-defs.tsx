"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronRight, Copy, Check, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommonCell } from "@/components/data-table/common-cell";
import { getPermissionIcon, getPermissionLabel } from "./page";
import { formatDate } from "@/lib/utils/format-date";
import type { ApiKeyResponse } from "@/types/api-keys";

const headerClasses = "px-6 py-3 text-left text-xs text-foreground font-medium uppercase tracking-wider";

type ApiKeyColDefProps = {
  handleCopyToClipboard(id: number, text: string): void;
  handleRevokeApiKey(id: number): void;
  selectedApiKey: ApiKeyResponse | null;
  copiedId: number | null;
};

export const createApiKeysColumns = ({
  handleCopyToClipboard,
  handleRevokeApiKey,
  selectedApiKey,
  copiedId,
}: ApiKeyColDefProps): ColumnDef<ApiKeyResponse>[] => [
  {
    accessorKey: "name",
    header: () => <div className={headerClasses}>Name</div>,
    cell: ({ row, table }) => {
      return (
        <CommonCell className="cursor-pointer">
          <div className="flex items-center">
            {selectedApiKey?.id === row.original.id ? (
              <ChevronDown className="mr-2 h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="mr-2 h-5 w-5 text-gray-400" />
            )}
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{row.getValue("name")}</div>
          </div>
        </CommonCell>
      );
    },
  },
  {
    accessorKey: "key",
    header: () => <div className={headerClasses}>API Key</div>,
    cell: ({ row }) => {
      const apiKey = row.original;
      return (
        <CommonCell>
          <div className="flex items-center">
            <code className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-900">
              {apiKey.api_key.substring(0, 10)}
              ...
            </code>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyToClipboard(apiKey.id, apiKey.api_key);
              }}
            >
              {copiedId === apiKey.id ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
        </CommonCell>
      );
    },
  },
  {
    accessorKey: "permissions",
    header: () => <div className={headerClasses}>Permissions</div>,
    cell: ({ row }) => {
      const permissions = row.original.permissions;
      return (
        <CommonCell>
          <span className="inline-flex items-center text-sm text-black dark:text-white">
            {getPermissionIcon(permissions)}
            {getPermissionLabel(permissions)}
          </span>
        </CommonCell>
      );
    },
  },
  {
    accessorKey: "expires_at",
    header: () => <div className={headerClasses}>Expires</div>,
    cell: ({ row }) => {
      const expiresAt = row.getValue("expires_at") as string;
      return (
        <CommonCell>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4 text-gray-400" />
            {expiresAt ? formatDate(expiresAt) : "Never"}
          </div>
        </CommonCell>
      );
    },
  },
  {
    accessorKey: "is_active",
    filterFn: "equalsString",
    header: () => <div className={headerClasses}>Status</div>,
    cell: ({ row }) => {
      const isActive = row.getValue("is_active") as boolean;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            isActive
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {isActive ? "Active" : "Expired"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className={headerClasses}>Actions</div>,
    cell: ({ row }) => {
      const apiKey = row.original;
      return (
        <CommonCell className="text-right">
          <div className="flex justify-end space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopyToClipboard(apiKey.id, apiKey.api_key);
              }}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900"
            >
              <Copy className="mr-1 h-4 w-4" />
              Copy
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRevokeApiKey(apiKey.id);
              }}
              className="inline-flex items-center rounded-md border border-red-300 bg-white px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-600 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-red-950 dark:focus:ring-red-400 dark:focus:ring-offset-gray-900"
            >
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        </CommonCell>
      );
    },
  },
];
