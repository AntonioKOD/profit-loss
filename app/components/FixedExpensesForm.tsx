/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addFixed } from "../actions"
import { useToast } from "@/hooks/use-toast"

const fixedExpensesFormSchema = z.object({
  month: z.string().min(1, "Month is required"),
  year: z.string().min(1, "Year is required"),
  rent: z.string().min(1, "Rent is required"),
  utilities: z.string().min(1, "Utilities are required"),
  comp: z.string().min(1, "Comp is required"),
  insurance: z.string().min(1, "Insurance is required"),
  supplies: z.string().min(1, "Supplies are required"),
  waste: z.string().min(1, "Waste is required"),
  internet: z.string().min(1, "Internet is required"),
  clover: z.string().min(1, "Clover is required"),
  exterminator: z.string().min(1, "Exterminator is required"),
  other: z.string().optional(),
})

export default function FixedExpensesForm() {
    const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof fixedExpensesFormSchema>>({
    resolver: zodResolver(fixedExpensesFormSchema),
    defaultValues: {
      month: new Date().getMonth() + 1 + "",
      year: new Date().getFullYear() + "",
      rent: "",
      utilities: "",
      comp: "",
      insurance: "",
      supplies: "",
      waste: "",
      internet: "",
      clover: "",
      exterminator: "",
      other: "",
    },
  })

  async function onSubmit(values: z.infer<typeof fixedExpensesFormSchema>) {
    setIsSubmitting(true)
    try {
      await addFixed(new FormData(document.querySelector("form") as HTMLFormElement))
      form.reset()
      toast({
        title: "Fixed expenses added successfully",
        description: "Your fixed expenses data has been recorded.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem adding your fixed expenses data.",
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
        {[
          "rent",
          "utilities",
          "comp",
          "insurance",
          "supplies",
          "waste",
          "internet",
          "clover",
          "exterminator",
          "other",
        ].map((expense) => (
          <FormField
            key={expense}
            control={form.control}
            name={expense as keyof z.infer<typeof fixedExpensesFormSchema>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{expense.charAt(0).toUpperCase() + expense.slice(1)}</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Fixed Expenses"}
        </Button>
      </form>
    </Form>
  )
}

