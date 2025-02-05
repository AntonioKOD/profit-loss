import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addPurchase } from "../actions"
import { prisma } from "../../lib/prisma"
import { MonthSelect, YearSelect } from "./MonthYearSelect"

async function getTotalPurchases() {
  const totalPurchases = await prisma.purchase.aggregate({
    _sum: {
      amount: true,
    },
  })
  return totalPurchases._sum.amount || 0
}

export default async function PurchaseCard() {
  const totalPurchases = await getTotalPurchases()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Purchase</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={addPurchase} className="space-y-4">
            <MonthSelect />
            <YearSelect />
          <Input type="number" name="amount" placeholder="Amount" step="0.01" required />
          <Input type="text" name="vendor" placeholder="Vendor" required />
          <Input type="text" name="category" placeholder="Category" required />
          <Button type="submit">Add Purchase</Button>
        </form>
        <div className="mt-4">
          <h3 className="font-semibold">Total Purchases</h3>
          <p>${totalPurchases.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  )
}

