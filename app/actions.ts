"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { getCurrentMonthYear, formatMonthYear } from "../lib/date-utils"


const prisma = new PrismaClient()

export async function addSales(formData: FormData) {
  const month = Number.parseInt(formData.get("month") as string)
  const year = Number.parseInt(formData.get("year") as string)
  const pos = Number.parseFloat(formData.get("pos") as string)
  const checks = Number.parseFloat(formData.get("checks") as string)
  const catering = Number.parseFloat(formData.get("catering") as string)
  const doordash = Number.parseFloat(formData.get("doordash") as string)

  await prisma.sales.create({
    data: {
      month,
      year,
      pos,
      checks,
      catering,
      doordash,
    },
  })

  await calculateProfitLoss(month, year)
  revalidatePath("/")
}

export async function addFixed(formData: FormData) {
  const month = Number.parseInt(formData.get("month") as string)
  const year = Number.parseInt(formData.get("year") as string)
  const rent = Number.parseFloat(formData.get("rent") as string)
  const utilities = Number.parseFloat(formData.get("utilities") as string)
  const comp = Number.parseFloat(formData.get("comp") as string)
  const insurance = Number.parseFloat(formData.get("insurance") as string)
  const supplies = Number.parseFloat(formData.get("supplies") as string)
  const waste = Number.parseFloat(formData.get("waste") as string)
  const internet = Number.parseFloat(formData.get("internet") as string)
  const clover = Number.parseFloat(formData.get("clover") as string)
  const exterminator = Number.parseFloat(formData.get("exterminator") as string)
  const other = formData.get("other") ? Number.parseFloat(formData.get("other") as string) : null

  await prisma.fixed.create({
    data: {
      month,
      year,
      rent,
      utilities,
      comp,
      insurance,
      supplies,
      waste,
      internet,
      clover,
      exterminator,
      other,
    },
  })

  await calculateProfitLoss(month, year)
  revalidatePath("/")
}

export async function addPaydate(formData: FormData) {
  const date = new Date(formData.get("date") as string)
  const amount = Number.parseFloat(formData.get("amount") as string)
  const employeeId = Number.parseInt(formData.get("employeeId") as string)

  await prisma.paydate.create({
    data: {
      date,
      amount,
      employeeId: employeeId.toString(),
    },
  })

  revalidatePath("/")
}

export async function addLabor(formData: FormData) {
  const month = Number.parseInt(formData.get("month") as string)
  const year = Number.parseInt(formData.get("year") as string)
  const owner_drawer = Number.parseFloat(formData.get("owner_drawer") as string)
  const gusto_online = Number.parseFloat(formData.get("gusto_online") as string)
  const employees_total = Number.parseFloat(formData.get("employees_total") as string)

  await prisma.labor.create({
    data: {
      month,
      year,
      owner_drawer,
      gusto_online,
      employees_total,
    },
  })

  await calculateProfitLoss(month, year)
  revalidatePath("/")
}

export async function addPurchase(formData: FormData) {
  const month = Number.parseInt(formData.get("month") as string)
  const year = Number.parseInt(formData.get("year") as string)
  const amount = Number.parseFloat(formData.get("amount") as string)
  const vendor = formData.get("vendor") as string
  const category = formData.get("category") as string

  await prisma.purchase.create({
    data: {
      month,
      year,
      amount,
      vendor,
      category,
    },
  })

  await calculateProfitLoss(month, year)
  revalidatePath("/")
}

export async function addVariableExpenses(formData: FormData) {
  const month = Number.parseInt(formData.get("month") as string)
  const year = Number.parseInt(formData.get("year") as string)
  const taxes = Number.parseFloat(formData.get("taxes") as string)
  const credit_card_fees = Number.parseFloat(formData.get("credit_card_fees") as string)
  const miscellanous = Number.parseFloat(formData.get("miscellanous") as string)
  const billboard = Number.parseFloat(formData.get("billboard") as string)
  const marketing = Number.parseFloat(formData.get("marketing") as string)

  await prisma.variableExpenses.create({
    data: {
      month,
      year,
      taxes,
      credit_card_fees,
      miscellanous,
      billboard,
      marketing,
    },
  })

  await calculateProfitLoss(month, year)
  revalidatePath("/")
}

