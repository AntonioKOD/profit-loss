/*
  Warnings:

  - Added the required column `month` to the `Fixed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Fixed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Fixed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Labor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Labor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Labor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Paydate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Paydate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Total` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Total` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `VariableExpenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `VariableExpenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fixed" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Labor" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Paydate" ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Total" ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "VariableExpenses" ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
