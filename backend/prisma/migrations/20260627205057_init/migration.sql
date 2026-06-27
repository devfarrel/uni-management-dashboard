-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('ENROLLED', 'WAITLISTED', 'DROPPED');

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "enrollEnd" TIMESTAMP(3),
ADD COLUMN     "enrollStart" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isOpen" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "status" "EnrollmentStatus" NOT NULL DEFAULT 'ENROLLED';
