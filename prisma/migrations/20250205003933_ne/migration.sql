/*
  Warnings:

  - A unique constraint covering the columns `[month,year]` on the table `Total` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Total_month_year_key" ON "Total"("month", "year");
