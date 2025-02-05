"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMonthYear } from "../../lib/date-utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface Insight {
  month: number;
  year: number;
  total_sales?: number;
  total_fixed?: number;
  total_variable?: number;
  total_labor?: number;
  total_purchases?: number;
  total?: number;
  netProfit?: number;
}

interface InsightsClientProps {
  insights: Insight[];
}

export default function InsightsClient({ insights }: InsightsClientProps) {
  if (!insights || insights.length === 0) {
    return <p className="text-center text-gray-500">No financial data available.</p>;
  }

  const chartData = insights.map((insight) => ({
    date: formatMonthYear(insight.month, insight.year),
    sales: insight.total_sales ?? 0,
    expenses:
      (insight.total_fixed ?? 0) + (insight.total_variable ?? 0) + (insight.total_labor ?? 0) + (insight.total_purchases ?? 0),
    profit: insight.total ?? insight.netProfit ?? 0, // Ensure correct field name
  }));

  const expenseBreakdownData = insights.map((insight) => ({
    date: formatMonthYear(insight.month, insight.year),
    fixed: insight.total_fixed ?? 0,
    variable: insight.total_variable ?? 0,
    labor: insight.total_labor ?? 0,
    purchases: insight.total_purchases ?? 0,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Financial Insights</h1>

      {/* Overall Performance Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Overall Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales" />
                <Line type="monotone" dataKey="expenses" stroke="#82ca9d" name="Expenses" />
                <Line type="monotone" dataKey="profit" stroke="#ffc658" name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="fixed" stackId="a" fill="#8884d8" name="Fixed Expenses" />
                <Bar dataKey="variable" stackId="a" fill="#82ca9d" name="Variable Expenses" />
                <Bar dataKey="labor" stackId="a" fill="#ffc658" name="Labor" />
                <Bar dataKey="purchases" stackId="a" fill="#ff8042" name="Purchases" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Financial Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Month</th>
                  <th className="px-6 py-3">Sales</th>
                  <th className="px-6 py-3">Fixed Expenses</th>
                  <th className="px-6 py-3">Variable Expenses</th>
                  <th className="px-6 py-3">Labor</th>
                  <th className="px-6 py-3">Purchases</th>
                  <th className="px-6 py-3">Total Expenses</th>
                  <th className="px-6 py-3">Profit/Loss</th>
                </tr>
              </thead>
              <tbody>
                {insights.map((insight, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {formatMonthYear(insight.month, insight.year)}
                    </th>
                    <td className="px-6 py-4">${(insight.total_sales ?? 0).toFixed(2)}</td>
                    <td className="px-6 py-4">${(insight.total_fixed ?? 0).toFixed(2)}</td>
                    <td className="px-6 py-4">${(insight.total_variable ?? 0).toFixed(2)}</td>
                    <td className="px-6 py-4">${(insight.total_labor ?? 0).toFixed(2)}</td>
                    <td className="px-6 py-4">${(insight.total_purchases ?? 0).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      $
                      {(
                        (insight.total_fixed ?? 0) +
                        (insight.total_variable ?? 0) +
                        (insight.total_labor ?? 0) +
                        (insight.total_purchases ?? 0)
                      ).toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 ${(insight.total ?? 0) >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${(insight.total ?? 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}