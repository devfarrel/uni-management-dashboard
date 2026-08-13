import { useAuth } from "@/hooks/useAuth"
import { useClasses } from "@/hooks/useClasses"
import { useEnrollments } from "@/hooks/useEnrollments"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"

const gradeColor: Record<string, string> = {
  "A":  "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  "A-": "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  "B+": "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  "B":  "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  "B-": "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  "C+": "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  "C":  "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  "D":  "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  "E":  "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
}

export default function MyClassesPage() {
  const { user } = useAuth()
  const { classesQuery } = useClasses()
  const {
    myEnrollmentQuery,
    enroll,   enrolling,
    drop,     dropping,
  } = useEnrollments()

  const allClasses   = classesQuery.data ?? []
  const myEnrollments = myEnrollmentQuery.data ?? []

  // get IDs of classes student is already enrolled in
  const enrolledClassIds = new Set(
    myEnrollments
      .filter(e => e.status !== "DROPPED")
      .map(e => e.classId)
  )

  // only show open and active classes
  const availableClasses = allClasses.filter(
    (cls) => cls.isOpen && cls.isActive
  )

  const handleEnroll = async (classId: number) => {
    try {
      await toast.promise(
        enroll({ classId }),
        {
          loading: "Enrolling...",
          success: (res) => res.status === "WAITLISTED"
            ? "Class is full — you've been added to the waitlist!"
            : "Enrolled successfully!",
          error: (err) => err.response?.data?.message ?? "Failed to enroll",
        }
      )
    } catch {
      // toast handles it
    }
  }

  const handleDrop = async (enrollmentId: number) => {
    try {
      await toast.promise(
        drop(enrollmentId),
        {
          loading: "Dropping class...",
          success: "Dropped successfully!",
          error:   (err) => err.response?.data?.message ?? "Failed to drop",
        }
      )
    } catch {
      // toast handles it
    }
  }

  if (classesQuery.isLoading || myEnrollmentQuery.isLoading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">My Classes</h1>
        <p className="text-sm text-muted-foreground">
          Browse available classes and manage your enrollments
        </p>
      </div>

      {/* My Enrollments */}
      <Card>
        <CardHeader>
          <CardTitle>My Enrollments</CardTitle>
          <CardDescription>
            Classes you are currently enrolled in
          </CardDescription>
        </CardHeader>
        <CardContent>
          {myEnrollments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              You are not enrolled in any classes yet
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myEnrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">
                      {enrollment.class?.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-mono">
                          {enrollment.class?.course?.code}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {enrollment.class?.course?.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {enrollment.class?.day} {enrollment.class?.startTime}–{enrollment.class?.endTime}
                    </TableCell>
                    <TableCell>{enrollment.class?.room ?? "-"}</TableCell>
                    <TableCell>
                      <Badge variant={
                        enrollment.status === "ENROLLED"   ? "default"     :
                        enrollment.status === "WAITLISTED" ? "secondary"   : "destructive"
                      }>
                        {enrollment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {enrollment.grade ? (
                        <Badge className={gradeColor[enrollment.grade] ?? ""}>
                          {enrollment.grade}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {enrollment.status !== "DROPPED" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={dropping}
                          onClick={() => handleDrop(enrollment.id)}
                        >
                          Drop
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Available Classes */}
      <Card>
        <CardHeader>
          <CardTitle>Available Classes</CardTitle>
          <CardDescription>
            Open classes you can enroll in
          </CardDescription>
        </CardHeader>
        <CardContent>
          {availableClasses.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No classes are currently open for enrollment
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Lecturer</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableClasses.map((cls) => {
                  const isEnrolled = enrolledClassIds.has(cls.id)
                  const isFull     = cls.maxStudents !== null &&
                    (cls._count?.enrollments ?? 0) >= cls.maxStudents

                  return (
                    <TableRow key={cls.id}>
                      <TableCell className="font-medium">{cls.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-mono">{cls.course?.code}</span>
                          <span className="text-xs text-muted-foreground">{cls.course?.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{cls.lecturer?.name ?? "-"}</TableCell>
                      <TableCell>
                        {cls.day} {cls.startTime}–{cls.endTime}
                      </TableCell>
                      <TableCell>{cls.room ?? "-"}</TableCell>
                      <TableCell>
                        <span className={
                          isFull ? "text-destructive" : "text-muted-foreground"
                        }>
                          {cls._count?.enrollments ?? 0} / {cls.maxStudents ?? "∞"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {isEnrolled ? (
                          <Badge variant="outline">Enrolled</Badge>
                        ) : (
                          <Button
                            size="sm"
                            variant={isFull ? "secondary" : "default"}
                            disabled={enrolling}
                            onClick={() => handleEnroll(cls.id)}
                          >
                            {isFull ? "Join Waitlist" : "Enroll"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}