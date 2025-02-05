import type { Metadata } from "next"
import { getEmployees } from "../actions"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Employees",
  description: "Manage your employees and their information.",
}

export default async function EmployeesPage() {
  const employees = await getEmployees()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Link href="/employees/add">
          <Button>Add Employee</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={employees} />
    </div>
  )
}

