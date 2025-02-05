import { prisma } from "../../lib/prisma"
import { getCurrentMonthYear } from "../../lib/date-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

async function getFinancialOverview() {
  const { month, year } = getCurrentMonthYear()
  const currentMonthData = await prisma.total.findFirst({
    where: { month, year },
  })
  const previousMonthData = await prisma.total.findFirst({
    where: month === 1 ? { month: 12, year: year - 1 } : { month: month - 1, year },
  })

  return { currentMonthData, previousMonthData }
}

export default async function FinancialOverview() {
  const { currentMonthData, previousMonthData } = await getFinancialOverview()

  const calculateChange = (current: number, previous: number) => {
    if (!previous) return 100
    return ((current - previous) / previous) * 100
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
  }

  const renderChangeIndicator = (change: number) => {
    const Icon = change >= 0 ? ArrowUpIcon : ArrowDownIcon
    const color = change >= 0 ? "text-green-600" : "text-red-600"
    return (
      <span className={`flex items-center ${color}`}>
        <Icon className="w-4 h-4 mr-1" />
        {Math.abs(change).toFixed(2)}%
      </span>
    )
  }

  if (!currentMonthData) {
    return <p>No financial data available for the current month.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          {renderChangeIndicator(calculateChange(currentMonthData.total_sales, previousMonthData?.total_sales || 0))}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(currentMonthData.total_sales)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          {renderChangeIndicator(calculateChange(currentMonthData.total, previousMonthData?.total || 0))}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(currentMonthData.total)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          {renderChangeIndicator(calculateChange(currentMonthData.profit_loss, previousMonthData?.profit_loss || 0))}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(currentMonthData.profit_loss)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {((currentMonthData.profit_loss / currentMonthData.total_sales) * 100).toFixed(2)}%
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

