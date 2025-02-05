/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addVariableExpenses } from "../actions"
import { useToast } from "@/hooks/use-toast"

const variableExpensesFormSchema = z.object({
  month: z.string().min(1, "Month is required"),
  year: z.string().min(1, "Year is required"),
  taxes: z.string().min(1, "Taxes are required"),
  credit_card_fees: z.string().min(1, "Credit card fees are required"),
  miscellanous: z.string().min(1, "Miscellaneous expenses are required"),
  billboard: z.string().min(1, "Billboard expenses are required"),
  marketing: z.string().min(1, "Marketing expenses are required"),
})

export default function VariableExpensesForm() {
    const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof variableExpensesFormSchema>>({
    resolver: zodResolver(variableExpensesFormSchema),
    defaultValues: {
      month: new Date().getMonth() + 1 + "",
      year: new Date().getFullYear() + "",
      taxes: "",
      credit_card_fees: "",
      miscellanous: "",
      billboard: "",
      marketing: "",
    },
  })

  async function onSubmit(values: z.infer<typeof variableExpensesFormSchema>) {
    setIsSubmitting(true)
    try {
      await addVariableExpenses(new FormData(document.querySelector("form") as HTMLFormElement))
      form.reset()
      toast({
        title: "Variable expenses added successfully",
        description: "Your variable expenses data has been recorded.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem adding your variable expenses data.",
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
        {["taxes", "credit_card_fees", "miscellanous", "billboard", "marketing"].map((expense) => (
          <FormField
            key={expense}
            control={form.control}
            name={expense as keyof z.infer<typeof variableExpensesFormSchema>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {expense
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Variable Expenses"}
        </Button>
      </form>
    </Form>
  )
}

