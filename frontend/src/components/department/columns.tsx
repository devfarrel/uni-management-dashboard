import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontalIcon, Pen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";

import type { Department } from "@/api/department.api";
import type { Course } from "@/api/course.api";
import type { Class } from "@/api/class.api";

type ActionsProps = {
  onDelete: (id: number) => void;
  deleting: boolean;
};

export const getDepartmentColumns = ({
  onDelete,
  deleting,
}: ActionsProps): ColumnDef<Department>[] => [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3"
      >
        Code
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const department = row.original;
      return (
        <Link
          className="text-sm font-medium cursor-pointer hover:underline"
          to={`/departments/${department.id}`}
        >
          {row.getValue("code")}
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3"
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const department = row.original;
      return (
        <HoverCard>
          <HoverCardTrigger>
            <Link
              to={`/departments/${row.original.id}`}
              className="text-smfont-medium cursor-pointer hover:underline"
            >
              {row.getValue("name")}
            </Link>
          </HoverCardTrigger>
          <HoverCardContent side="top" align="start" className="w-64">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Code:</span>
                <span className="text-sm">{department.code || "-"}</span>
              </div>
              <Separator />
              <div className="flex flex-col">
                <span className="text-xs font-medium">
                  Available Courses: {department?.courses?.length ?? 0}
                </span>
                <span className="text-xs font-medium">
                  Available Classes: {department.classes}
                </span>
              </div>
              <span className="text-muted-foreground text-xs">
                Click code to view full class schedule
              </span>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "faculty",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3"
      >
        Faculty
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <span className="font-medium">{row.getValue("faculty")}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const department = row.original;
      return (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" aria-label="Open menu" size="icon-sm">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link
                    to={`/department/${department.id}`}
                    className="cursor-pointer"
                  >
                    <Pen />
                    Edit Department
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(department.id)}
                  disabled={deleting}
                  className="cursor-pointer"
                  variant="destructive"
                >
                  <Trash2 />
                  Delete Department
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
