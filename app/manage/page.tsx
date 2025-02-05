import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import SalesForm from "../components/SalesForm"
import FixedExpensesForm from "../components/FixedExpensesForm"
import VariableExpensesForm from "../components/VariableExpensesForm"
import PurchaseForm from "../components/PurchaseForm"
import LaborForm from "../components/LaborForm"
import EmployeeManagement from "../components/EmployeeManagement"
import FinancialOverview from "../components/FinancialOverview"

export default function ManageFinancesPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Finances</h1>
        <Link href="/">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Get a quick snapshot of your financial status</CardDescription>
            </CardHeader>
            <CardContent>
              <FinancialOverview />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle>Income Management</CardTitle>
              <CardDescription>Record and manage your sales and income</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Expense Management</CardTitle>
              <CardDescription>Track and categorize your expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="fixed">
                <TabsList>
                  <TabsTrigger value="fixed">Fixed Expenses</TabsTrigger>
                  <TabsTrigger value="variable">Variable Expenses</TabsTrigger>
                  <TabsTrigger value="purchases">Purchases</TabsTrigger>
                  <TabsTrigger value="labor">Labor</TabsTrigger>
                </TabsList>
                <TabsContent value="fixed">
                  <FixedExpensesForm />
                </TabsContent>
                <TabsContent value="variable">
                  <VariableExpensesForm />
                </TabsContent>
                <TabsContent value="purchases">
                  <PurchaseForm />
                </TabsContent>
                <TabsContent value="labor">
                  <LaborForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>Employee Management</CardTitle>
              <CardDescription>Manage employees and process payroll</CardDescription>
            </CardHeader>
            <CardContent>
              <EmployeeManagement />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

