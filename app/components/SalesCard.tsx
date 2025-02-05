import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addSales } from "../actions"
import { prisma } from "../../lib/prisma"
import { MonthSelect, YearSelect } from "./MonthYearSelect"

async function getTotalSales() {
  const totalSales = await prisma.sales.aggregate({
    _sum: {
      pos: true,
      checks: true,
      catering: true,
      doordash: true,
    },
  })
  return totalSales._sum
}

export default async function SalesCard() {
  const totalSales = await getTotalSales()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={addSales} className="space-y-4">
            <MonthSelect /> 
            <YearSelect />
          <Input type="number" name="pos" placeholder="POS" step="0.01" required />
          <Input type="number" name="checks" placeholder="Checks" step="0.01" required />
          <Input type="number" name="catering" placeholder="Catering" step="0.01" required />
          <Input type="number" name="doordash" placeholder="DoorDash" step="0.01" required />
          <Button type="submit">Add Sales</Button>
        </form>
        <div className="mt-4">
          <h3 className="font-semibold">Total Sales</h3>
          <p>POS: ${totalSales.pos?.toFixed(2) || "0.00"}</p>
          <p>Checks: ${totalSales.checks?.toFixed(2) || "0.00"}</p>
          <p>Catering: ${totalSales.catering?.toFixed(2) || "0.00"}</p>
          <p>DoorDash: ${totalSales.doordash?.toFixed(2) || "0.00"}</p>
          <p className="font-bold">
            Total: $
            {(
              (totalSales.pos || 0) +
              (totalSales.checks || 0) +
              (totalSales.catering || 0) +
              (totalSales.doordash || 0)
            ).toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

