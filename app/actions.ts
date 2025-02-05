'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function addSales(formData: FormData) {
  const month = parseInt(formData.get('month') as string)
  const year = parseInt(formData.get('year') as string)
  const pos = parseFloat(formData.get('pos') as string)
  const checks = parseFloat(formData.get('checks') as string)
  const catering = parseFloat(formData.get('catering') as string)
  const doordash = parseFloat(formData.get('doordash') as string)

  await prisma.sales.create({
    data: {
      month,
      year,
      pos,
      checks,
      catering,
      doordash
    }
  })

  revalidatePath('/')
}

export async function addFixed(formData: FormData) {
  const month = parseInt(formData.get('month') as string)
  const year = parseInt(formData.get('year') as string)
  const rent = parseFloat(formData.get('rent') as string)
  const utilities = parseFloat(formData.get('utilities') as string)
  const comp = parseFloat(formData.get('comp') as string)
  const insurance = parseFloat(formData.get('insurance') as string)
  const supplies = parseFloat(formData.get('supplies') as string)
  const waste = parseFloat(formData.get('waste') as string)
  const internet = parseFloat(formData.get('internet') as string)
  const clover = parseFloat(formData.get('clover') as string)
  const exterminator = parseFloat(formData.get('exterminator') as string)
  const other = formData.get('other') ? parseFloat(formData.get('other') as string) : null

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
      other
    }
  })

  revalidatePath('/')
}

export async function addEmployee(formData: FormData) {
  const name = formData.get('name') as string
  const position = formData.get('position') as string
  const wage = parseFloat(formData.get('wage') as string)

  await prisma.employee.create({
    data: {
      name,
      position,
      wage
    }
  })

  revalidatePath('/')
}

export async function addPaydate(formData: FormData) {
  const month = parseInt(formData.get('month') as string)
  const year = parseInt(formData.get('year') as string)
  const amount = parseFloat(formData.get('amount') as string)
  const employeeId = parseInt(formData.get('employeeId') as string)

  await prisma.paydate.create({
    data: {
      month,
      year,
      amount,
      employeeId
    }
  })

  revalidatePath('/')
}

export async function addLabor(formData: FormData) {
  const month = parseInt(formData.get('month') as string)
  const year = parseInt(formData.get('year') as string)
  const owner_drawer = parseFloat(formData.get('owner_drawer') as string)
  const gusto_online = parseFloat(formData.get('gusto_online') as string)
  const employees_total = parseFloat(formData.get('employees_total') as string)

  await prisma.labor.create({
    data: {
      month,
      year,
      owner_drawer,
      gusto_online,
      employees_total
    }
  })

  revalidatePath('/')
}

export async function addPurchase(formData: FormData) {
  const month = parseInt(formData.get('month') as string)
  const year = parseInt(formData.get('year') as string)
  const amount = parseFloat(formData.get('amount') as string)
  const vendor = formData.get('vendor') as string
  const category = formData.get('category') as string

  await prisma.purchase.create({
    data: {
      month,
      year,
      amount,
      vendor,
      category
    }
  })

  revalidatePath('/')
}

export async function addVariableExpenses(formData: FormData) {
  const month = parseInt(formData.get('month') as string)
  const year = parseInt(formData.get('year') as string)
  const taxes = parseFloat(formData.get('taxes') as string)
  const credit_card_fees = parseFloat(formData.get('credit_card_fees') as string)
  const miscellanous = parseFloat(formData.get('miscellanous') as string)
  const billboard = parseFloat(formData.get('billboard') as string)
  const marketing = parseFloat(formData.get('marketing') as string)

  await prisma.variableExpenses.create({
    data: {
      month,
      year,
      taxes,
      credit_card_fees,
      miscellanous,
      billboard,
      marketing
    }
  })

  revalidatePath('/')
}

export async function addTotal(formData: FormData) {
  const month = parseInt(formData.get('month') as string)
  const year = parseInt(formData.get('year') as string)
  const total_sales = parseFloat(formData.get('total_sales') as string)
  const total_fixed = parseFloat(formData.get('total_fixed') as string)
  const total_variable = parseFloat(formData.get('total_variable') as string)
  const total_labor = parseFloat(formData.get('total_labor') as string)
  const total_purchases = parseFloat(formData.get('total_purchases') as string)
  const total = parseFloat(formData.get('total') as string)

  await prisma.total.create({
    data: {
      month,
      year,
      total_sales,
      total_fixed,
      total_variable,
      total_labor,
      total_purchases,
      total
    }
  })

  revalidatePath('/')
}
