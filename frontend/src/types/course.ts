export type CourseType = "REQUIRED" | "ELECTIVE"

export type CreateCourseInput = {
    code: string
    title: string
    description: string
    credits: number
    semester: number
    academicYear: string
    type: CourseType
    departmentId: number
    lecturerId?: number
    maxStudents?: number
}

export type UpdateCourseInput = {
    code?: string
    title?: string
    description?: string
    credits?: number
    semester?: number
    academicYear?: string
    type?: CourseType
    departmentId?: number
    lecturerId?: number
    maxStudents?: number
}