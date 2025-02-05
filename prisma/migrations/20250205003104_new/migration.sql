/*
  Warnings:

  - Added the required column `profit_loss` to the `Total` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paydate" ADD COLUMN     "weekOfMonth" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Total" ADD COLUMN     "profit_loss" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE INDEX "Fixed_month_year_idx" ON "Fixed"("month", "year");

-- CreateIndex
CREATE INDEX "Labor_month_year_idx" ON "Labor"("month", "year");

-- CreateIndex
CREATE INDEX "Paydate_month_year_idx" ON "Paydate"("month", "year");

-- CreateIndex
CREATE INDEX "Purchase_month_year_idx" ON "Purchase"("month", "year");

-- CreateIndex
CREATE INDEX "Sales_month_year_idx" ON "Sales"("month", "year");

-- CreateIndex
CREATE INDEX "Total_month_year_idx" ON "Total"("month", "year");

-- CreateIndex
CREATE INDEX "VariableExpenses_month_year_idx" ON "VariableExpenses"("month", "year");
