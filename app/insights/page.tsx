import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "../../lib/prisma"

async function getInsights() {
  const totalSales = await prisma.sales.aggregate({
    _sum: {
      pos: true,
      checks: true,
      catering: true,
      doordash: true,
    },
  })

  const totalFixed = await prisma.fixed.aggregate({
    _sum: {
      rent: true,
      utilities: true,
      comp: true,
      insurance: true,
      supplies: true,
      waste: true,
      internet: true,
      clover: true,
      exterminator: true,
      other: true,
    },
  })

  const totalLabor = await prisma.labor.aggregate({
    _sum: {
      owner_drawer: true,
      gusto_online: true,
      employees_total: true,
    },
  })

  const totalPurchases = await prisma.purchase.aggregate({
    _sum: {
      amount: true,
    },
  })

  const totalVariableExpenses = await prisma.variableExpenses.aggregate({
    _sum: {
      taxes: true,
      credit_card_fees: true,
      miscellanous: true,
      billboard: true,
      marketing: true,
    },
  })

  return {
    totalSales: totalSales._sum,
    totalFixed: totalFixed._sum,
    totalLabor: totalLabor._sum,
    totalPurchases: totalPurchases._sum,
    totalVariableExpenses: totalVariableExpenses._sum,
  }
}

export default async function InsightsPage() {
  const insights = await getInsights()

  const totalRevenue = Object.values(insights.totalSales).reduce((sum, value) => (sum ?? 0) + (value || 0), 0)
const totalExpenses =
    (Object.values(insights.totalFixed ?? {}).reduce((sum, value) => (sum ?? 0) + (value ?? 0), 0) || 0) +
    (Object.values(insights.totalLabor ?? {}).reduce((sum, value) => (sum ?? 0) + (value ?? 0), 0) || 0) +
    (insights.totalPurchases.amount ?? 0) +
    (Object.values(insights.totalVariableExpenses ?? {}).reduce((sum, value) => (sum ?? 0) + (value ?? 0), 0) || 0)

  const netProfit = (totalRevenue ?? 0) - totalExpenses

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Financial Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${(totalRevenue ?? 0).toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${netProfit.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(insights.totalSales).map(([key, value]) => (
              <p key={key}>
                {key}: ${value?.toFixed(2) || "0.00"}
              </p>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Fixed: $
              {Object.values(insights.totalFixed ?? {})
                .reduce((sum, value) => (sum ?? 0) + (value ?? 0), 0) || 0
                .toFixed(2)}
            </p>
            <p>
              Labor: $
              {Object.values(insights.totalLabor ?? {})
                .reduce((sum, value) => (sum ?? 0) + (value ?? 0), 0) || 0
                .toFixed(2)}
            </p>
            <p>Purchases: ${insights.totalPurchases.amount?.toFixed(2) || "0.00"}</p>
            <p>
              Variable: $
              {Object.values(insights.totalVariableExpenses ?? {})
                .reduce((sum, value) => (sum ?? 0) + (value ?? 0), 0) || 0
                .toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

