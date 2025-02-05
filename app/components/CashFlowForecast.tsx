'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCashFlowData } from "../actions"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"



export default function CashFlowForecast() {

    const [cashFlowData, setCashFlowData] = useState<{ date: string; revenue: number; expenses: number; cashFlow: number; }[]>([])

    useEffect(() => {
        getCashFlowData().then(data => setCashFlowData(data))
    }, [])
    // const cashFlowData = getCashFlowData()

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Cash Flow Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
              <Line type="monotone" dataKey="expenses" stroke="#82ca9d" name="Expenses" />
              <Line type="monotone" dataKey="cashFlow" stroke="#ffc658" name="Cash Flow" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

