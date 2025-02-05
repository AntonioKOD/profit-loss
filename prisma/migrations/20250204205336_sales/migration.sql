/*
  Warnings:

  - Changed the type of `doordash` on the `Sales` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Sales" ALTER COLUMN "catering" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "doordash",
ADD COLUMN     "doordash" DOUBLE PRECISION NOT NULL;
