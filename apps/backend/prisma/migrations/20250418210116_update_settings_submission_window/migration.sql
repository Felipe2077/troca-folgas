/*
  Warnings:

  - You are about to drop the column `submissionDeadlineDays` on the `settings` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- AlterTable
ALTER TABLE "settings" DROP COLUMN "submissionDeadlineDays",
ADD COLUMN     "submissionEndDay" "DayOfWeek" NOT NULL DEFAULT 'WEDNESDAY',
ADD COLUMN     "submissionStartDay" "DayOfWeek" NOT NULL DEFAULT 'MONDAY';
