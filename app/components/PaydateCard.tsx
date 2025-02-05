import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addPaydate } from "../actions"
import { prisma } from "../../lib/prisma"
import { MonthSelect, YearSelect } from "./MonthYearSelect"

async function getTotalPayouts() {
  const totalPayouts = await prisma.paydate.aggregate({
    _sum: {
      amount: true,
    },
  })
  return totalPayouts._sum.amount || 0
}

export default async function PaydateCard() {
  const totalPayouts = await getTotalPayouts()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Paydate</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={addPaydate} className="space-y-4">
            <MonthSelect />
            <YearSelect />
          <Input type="number" name="amount" placeholder="Amount" step="0.01" required />
          <Input type="number" name="employeeId" placeholder="Employee ID" required />
          <Button type="submit">Add Paydate</Button>
        </form>
        <div className="mt-4">
          <h3 className="font-semibold">Total Payouts</h3>
          <p>${totalPayouts.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  )
}

