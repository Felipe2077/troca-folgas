/*
  Warnings:

  - You are about to drop the column `performedById` on the `audit_logs` table. All the data in the column will be lost.
  - Added the required column `userId` to the `audit_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userLoginIdentifier` to the `audit_logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "audit_logs" DROP CONSTRAINT "audit_logs_performedById_fkey";

-- AlterTable
ALTER TABLE "audit_logs" DROP COLUMN "performedById",
ADD COLUMN     "targetResourceId" INTEGER,
ADD COLUMN     "targetResourceType" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "userLoginIdentifier" TEXT NOT NULL,
ALTER COLUMN "details" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "swap_requests" ADD CONSTRAINT "swap_requests_relatedRequestId_fkey" FOREIGN KEY ("relatedRequestId") REFERENCES "swap_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
