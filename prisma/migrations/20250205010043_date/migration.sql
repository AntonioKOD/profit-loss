/*
  Warnings:

  - You are about to drop the column `month` on the `Paydate` table. All the data in the column will be lost.
  - You are about to drop the column `weekOfMonth` on the `Paydate` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Paydate` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Paydate_month_year_idx";

-- AlterTable
ALTER TABLE "Paydate" DROP COLUMN "month",
DROP COLUMN "weekOfMonth",
DROP COLUMN "year",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Paydate_date_idx" ON "Paydate"("date");
