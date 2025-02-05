import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addVariableExpenses } from "../actions"
import { prisma } from "../../lib/prisma"
import { MonthSelect, YearSelect } from "./MonthYearSelect"

async function getTotalVariableExpenses() {
  const totalVariableExpenses = await prisma.variableExpenses.aggregate({
    _sum: {
      taxes: true,
      credit_card_fees: true,
      miscellanous: true,
      billboard: true,
      marketing: true,
    },
  })
  return totalVariableExpenses._sum || {}
}

export default async function VariableExpensesCard() {
  const totalVariableExpenses = (await getTotalVariableExpenses()) || {}

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Variable Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={addVariableExpenses} className="space-y-4">
            <MonthSelect />
            <YearSelect />
          <Input type="number" name="taxes" placeholder="Taxes" step="0.01" required />
          <Input type="number" name="credit_card_fees" placeholder="Credit Card Fees" step="0.01" required />
          <Input type="number" name="miscellanous" placeholder="Miscellaneous" step="0.01" required />
          <Input type="number" name="billboard" placeholder="Billboard" step="0.01" required />
          <Input type="number" name="marketing" placeholder="Marketing" step="0.01" required />
          <Button type="submit">Add Variable Expenses</Button>
        </form>
        <div className="mt-4">
          <h3 className="font-semibold">Total Variable Expenses</h3>
          {Object.entries(totalVariableExpenses || {}).map(([key, value]) => (
            <p key={key}>
              {key
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
              : ${value?.toFixed(2) || "0.00"}
            </p>
          ))}
          <p className="font-bold">
            Total: $
            {(Object.values(totalVariableExpenses || {})
              .reduce((sum, value) => (sum ?? 0) + (value ?? 0), 0) as number)
              .toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

