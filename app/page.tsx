
import SalesCard from "./components/SalesCard"
import FixedExpensesCard from "./components/FixedExpensesCard"
import EmployeeCard from "./components/EmployeeCard"
import PaydateCard from "./components/PaydateCard"
import LaborCard from "./components/LaborCard"
import PurchaseCard from "./components/PurchaseCard"
import VariableExpensesCard from "./components/VariableExpensesCard"
import TotalCard from "./components/TotalCard"

export default function ProfitLossPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profit & Loss Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SalesCard />
        <FixedExpensesCard />
        <EmployeeCard />
        <PaydateCard />
        <LaborCard />
        <PurchaseCard />
        <VariableExpensesCard />
        <TotalCard />
      </div>
    </div>
  )
}

