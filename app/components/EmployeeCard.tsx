"use client"

import { useState, useTransition } from "react"
import { addEmployee } from "../actions" // Ensure this is correctly exported as a "use server" function
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function EmployeeCard() {
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [wage, setWage] = useState("")
  const [message, setMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("") // Reset message

    // Convert form data
    const formData = new FormData()
    formData.append("name", name)
    formData.append("position", position)
    formData.append("wage", wage)

    startTransition(async () => {
      try {
        await addEmployee(formData) // ✅ Correct: Pass a FormData object
        setMessage("✅ Employee added successfully!")
        setName("")
        setPosition("")
        setWage("")
      } catch (error) {
        console.error("Error adding employee:", error)
        setMessage("❌ Error adding employee. Please try again.")
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Employee</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <Input type="number" placeholder="Wage" value={wage} onChange={(e) => setWage(e.target.value)} required />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Adding..." : "Add Employee"}
          </Button>
          {message && <p className={`text-sm ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>{message}</p>}
        </form>
      </CardContent>
    </Card>
  )
}