/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addLabor } from "../actions"
import { useToast } from "@/hooks/use-toast"

const laborFormSchema = z.object({
  month: z.string().min(1, "Month is required"),
  year: z.string().min(1, "Year is required"),
  owner_drawer: z.string().min(1, "Owner drawer is required"),
  gusto_online: z.string().min(1, "Gusto online is required"),
  employees_total: z.string().min(1, "Employees total is required"),
})

export default function LaborForm() {
    const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof laborFormSchema>>({
    resolver: zodResolver(laborFormSchema),
    defaultValues: {
      month: new Date().getMonth() + 1 + "",
      year: new Date().getFullYear() + "",
      owner_drawer: "",
      gusto_online: "",
      employees_total: "",
    },
  })

  async function onSubmit(values: z.infer<typeof laborFormSchema>) {
    setIsSubmitting(true)
    try {
      await addLabor(new FormData(document.querySelector("form") as HTMLFormElement))
      form.reset()
      toast({
        title: "Labor costs added successfully",
        description: "Your labor cost data has been recorded.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem adding your labor cost data.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Month</FormLabel>
              <FormControl>
                <Input type="number" {...field} min="1" max="12" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input type="number" {...field} min="2000" max="2100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner_drawer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Drawer</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gusto_online"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gusto Online</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employees_total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employees Total</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Labor Costs"}
        </Button>
      </form>
    </Form>
  )
}

