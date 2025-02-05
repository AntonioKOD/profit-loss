import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "../../lib/prisma"

async function getRecentTransactions() {
  const recentSales = await prisma.sales.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  })

  const recentExpenses = await prisma.purchase.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  })

  return [
    ...recentSales.map((sale) => ({ ...sale, type: "sale" })),
    ...recentExpenses.map((expense) => ({ ...expense, type: "expense", amount: expense.amount, vendor: expense.vendor })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5)
}

export default async function RecentTransactions() {
  const transactions = await getRecentTransactions()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {transactions.map((transaction, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{transaction.type === "sale" ? "Sale" : 'vendor' in transaction ? transaction.vendor : ''}</span>
              <span className={transaction.type === "sale" ? "text-green-600" : "text-red-600"}>
                {transaction.type === "sale"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ? `+$${((transaction as any).pos + (transaction as any).checks + (transaction as any).catering + (transaction as any).doordash).toFixed(2)}`
                  : `-$${'amount' in transaction ? transaction.amount.toFixed(2) : 0}`}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

