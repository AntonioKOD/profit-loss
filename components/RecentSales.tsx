import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatCurrency } from "@/lib/utils"

interface Transaction {
  type: string;
  vendor: string;
  createdAt: string;
  amount: number;
}

interface RecentSalesProps {
  transactions: Transaction[];
}

export function RecentSales({ transactions }: RecentSalesProps) {
  return (
    <div className="space-y-8">
      {transactions.map((transaction, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{transaction.type === "sale" ? "S" : "E"}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {transaction.type === "sale" ? "Sale" : transaction.vendor}
            </p>
            <p className="text-sm text-muted-foreground">{new Date(transaction.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="ml-auto font-medium">
            {transaction.type === "sale" ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </div>
        </div>
      ))}
    </div>
  )
}

