import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "../../lib/prisma"
import { getCurrentMonthYear } from "../../lib/date-utils"

async function getMonthlyOverview() {
  const { month, year } = getCurrentMonthYear()
  const currentMonthData = await prisma.total.findFirst({
    where: { month, year },
  })
  const previousMonthData = await prisma.total.findFirst({
    where: month === 1 ? { month: 12, year: year - 1 } : { month: month - 1, year },
  })

  return { currentMonthData, previousMonthData }
}

export default async function DashboardOverview() {
  const { currentMonthData, previousMonthData } = await getMonthlyOverview()

  const calculateChange = (current: number, previous: number) => {
    if (!previous) return 100
    return ((current - previous) / previous) * 100
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Revenue</p>
            <p className="text-2xl font-bold">${currentMonthData?.total_sales.toFixed(2)}</p>
            <p
              className={`text-xs ${calculateChange(currentMonthData?.total_sales || 0, previousMonthData?.total_sales || 0) >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {calculateChange(currentMonthData?.total_sales || 0, previousMonthData?.total_sales || 0).toFixed(2)}%
              from last month
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Expenses</p>
            <p className="text-2xl font-bold">${currentMonthData?.total.toFixed(2)}</p>
            <p
              className={`text-xs ${calculateChange(currentMonthData?.total || 0, previousMonthData?.total || 0) <= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {calculateChange(currentMonthData?.total || 0, previousMonthData?.total || 0).toFixed(2)}% from last month
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Profit</p>
            <p className="text-2xl font-bold">${currentMonthData?.profit_loss.toFixed(2)}</p>
            <p
              className={`text-xs ${calculateChange(currentMonthData?.profit_loss || 0, previousMonthData?.profit_loss || 0) >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {calculateChange(currentMonthData?.profit_loss || 0, previousMonthData?.profit_loss || 0).toFixed(2)}%
              from last month
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Profit Margin</p>
            <p className="text-2xl font-bold">
              {(((currentMonthData?.profit_loss || 0) / (currentMonthData?.total_sales || 1)) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

