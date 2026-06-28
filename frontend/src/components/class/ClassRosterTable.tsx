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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type { Enrollment } from "@/api/enrollment.api";

type Props = {
  enrollments: Enrollment[]
  isAdmin:     boolean
  onDrop:      (id: number) => void
  dropping:    boolean
}

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
    ENROLLED: "default",
    DROPPED:  "destructive",
    WAITLISTED: "secondary"
}

export function ClassRosterTable({ enrollments, isAdmin, onDrop, dropping }: Props) {

    return (
        <div className="space-y-4">
        {/* Header / Actions */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Class Roster</h1>
        </div>
  
        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Identifier</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Enrolled At</TableHead>
              {isAdmin && <TableHead className="text-center">Actions</TableHead>}
            </TableRow>
          </TableHeader>
  
          <TableBody>
            {enrollments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="text-center text-muted-foreground"
                >
                  No classes found
                </TableCell>
              </TableRow>
            ) : (
              enrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-mono text-sm">
                    {enrollment.student?.identifier ?? "-"}
                  </TableCell>
                  <TableCell>{enrollment.student?.name ?? "-"}</TableCell>
                  <TableCell>{enrollment.student?.email}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[enrollment.status]}>
                      {enrollment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{enrollment.grade ?? "-"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                  </TableCell>
                  {isAdmin && (
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
                              disabled={dropping}
                              onSelect={() => onDrop(enrollment.id)}
                            >
                              Drop Student
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
}