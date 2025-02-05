import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addLabor } from "../actions"
import { prisma } from "../../lib/prisma"
import { MonthSelect, YearSelect } from "./MonthYearSelect"

async function getTotalLabor() {
  const totalLabor = await prisma.labor.aggregate({
    _sum: {
      owner_drawer: true,
      gusto_online: true,
      employees_total: true,
    },
  })
  return totalLabor._sum
}

export default async function LaborCard() {
  const totalLabor = await getTotalLabor()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Labor</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={addLabor} className="space-y-4">
            <MonthSelect />
            <YearSelect />
          <Input type="number" name="owner_drawer" placeholder="Owner Drawer" step="0.01" required />
          <Input type="number" name="gusto_online" placeholder="Gusto Online" step="0.01" required />
          <Input type="number" name="employees_total" placeholder="Employees Total" step="0.01" required />
          <Button type="submit">Add Labor</Button>
        </form>
        <div className="mt-4">
          <h3 className="font-semibold">Total Labor Costs</h3>
          <p>Owner Drawer: ${totalLabor.owner_drawer?.toFixed(2) || "0.00"}</p>
          <p>Gusto Online: ${totalLabor.gusto_online?.toFixed(2) || "0.00"}</p>
          <p>Employees Total: ${totalLabor.employees_total?.toFixed(2) || "0.00"}</p>
          <p className="font-bold">
            Total: $
            {(
              (totalLabor.owner_drawer || 0) +
              (totalLabor.gusto_online || 0) +
              (totalLabor.employees_total || 0)
            ).toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

