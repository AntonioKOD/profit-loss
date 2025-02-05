/*
  Warnings:

  - You are about to drop the `Fixed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Labor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Paydate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Total` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariableExpenses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Paydate" DROP CONSTRAINT "Paydate_employeeId_fkey";

-- DropTable
DROP TABLE "Fixed";

-- DropTable
DROP TABLE "Labor";

-- DropTable
DROP TABLE "Paydate";

-- DropTable
DROP TABLE "Purchase";

-- DropTable
DROP TABLE "Sales";

-- DropTable
DROP TABLE "Total";

-- DropTable
DROP TABLE "VariableExpenses";

-- CreateTable
CREATE TABLE "MonthlyFinancial" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "sales_pos" DOUBLE PRECISION NOT NULL,
    "sales_checks" DOUBLE PRECISION NOT NULL,
    "sales_catering" DOUBLE PRECISION NOT NULL,
    "sales_doordash" DOUBLE PRECISION NOT NULL,
    "fixed_rent" DOUBLE PRECISION NOT NULL,
    "fixed_utilities" DOUBLE PRECISION NOT NULL,
    "fixed_comp" DOUBLE PRECISION NOT NULL,
    "fixed_insurance" DOUBLE PRECISION NOT NULL,
    "fixed_supplies" DOUBLE PRECISION NOT NULL,
    "fixed_waste" DOUBLE PRECISION NOT NULL,
    "fixed_internet" DOUBLE PRECISION NOT NULL,
    "fixed_clover" DOUBLE PRECISION NOT NULL,
    "fixed_exterminator" DOUBLE PRECISION NOT NULL,
    "fixed_other" DOUBLE PRECISION,
    "labor_owner_drawer" DOUBLE PRECISION NOT NULL,
    "labor_gusto_online" DOUBLE PRECISION NOT NULL,
    "labor_employees_total" DOUBLE PRECISION NOT NULL,
    "variable_taxes" DOUBLE PRECISION NOT NULL,
    "variable_credit_card_fees" DOUBLE PRECISION NOT NULL,
    "variable_miscellaneous" DOUBLE PRECISION NOT NULL,
    "variable_billboard" DOUBLE PRECISION NOT NULL,
    "variable_marketing" DOUBLE PRECISION NOT NULL,
    "purchases_total" DOUBLE PRECISION NOT NULL,
    "total_sales" DOUBLE PRECISION NOT NULL,
    "total_expenses" DOUBLE PRECISION NOT NULL,
    "net_profit" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthlyFinancial_pkey" PRIMARY KEY ("id")
);
