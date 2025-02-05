import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getMonthlyStats } from "../actions"
import { getCurrentMonthYear, formatMonthYear } from "../../lib/date-utils"

export default async function TotalCard() {
  const { month, year } = getCurrentMonthYear()
  const monthlyStats = await getMonthlyStats(month, year)

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Monthly Summary - {formatMonthYear(month, year)}</CardTitle>
      </CardHeader>
      <CardContent>
        {monthlyStats ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Revenue</h3>
              <p>Total Sales: ${monthlyStats.total_sales.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="font-semibold">Expenses</h3>
              <p>Fixed Expenses: ${monthlyStats.total_fixed.toFixed(2)}</p>
              <p>Variable Expenses: ${monthlyStats.total_variable.toFixed(2)}</p>
              <p>Labor: ${monthlyStats.total_labor.toFixed(2)}</p>
              <p>Purchases: ${monthlyStats.total_purchases.toFixed(2)}</p>
              <p className="font-semibold">Total Expenses: ${monthlyStats.total.toFixed(2)}</p>
            </div>
            <div className="col-span-2">
              <h3 className="font-semibold">Profit/Loss</h3>
              <p className={`text-2xl font-bold ${monthlyStats.profit_loss >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${monthlyStats.profit_loss.toFixed(2)}
              </p>
            </div>
          </div>
        ) : (
          <p>No data available for the current month. Please add some entries.</p>
        )}
      </CardContent>
    </Card>
  )
}

