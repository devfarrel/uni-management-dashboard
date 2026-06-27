import { prisma } from "../prisma";
import type { CreateEnrollmentInput, UpdateEnrollmentInput } from "@customTypes/enrollment.types";

const enrollmentInclude = {
  student: {
    select: {
      id:         true,
      name:       true,
      email:      true,
      identifier: true,
    }
  },
  class: {
    select: {
      id:          true,
      name:        true,
      day:         true,
      startTime:   true,
      endTime:     true,
      room:        true,
      academicYear: true,
      semester:    true,
      course: {
        select: {
          id:    true,
          code:  true,
          title: true,
        }
      },
    }
  },
}

export const EnrollmentService = {
    getAll: () => {
        return prisma.enrollment.findMany({
            include: enrollmentInclude,
            orderBy: { createdAt: "desc"},
        })
    },

    getByStudent: (studentId: number) => {
        return prisma.enrollment.findMany({
            where: { studentId },
            include: enrollmentInclude,
            orderBy: { createdAt: "desc" },
        })
    },

    getByClass: (classId: number) => {
        return prisma.enrollment.findMany({
            where: { classId },
            include: enrollmentInclude,
            orderBy: { status: "asc" },
        })
    },

    enroll: async (data: CreateEnrollmentInput) => {
        const { studentId, classId } = data

        // check if already enrolled
        const existing = await prisma.enrollment.findUnique({
        where: { studentId_classId: { studentId, classId } }
        })
        if (existing) throw new Error("Student is already enrolled in this class")

        // get class details
        const cls = await prisma.class.findUnique({
        where:   { id: classId },
        include: { _count: { select: { enrollments: { where: { status: "ENROLLED" } } } } }
        })
        if (!cls) throw new Error("Class not found")

        // check if class is open
        if (!cls.isOpen) throw new Error("Class enrollment is closed")

        // check enrollment period
        const now = new Date()
        if (cls.enrollStart && now < cls.enrollStart) {
        throw new Error("Enrollment period has not started yet")
        }
        if (cls.enrollEnd && now > cls.enrollEnd) {
        throw new Error("Enrollment period has ended")
        }

        // check capacity — waitlist if full
        const enrolledCount = cls._count.enrollments
        const isFull = cls.maxStudents ? enrolledCount >= cls.maxStudents : false
        const status = isFull ? "WAITLISTED" : "ENROLLED"

        return prisma.enrollment.create({
        data:    { studentId, classId, status },
        include: enrollmentInclude,
        })
    },
    
    drop: async (id: number, studentId?: number) => {
        const enrollment = await prisma.enrollment.findUnique({ where: { id } })
        if (!enrollment) throw new Error("Enrollment not found")

        // if studentId provided, verify ownership
        if (studentId && enrollment.studentId !== studentId) {
        throw new Error("Unauthorized")
        }

        // delete the enrollment
        await prisma.enrollment.delete({ where: { id } })

        // promote first waitlisted student if someone drops
        if (enrollment.status === "ENROLLED") {
        const firstWaitlisted = await prisma.enrollment.findFirst({
            where:   { classId: enrollment.classId, status: "WAITLISTED" },
            orderBy: { createdAt: "asc" },
        })

        if (firstWaitlisted) {
            await prisma.enrollment.update({
            where: { id: firstWaitlisted.id },
            data:  { status: "ENROLLED" },
            })
        }
    }
},  

    updateStatus: async (id: number, data: UpdateEnrollmentInput) => {
        return prisma.enrollment.update({
            where: { id },
            data,
            include: enrollmentInclude
        })
    },
}