import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addPaydate } from "../actions"
import { prisma } from "../../lib/prisma"

async function getEmployees() {
  return await prisma.employee.findMany({
    select: {
      id: true,
      name: true,
    },
  })
}

async function getRecentPaydates() {
  return await prisma.paydate.findMany({
    take: 5,
    orderBy: {
      date: "desc",
    },
    include: {
      employee: true,
    },
  })
}

export default async function PaydateCard() {
  const employees = await getEmployees()
  const recentPaydates = await getRecentPaydates()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Paydate</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={addPaydate} className="space-y-4">
          <Input type="date" name="date" required />
          <Input type="number" name="amount" placeholder="Amount" step="0.01" required />
          <select name="employeeId" className="w-full p-2 border rounded">
            <option value="">Select an employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
          <Button type="submit">Add Paydate</Button>
        </form>
        <div className="mt-4">
          <h3 className="font-semibold">Recent Paydates</h3>
          <ul className="mt-2 space-y-2">
            {recentPaydates.map((paydate) => (
              <li key={paydate.id}>
                {paydate.employee.name} - ${paydate.amount.toFixed(2)} - {new Date(paydate.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}


