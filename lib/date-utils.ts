export function getWeekOfMonth(date: Date): number {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    return Math.ceil((date.getDate() + firstDayOfMonth.getDay()) / 7)
  }
  
  export function getCurrentMonthYear() {
    const now = new Date()
    return {
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    }
  }
  
  export function formatMonthYear(month: number, year: number): string {
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  }
  
  export function getPaydateDates(month: number, year: number): Date[] {
    // Returns 4 dates for the month (every Friday)
    const dates: Date[] = []
    const date = new Date(year, month - 1, 1)
  
    while (date.getMonth() === month - 1) {
      if (date.getDay() === 5) {
        // Friday
        dates.push(new Date(date))
      }
      date.setDate(date.getDate() + 1)
    }
  
    // Get the first 4 Fridays
    return dates.slice(0, 4)
  }
  
  