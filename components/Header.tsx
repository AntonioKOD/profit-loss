import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { Bell } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="h-16 flex items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

