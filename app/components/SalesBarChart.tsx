"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { getSalesData } from "../actions"

export default function SalesBarChart() {
  const [salesData, setSalesData] = useState<{ month: string; pos: number; checks: number; catering: number; doordash: number; }[]>([])

  useEffect(() => {
    async function fetchSalesData() {
      const data = await getSalesData()
      setSalesData(data)
    }
    fetchSalesData()
  }, [])

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Monthly Sales Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pos" name="POS" fill="#8884d8" />
              <Bar dataKey="checks" name="Checks" fill="#82ca9d" />
              <Bar dataKey="catering" name="Catering" fill="#ffc658" />
              <Bar dataKey="doordash" name="DoorDash" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
