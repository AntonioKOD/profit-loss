/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addEmployee, addPaydate, getEmployees } from "../actions"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const employeeFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  wage: z.string().min(1, "Wage is required"),
})

const paydateFormSchema = z.object({
  date: z.string().min(1, "Date is required"),
  amount: z.string().min(1, "Amount is required"),
  employeeId: z.string().min(1, "Employee is required"),
})

export default function EmployeeManagement() {
    const { toast } = useToast()
  const [isSubmittingEmployee, setIsSubmittingEmployee] = useState(false)
  const [isSubmittingPaydate, setIsSubmittingPaydate] = useState(false)
  const [employees, setEmployees] = useState<{ name: string; position: string; wage: number; id: number; createdAt: Date; updatedAt: Date; }[]>([])

  const employeeForm = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      name: "",
      position: "",
      wage: "",
    },
  })

  const paydateForm = useForm<z.infer<typeof paydateFormSchema>>({
    resolver: zodResolver(paydateFormSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      amount: "",
      employeeId: "",
    },
  })

  useEffect(() => {
    async function fetchEmployees() {
      const fetchedEmployees = (await getEmployees()).map((employee: any) => ({
        ...employee,
        id: Number(employee.id),
      }))
      setEmployees(fetchedEmployees)
    }
    fetchEmployees()
  }, [])

  async function onSubmitEmployee(values: z.infer<typeof employeeFormSchema>) {
    setIsSubmittingEmployee(true)
    try {
      await addEmployee(new FormData(document.querySelector("form") as HTMLFormElement))
      employeeForm.reset()
      toast({
        title: "Employee added successfully",
        description: "The new employee has been added to the system.",
      })
      // Refresh the employee list
      const updatedEmployees = (await getEmployees()).map((employee: any) => ({
        ...employee,
        id: Number(employee.id),
      }))
      setEmployees(updatedEmployees)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem adding the employee.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingEmployee(false)
    }
  }

  async function onSubmitPaydate(values: z.infer<typeof paydateFormSchema>) {
    setIsSubmittingPaydate(true)
    try {
      await addPaydate(new FormData(document.querySelector("form") as HTMLFormElement))
      paydateForm.reset()
      toast({
        title: "Paydate added successfully",
        description: "The paydate has been recorded.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem adding the paydate.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingPaydate(false)
    }
  }

  return (
    <Tabs defaultValue="view-employees" className="w-full">
      <TabsList>
        <TabsTrigger value="view-employees">View Employees</TabsTrigger>
        <TabsTrigger value="add-employee">Add Employee</TabsTrigger>
        <TabsTrigger value="add-paydate">Add Paydate</TabsTrigger>
      </TabsList>
      <TabsContent value="view-employees">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Wage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee: any) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>${employee.wage.toFixed(2)}/hr</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="add-employee">
        <Form {...employeeForm}>
          <form onSubmit={employeeForm.handleSubmit(onSubmitEmployee)} className="space-y-8">
            <FormField
              control={employeeForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={employeeForm.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={employeeForm.control}
              name="wage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Wage</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmittingEmployee}>
              {isSubmittingEmployee ? "Adding..." : "Add Employee"}
            </Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="add-paydate">
        <Form {...paydateForm}>
          <form onSubmit={paydateForm.handleSubmit(onSubmitPaydate)} className="space-y-8">
            <FormField
              control={paydateForm.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={paydateForm.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={paydateForm.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Employee ID" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmittingPaydate}>
              {isSubmittingPaydate ? "Adding..." : "Add Paydate"}
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  )
}

