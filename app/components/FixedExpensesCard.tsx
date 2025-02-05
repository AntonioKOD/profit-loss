import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addFixed } from "../actions"
import { prisma } from "../../lib/prisma"
import { MonthSelect, YearSelect } from "./MonthYearSelect"

async function getTotalFixedExpenses() {
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
  return totalFixed._sum
}

export default async function FixedExpensesCard() {
  const totalFixed: { [key: string]: number | null } = await getTotalFixedExpenses()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fixed Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={addFixed} className="space-y-4">
          <MonthSelect />
          <YearSelect />
          <Input type="number" name="rent" placeholder="Rent" step="0.01" required />
          <Input type="number" name="utilities" placeholder="Utilities" step="0.01" required />
          <Input type="number" name="comp" placeholder="Comp" step="0.01" required />
          <Input type="number" name="insurance" placeholder="Insurance" step="0.01" required />
          <Input type="number" name="supplies" placeholder="Supplies" step="0.01" required />
          <Input type="number" name="waste" placeholder="Waste" step="0.01" required />
          <Input type="number" name="internet" placeholder="Internet" step="0.01" required />
          <Input type="number" name="clover" placeholder="Clover" step="0.01" required />
          <Input type="number" name="exterminator" placeholder="Exterminator" step="0.01" required />
          <Input type="number" name="other" placeholder="Other" step="0.01" />
          <Button type="submit">Add Fixed Expenses</Button>
        </form>
        <div className="mt-4">
          <h3 className="font-semibold">Total Fixed Expenses</h3>
          {Object.entries(totalFixed).map(([key, value]) => (
            <p key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}: ${value?.toFixed(2) || "0.00"}
            </p>
          ))}
          <p className="font-bold">
            Total: $
            {Object.values(totalFixed)
              .reduce((sum: number, value: number | null) => sum + (value || 0), 0)
              .toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

