import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontalIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import type { Class } from "@/api/class.api";

type Props = {
  classes: Class[]
  onDelete: (id: number) => void
  deleting: boolean
}

export function ClassesTable({ classes, onDelete, deleting }: Props) {
    const navigate = useNavigate();

    return (
        <div className="space-y-4">
        {/* Header / Actions */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Courses</h1>
  
          <Button onClick={() => navigate("/classes/new")}>
            Create Course
          </Button>
        </div>
  
        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Academic Year</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Lecturer</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
  
          <TableBody>
            {classes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="text-center text-muted-foreground"
                >
                  No classes found
                </TableCell>
              </TableRow>
            ) : (
              classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>{cls.room}</TableCell>
                  <TableCell>{cls.day}</TableCell>
                  <TableCell>{cls.startTime} - {cls.endTime}</TableCell>
                  <TableCell>{cls.lecturer?.name}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" aria-label="Open menu" size="icon-sm">
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40" align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Separator className="my-1" />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            variant="destructive"
                            disabled={deleting}
                            onSelect={() => onDelete(cls.id!)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
}