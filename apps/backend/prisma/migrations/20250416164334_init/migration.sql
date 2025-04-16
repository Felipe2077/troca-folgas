-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMINISTRADOR', 'ENCARREGADO');

-- CreateEnum
CREATE TYPE "EmployeeFunction" AS ENUM ('MOTORISTA', 'COBRADOR');

-- CreateEnum
CREATE TYPE "ReliefGroup" AS ENUM ('G1', 'G2', 'FIXO_DOMINGO', 'SAB_DOMINGO', 'FIXO_SABADO');

-- CreateEnum
CREATE TYPE "SwapEventType" AS ENUM ('TROCA', 'SUBSTITUICAO');

-- CreateEnum
CREATE TYPE "SwapStatus" AS ENUM ('AGENDADO', 'NAO_REALIZADA');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "loginIdentifier" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swap_requests" (
    "id" SERIAL NOT NULL,
    "employeeIdOut" TEXT NOT NULL,
    "employeeIdIn" TEXT NOT NULL,
    "swapDate" TIMESTAMP(3) NOT NULL,
    "paybackDate" TIMESTAMP(3) NOT NULL,
    "employeeFunction" "EmployeeFunction" NOT NULL,
    "groupOut" "ReliefGroup" NOT NULL,
    "groupIn" "ReliefGroup" NOT NULL,
    "eventType" "SwapEventType" NOT NULL,
    "status" "SwapStatus" NOT NULL DEFAULT 'AGENDADO',
    "observation" TEXT,
    "submittedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "swap_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "details" JSONB,
    "performedById" INTEGER,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_loginIdentifier_key" ON "users"("loginIdentifier");

-- AddForeignKey
ALTER TABLE "swap_requests" ADD CONSTRAINT "swap_requests_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
