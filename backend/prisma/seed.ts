import { prisma } from '../src/prisma'
import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'

async function main() {
  // --- Department ---
  const departments = await Promise.all([
    prisma.department.create({
      data: { name: "Teknik Informatika", code: "TI", faculty: "Fakultas Teknologi Informasi" }
    }),
    prisma.department.create({
      data: { name: "Sistem Informasi", code: "SI", faculty: "Fakultas Teknologi Informasi" }
    }),
    prisma.department.create({
      data: { name: "Manajemen Informatika", code: "MI", faculty: "Fakultas Teknologi Informasi" }
    }),
  ])

  // --- Admin ---
  const adminPassword = await bcrypt.hash("admin123", 10)
  await prisma.user.create({
    data: {
      identifier: "ADM-2025-000001",
      username:   "admin",
      email:      "admin@gmail.com",
      password:   adminPassword,
      role:       "ADMIN",
      name:       "Admin User",
    },
  })

  // --- Lecturers (spread across months) ---
  const lecturerPassword = await bcrypt.hash("lecturer123", 10)
  const lecturers = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.user.create({
        data: {
          identifier: `LEC-2025-${String(i + 1).padStart(6, "0")}`,
          username:   faker.internet.username().toLowerCase(),
          email:      faker.internet.email().toLowerCase(),
          password:   lecturerPassword,
          role:       "LECTURER",
          name:       `Dr. ${faker.person.fullName()}`,
          phone:      faker.phone.number(),
          address:    faker.location.streetAddress(),
          gender:     faker.helpers.arrayElement(["Male", "Female"]),
          createdAt:  faker.date.between({
            from: new Date("2025-08-01"),
            to:   new Date("2025-12-31"),
          }),
        },
      })
    )
  )

  // --- Students (spread across 2025-2026) ---
  const studentPassword = await bcrypt.hash("student123", 10)
  const students = await Promise.all(
    Array.from({ length: 50 }).map((_, i) =>
      prisma.user.create({
        data: {
          identifier: `STD-2025-${String(i + 1).padStart(6, "0")}`,
          username:   faker.internet.username().toLowerCase(),
          email:      faker.internet.email().toLowerCase(),
          password:   studentPassword,
          role:       "STUDENT",
          name:       faker.person.fullName(),
          phone:      faker.phone.number(),
          address:    faker.location.streetAddress(),
          birthDate:  faker.date.birthdate({ min: 17, max: 24, mode: "age" }),
          gender:     faker.helpers.arrayElement(["Male", "Female"]),
          createdAt:  faker.date.between({
            from: new Date("2025-08-01"),
            to:   new Date("2026-06-30"),
          }),
        },
      })
    )
  )

  // --- Courses ---
  const courseTitles = [
    "Database Systems", "Web Development", "Data Structures",
    "Operating Systems", "Computer Networks", "Software Engineering",
  ]

  const courses = await Promise.all(
    courseTitles.map((title, i) =>
      prisma.course.create({
        data: {
          code:         `CS${101 + i}`,
          title,
          description:  faker.lorem.sentence(),
          credits:      faker.helpers.arrayElement([2, 3, 4]),
          semester:     faker.number.int({ min: 1, max: 8 }),
          academicYear: "2024-2025",
          type:         faker.helpers.arrayElement(["REQUIRED", "ELECTIVE"]),
          departmentId: faker.helpers.arrayElement(departments).id,
          lecturerId:   faker.helpers.arrayElement(lecturers).id,
          maxStudents:  30,
        },
      })
    )
  )

  // --- Classes ---
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const timeSlots = [
    { start: "08:00", end: "10:00" },
    { start: "10:00", end: "12:00" },
    { start: "13:00", end: "15:00" },
    { start: "15:00", end: "17:00" },
  ]

  const classes = await Promise.all(
    courses.map((course, i) => {
      const slot = faker.helpers.arrayElement(timeSlots)
      return prisma.class.create({
        data: {
          name:         `TI-${i + 1}A`,
          room:         `Lab ${300 + i}`,
          day:          faker.helpers.arrayElement(days),
          startTime:    slot.start,
          endTime:      slot.end,
          academicYear: "2024-2025",
          semester:     course.semester,
          maxStudents:  faker.number.int({ min: 20, max: 40 }),
          courseId:     course.id,
          lecturerId:   course.lecturerId,
          isOpen:       faker.helpers.arrayElement([true, true, true, false]), // mostly open
        },
      })
    })
  )

  // --- Enrollments (varied status, spread across months) ---
  const statuses = [
    "ENROLLED", "ENROLLED", "ENROLLED", "ENROLLED",  // 4x weight
    "WAITLISTED", "WAITLISTED",                        // 2x weight
    "DROPPED",                                         // 1x weight
  ] as const

  for (const student of students) {
    const randomClasses = faker.helpers.arrayElements(classes, { min: 1, max: 4 })
    for (const cls of randomClasses) {
      await prisma.enrollment.create({
        data: {
          studentId: student.id,
          classId:   cls.id,
          status:    faker.helpers.arrayElement(statuses),
          createdAt: faker.date.between({
            from: new Date("2025-09-01"),
            to:   new Date("2026-06-30"),
          }),
        },
      }).catch(() => {}) // skip duplicates
    }
  }

  console.log("Seed completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })