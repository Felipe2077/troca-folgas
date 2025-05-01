/*
  Warnings:

  - A unique constraint covering the columns `[relatedRequestId]` on the table `swap_requests` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "SwapStatus" ADD VALUE 'REALIZADO';

-- AlterTable
ALTER TABLE "swap_requests" ADD COLUMN     "isMirror" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "relatedRequestId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "swap_requests_relatedRequestId_key" ON "swap_requests"("relatedRequestId");
