/*
  Warnings:

  - You are about to drop the column `date` on the `Fixed` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Labor` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Paydate` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Total` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `VariableExpenses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fixed" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "Labor" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "Paydate" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "Total" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "VariableExpenses" DROP COLUMN "date";
