"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { getProfitLossData } from "../actions"

export default function ProfitLossLineChart() {
  const [profitLossData, setProfitLossData] = useState<{ month: string; profit: number; loss: number; }[]>([])

  useEffect(() => {
    async function fetchProfitLossData() {
      const data = await getProfitLossData()
      setProfitLossData(data)
    }
    fetchProfitLossData()
  }, [])

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Profit/Loss Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={profitLossData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="profit" name="Profit" stroke="#82ca9d" />
              <Line type="monotone" dataKey="loss" name="Loss" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