async function calculateProfitLoss(month: number, year: number) {
  // Get all relevant data for the month
  const sales = await prisma.sales.findMany({
    where: { month, year },
  });

  const fixed = await prisma.fixed.findMany({
    where: { month, year },
  });

  const labor = await prisma.labor.findMany({
    where: { month, year },
  });

  const purchases = await prisma.purchase.findMany({
    where: { month, year },
  });

  const variableExpenses = await prisma.variableExpenses.findMany({
    where: { month, year },
  });

  // Calculate totals
  const total_sales = sales.reduce((sum, sale) => sum + sale.pos + sale.checks + sale.catering + sale.doordash, 0);

  const total_fixed = fixed.reduce(
    (sum, fix) =>
      sum +
      fix.rent +
      fix.utilities +
      fix.comp +
      fix.insurance +
      fix.supplies +
      fix.waste +
      fix.internet +
      fix.clover +
      fix.exterminator +
      (fix.other || 0),
    0
  );

  const total_labor = labor.reduce((sum, lab) => sum + lab.owner_drawer + lab.gusto_online + lab.employees_total, 0);

  const total_purchases = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

  const total_variable = variableExpenses.reduce(
    (sum, variable) =>
      sum +
      variable.taxes +
      variable.credit_card_fees +
      variable.miscellanous +
      variable.billboard +
      variable.marketing,
    0
  );

  const total = total_fixed + total_labor + total_purchases + total_variable;
  const profit_loss = total_sales - total;

  // Check if a total record already exists for the month & year
  const existingTotal = await prisma.total.findFirst({
    where: {
      month,
      year,
    },
  });

  if (existingTotal) {
    // If it exists, update it
    await prisma.total.update({
      where: { id: existingTotal.id }, // ✅ Uses `id` instead of `{ month, year }`
      data: {
        total_sales,
        total_fixed,
        total_variable,
        total_labor,
        total_purchases,
        total,
        profit_loss,
      },
    });
  } else {
    // If it does not exist, create it
    await prisma.total.create({
      data: {
        month,
        year,
        total_sales,
        total_fixed,
        total_variable,
        total_labor,
        total_purchases,
        total,
        profit_loss,
      },
    });
  }
}

export async function getMonthlyStats(month: number, year: number) {
  return await prisma.total.findFirst({
    where: { month, year },
  })
}

export async function addEmployee(formData: FormData) {
  const name = formData.get("name") as string
  const position = formData.get("position") as string
  const wage = Number.parseFloat(formData.get("wage") as string)

  await prisma.employee.create({
    data: {
      name,
      position,
      wage,
    },
  })

  revalidatePath("/")
}

export async function getEmployees() {
  return await prisma.employee.findMany()
}

export async function getInsights() {
  const monthlyTotals = await prisma.total.findMany({
    orderBy: [{ year: "asc" }, { month: "asc" }],
  })

  return monthlyTotals
}

export async function getCashFlowData() {
  const { month, year } = getCurrentMonthYear()
  const startDate = new Date(year, month - 4, 1) // 3 months ago
  const endDate = new Date(year, month + 2, 0) // 2 months in the future

  const totals = await prisma.total.findMany({
    where: {
      OR: [
        { year: startDate.getFullYear(), month: { gte: startDate.getMonth() + 1 } },
        { year: endDate.getFullYear(), month: { lte: endDate.getMonth() + 1 } },
      ],
    },
    orderBy: [{ year: "asc" }, { month: "asc" }],
  })

  // Generate forecast for future months
  const lastTotal = totals[totals.length - 1]
  const forecastMonths = 2
  for (let i = 1; i <= forecastMonths; i++) {
    const forecastMonth = ((lastTotal.month + i - 1) % 12) + 1
    const forecastYear = lastTotal.year + Math.floor((lastTotal.month + i - 1) / 12)
    totals.push({
      ...lastTotal,
      month: forecastMonth,
      year: forecastYear,
      total_sales: lastTotal.total_sales * 1.05, // Assume 5% growth
      total: lastTotal.total * 1.03, // Assume 3% increase in expenses
      profit_loss: lastTotal.total_sales * 1.05 - lastTotal.total * 1.03,
    })
  }

  return totals.map((total) => ({
    date: formatMonthYear(total.month, total.year),
    revenue: total.total_sales,
    expenses: total.total,
    cashFlow: total.profit_loss,
  }))
}

export { calculateProfitLoss }

export async function getRecentTransactions() {
  const recentSales = await prisma.sales.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  })

  const recentExpenses = await prisma.purchase.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  })

  const transactions = [
    ...recentSales.map((sale) => ({
      type: "sale" as const,
      amount: sale.pos + sale.checks + sale.catering + sale.doordash,
      vendor: "Sales", // Add a default vendor for sales
      createdAt: sale.createdAt,
    })),
    ...recentExpenses.map((expense) => ({
      type: "expense" as const,
      amount: expense.amount,
      vendor: expense.vendor,
      createdAt: expense.createdAt,
    })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5)

  return transactions
}

export async function getSalesData() {
  const salesData = await prisma.sales.findMany({
    orderBy: [{ year: "asc" }, { month: "asc" }],
    take: 12, // Last 12 months
  })

  return salesData.map((sale) => ({
    month: `${sale.year}-${sale.month.toString().padStart(2, "0")}`,
    pos: sale.pos,
    checks: sale.checks,
    catering: sale.catering,
    doordash: sale.doordash,
  }))
}

export async function getProfitLossData() {
  const profitLossData = await prisma.total.findMany({
    orderBy: [{ year: "asc" }, { month: "asc" }],
    take: 12, // Last 12 months
  })

  return profitLossData.map((data) => ({
    month: `${data.year}-${data.month.toString().padStart(2, "0")}`,
    profit: data.profit_loss > 0 ? data.profit_loss : 0,
    loss: data.profit_loss < 0 ? -data.profit_loss : 0,
  }))
}



export async function resetData(){
  await prisma.sales.deleteMany()
  await prisma.fixed.deleteMany()
  await prisma.labor.deleteMany()
  await prisma.purchase.deleteMany()
  await prisma.variableExpenses.deleteMany()
  await prisma.total.deleteMany()
  await prisma.employee.deleteMany()
  await prisma.paydate.deleteMany()
  revalidatePath("/")
}





