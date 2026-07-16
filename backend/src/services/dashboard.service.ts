import { prisma } from "../prisma"

export const DashboardService = {
  async getStats() {
    const [
      totalUsers,
      totalStudents,
      totalLecturers,
      totalCourses,
      totalClasses,
      totalEnrollments,
      enrollmentsByStatus,
      recentEnrollments,
      openClasses,
      departments,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.user.count({ where: { role: "LECTURER" } }),
      prisma.course.count(),
      prisma.class.count(),
      prisma.enrollment.count(),

      // enrollment breakdown by status
      prisma.enrollment.groupBy({
        by: ["status"],
        _count: { status: true },
      }),

      // last 5 enrollments
      prisma.enrollment.findMany({
        take:    5,
        orderBy: { createdAt: "desc" },
        include: {
          student: { select: { id: true, name: true, identifier: true } },
          class: {
            select: {
              id:   true,
              name: true,
              course: { select: { code: true, title: true } },
            },
          },
        },
      }),

      // open classes with enrollment count
      prisma.class.findMany({
        where:   { isOpen: true, isActive: true },
        take:    5,
        orderBy: { createdAt: "desc" },
        include: {
          course:  { select: { code: true, title: true } },
          _count:  { select: { enrollments: true } },
        },
      }),

      prisma.department.findMany({
        include: {
          courses: {
            include: {
              classes: {
                include: {
                  _count: { select: { enrollments: true } }
                }
              }
            }
          }
        }
      }),
    ])

    // compute department stats AFTER Promise.all
    const departmentStats = departments.map((dept) => ({
      name: dept.name,
      code: dept.code,
      enrollments: dept.courses.reduce((sum, course) =>
        sum + course.classes.reduce((s, cls) =>
          s + cls._count.enrollments, 0
        ), 0
      ),
  }))

    return {
      counts: {
        totalUsers,
        totalStudents,
        totalLecturers,
        totalCourses,
        totalClasses,
        totalEnrollments,
      },
      enrollmentsByStatus: enrollmentsByStatus.map((e) => ({
        status: e.status,
        count:  e._count.status,
      })),
      recentEnrollments,
      openClasses,
      departmentStats,
    }
  },

  async getEnrollmentTrend() {
    // enrollments grouped by month for the chart
    const enrollments = await prisma.enrollment.findMany({
      orderBy: { createdAt: "asc" },
      select:  { createdAt: true, status: true },
    })

    // group by month
    const grouped = enrollments.reduce((acc, enrollment) => {
      const month = enrollment.createdAt.toISOString().slice(0, 7) // "2024-01"
      if (!acc[month]) acc[month] = { enrolled: 0, waitlisted: 0, dropped: 0 }
      if (enrollment.status === "ENROLLED")   acc[month].enrolled++
      if (enrollment.status === "WAITLISTED") acc[month].waitlisted++
      if (enrollment.status === "DROPPED")    acc[month].dropped++
      return acc
    }, {} as Record<string, { enrolled: number; waitlisted: number; dropped: number }>)

    return Object.entries(grouped).map(([month, counts]) => ({
      month,
      ...counts,
    }))
  },

  async getUserTrend() {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
      select:  { createdAt: true, role: true },
      where: {
        role: { in: ["STUDENT", "LECTURER"] }
      }
    })

    const grouped = users.reduce((acc, user) => {
      const month = user.createdAt.toISOString().slice(0, 7)
      if (!acc[month]) acc[month] = { students: 0, lecturers: 0 }
      if (user.role === "STUDENT")  acc[month].students++
      if (user.role === "LECTURER") acc[month].lecturers++
      return acc
    }, {} as Record<string, { students: number; lecturers: number }>)

    return Object.entries(grouped).map(([month, counts]) => ({
      month,
      ...counts,
    }))
  }
}