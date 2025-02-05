"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

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
      employeeId,
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
  })

  const fixed = await prisma.fixed.findMany({
    where: { month, year },
  })

  const labor = await prisma.labor.findMany({
    where: { month, year },
  })

  const purchases = await prisma.purchase.findMany({
    where: { month, year },
  })

  const variableExpenses = await prisma.variableExpenses.findMany({
    where: { month, year },
  })

  // Calculate totals
  const total_sales = sales.reduce((sum, sale) => sum + sale.pos + sale.checks + sale.catering + sale.doordash, 0)

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
    0,
  )

  const total_labor = labor.reduce((sum, lab) => sum + lab.owner_drawer + lab.gusto_online + lab.employees_total, 0)

  const total_purchases = purchases.reduce((sum, purchase) => sum + purchase.amount, 0)

  const total_variable = variableExpenses.reduce(
    (sum, variable) =>
      sum +
      variable.taxes +
      variable.credit_card_fees +
      variable.miscellanous +
      variable.billboard +
      variable.marketing,
    0,
  )

  const total = total_fixed + total_labor + total_purchases + total_variable
  const profit_loss = total_sales - total

  // Update or create the total record
  await prisma.total.upsert({
    where: {
      month_year: {
        month,
        year,
      },
    },
    update: {
      total_sales,
      total_fixed,
      total_variable,
      total_labor,
      total_purchases,
      total,
      profit_loss,
    },
    create: {
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
  })
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
export async function getInsights() {
  const monthlyTotals = await prisma.total.findMany({
    orderBy: {
      year: "asc",
    },
  });

  return monthlyTotals;
}


export { calculateProfitLoss }
