import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addTotal } from "../actions"
import { prisma } from "../../lib/prisma"
import { MonthSelect, YearSelect } from "./MonthYearSelect"

async function getGrandTotal() {
  const grandTotal = await prisma.total.aggregate({
    _sum: {
      total: true,
    },
  })
  return grandTotal._sum.total || 0
}

export default async function TotalCard() {
  const grandTotal = await getGrandTotal()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Total</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={addTotal} className="space-y-4">
            <MonthSelect />
            <YearSelect />
          <Input type="number" name="total_sales" placeholder="Total Sales" step="0.01" required />
          <Input type="number" name="total_fixed" placeholder="Total Fixed" step="0.01" required />
          <Input type="number" name="total_variable" placeholder="Total Variable" step="0.01" required />
          <Input type="number" name="total_labor" placeholder="Total Labor" step="0.01" required />
          <Input type="number" name="total_purchases" placeholder="Total Purchases" step="0.01" required />
          <Input type="number" name="total" placeholder="Total" step="0.01" required />
          <Button type="submit">Add Total</Button>
        </form>
        <div className="mt-4">
          <h3 className="font-semibold">Grand Total</h3>
          <p>${grandTotal.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  )
}

