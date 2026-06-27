export type CreateClassInput = {
    name:         string
    room?:        string
    day:          string
    startTime:    string
    endTime:      string
    academicYear: string
    semester:     number
    courseId:     number
    lecturerId?:  number
    maxStudents?:  number
}

export type UpdateClassInput = Partial<CreateClassInput>