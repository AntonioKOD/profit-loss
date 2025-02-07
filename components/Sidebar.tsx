'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart, DollarSign, Users, Settings } from "lucide-react"
import DownloadButton from "@/components/DownloadButton"
import { resetData } from "@/app/actions"
import { Button } from "./ui/button"
const routes = [
  {
    label: "Dashboard",
    icon: BarChart,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Finances",
    icon: DollarSign,
    href: "/manage",
    color: "text-violet-500",
  },
  {
    label: "Employees",
    icon: Users,
    color: "text-pink-700",
    href: "/employees",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">FinanceTracker</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
          <DownloadButton/>
          <Button onClick={resetData} className="flex bg-red-600">Reset Data</Button>
        </div>
      </div>
    </div>
  )
}

