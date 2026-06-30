import { prisma } from '../src/prisma'
import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'

async function main() {
  // --- Department ---
  const department = await prisma.department.create({
    data: {
      name:    "Teknik Informatika",
      code:    "TI",
      faculty: "Fakultas Teknologi Informasi",
    },
  })

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

  // --- Lecturers ---
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
        },
      })
    )
  )

  // --- Students ---
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
          departmentId: department.id,
          lecturerId:   faker.helpers.arrayElement(lecturers).id,
          maxStudents:  30,
        },
      })
    )
  )

  // --- Classes ---
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const classes = await Promise.all(
    courses.map((course, i) =>
      prisma.class.create({
        data: {
          name:         `TI-${i + 1}A`,
          room:         `Lab ${300 + i}`,
          day:          faker.helpers.arrayElement(days),
          startTime:    "08:00",
          endTime:      "10:00",
          academicYear: "2024-2025",
          semester:     course.semester,
          maxStudents:  30,
          courseId:     course.id,
          lecturerId:   course.lecturerId,
        },
      })
    )
  )

  // --- Enrollments (random students into random classes) ---
  for (const student of students) {
    const randomClasses = faker.helpers.arrayElements(classes, { min: 1, max: 4 })
    for (const cls of randomClasses) {
      await prisma.enrollment.create({
        data: {
          studentId: student.id,
          classId:   cls.id,
          status:    "ENROLLED",
        },
      }).catch(() => {}) // skip if duplicate enrollment
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