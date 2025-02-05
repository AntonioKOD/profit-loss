import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addEmployee } from "../actions"
import { prisma } from "../../lib/prisma"

async function getEmployeeCount() {
  return await prisma.employee.count()
}

async function getEmployees() {
  return await prisma.employee.findMany({
    include: {
      paydates: {
        orderBy: {
          date: "desc",
        },
        take: 1,
      },
    },
  })
}

export default async function EmployeeCard() {
  const employeeCount = await getEmployeeCount()
  const employees = await getEmployees()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={addEmployee} className="space-y-4">
          <Input type="text" name="name" placeholder="Name" required />
          <Input type="text" name="position" placeholder="Position" required />
          <Input type="number" name="wage" placeholder="Wage" step="0.01" required />
          <Button type="submit">Add Employee</Button>
        </form>
        <div className="mt-4">
          <h3 className="font-semibold">Employee Count: {employeeCount}</h3>
          <ul className="mt-2 space-y-2">
            {employees.map((employee) => (
              <li key={employee.id}>
                {employee.name} - {employee.position} - ${employee.wage.toFixed(2)}/hr
                {employee.paydates[0] && (
                  <span className="ml-2 text-sm text-gray-500">
                    Last paid: {new Date(employee.paydates[0].date).toLocaleDateString()}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

