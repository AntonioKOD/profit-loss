import Link from "next/link"
import SalesCard from "./components/SalesCard"
import FixedExpensesCard from "./components/FixedExpensesCard"
import EmployeeCard from "./components/EmployeeCard"
import PaydateCard from "./components/PaydateCard"
import LaborCard from "./components/LaborCard"
import PurchaseCard from "./components/PurchaseCard"
import VariableExpensesCard from "./components/VariableExpensesCard"
import TotalCard from "./components/TotalCard"
import { Button } from "@/components/ui/button"

export default function ProfitLossPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profit & Loss Management</h1>
        <Link href="/insights">
          <Button>View Insights</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TotalCard />
        <SalesCard />
        <FixedExpensesCard />
        <EmployeeCard />
        <PaydateCard />
        <LaborCard />
        <PurchaseCard />
        <VariableExpensesCard />
      </div>
    </div>
  )
}

