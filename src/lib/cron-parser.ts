export class CronParser {
  // Get the next N execution times for a cron expression
  static getNextRuns(expression: string, count: number): string[] {
    // Simple validation
    if (!this.isValidExpression(expression)) {
      return ["Invalid cron expression"]
    }

    const now = new Date()
    const results: string[] = []

    let currentDate = new Date(now)

    for (let i = 0; i < count; i++) {
      currentDate = this.getNextOccurrence(expression, currentDate)
      results.push(this.formatDate(currentDate))
      // Move forward 1 minute to find the next occurrence
      currentDate = new Date(currentDate.getTime() + 60000)
    }

    return results
  }

  // Get a human-readable description of the cron expression
  static getDescription(expression: string): string {
    if (!this.isValidExpression(expression)) {
      return "Invalid cron expression"
    }

    const parts = expression.split(" ")
    const minute = parts[0]
    const hour = parts[1]
    const dayOfMonth = parts[2]
    const month = parts[3]
    const dayOfWeek = parts[4]

    let description = "Runs"

    // Minutes
    if (minute === "*") {
      description += " every minute"
    } else if (minute.includes("*/")) {
      const interval = minute.split("/")[1]
      description += ` every ${interval} minutes`
    } else if (minute.includes(",")) {
      description += ` at minutes ${minute}`
    } else if (minute.includes("-")) {
      description += ` at minutes ${minute}`
    } else {
      description += ` at minute ${minute}`
    }

    // Hours
    if (hour !== "*") {
      if (hour.includes("*/")) {
        const interval = hour.split("/")[1]
        description += `, every ${interval} hours`
      } else if (hour.includes(",")) {
        description += `, during hours ${hour}`
      } else if (hour.includes("-")) {
        description += `, between ${hour.split("-")[0]}:00 and ${hour.split("-")[1]}:00`
      } else {
        description += `, at ${hour}:00`
      }
    }

    // Day of month
    if (dayOfMonth !== "*") {
      if (dayOfMonth === "L") {
        description += ", on the last day of the month"
      } else if (dayOfMonth.includes(",")) {
        description += `, on days ${dayOfMonth} of the month`
      } else if (dayOfMonth.includes("-")) {
        description += `, between days ${dayOfMonth} of the month`
      } else {
        description += `, on day ${dayOfMonth} of the month`
      }
    }

    // Month
    if (month !== "*") {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]

      if (month.includes(",")) {
        const months = month.split(",").map((m) => {
          const num = Number.parseInt(m, 10)
          return isNaN(num) ? m : monthNames[num - 1]
        })
        description += `, in ${months.join(" and ")}`
      } else if (month.includes("-")) {
        const [start, end] = month.split("-").map((m) => {
          const num = Number.parseInt(m, 10)
          return isNaN(num) ? m : monthNames[num - 1]
        })
        description += `, from ${start} to ${end}`
      } else {
        const num = Number.parseInt(month, 10)
        const monthName = isNaN(num) ? month : monthNames[num - 1]
        description += `, in ${monthName}`
      }
    }

    // Day of week
    if (dayOfWeek !== "*") {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

      if (dayOfWeek === "1-5") {
        description += ", on weekdays"
      } else if (dayOfWeek === "0,6" || dayOfWeek === "6,0") {
        description += ", on weekends"
      } else if (dayOfWeek.includes(",")) {
        const days = dayOfWeek.split(",").map((d) => {
          const num = Number.parseInt(d, 10)
          return isNaN(num) ? d : dayNames[num]
        })
        description += `, on ${days.join(" and ")}`
      } else if (dayOfWeek.includes("-")) {
        const [start, end] = dayOfWeek.split("-").map((d) => {
          const num = Number.parseInt(d, 10)
          return isNaN(num) ? d : dayNames[num]
        })
        description += `, from ${start} to ${end}`
      } else {
        const num = Number.parseInt(dayOfWeek, 10)
        const dayName = isNaN(num) ? dayOfWeek : dayNames[num]
        description += `, on ${dayName}`
      }
    }

    return description
  }

  // Basic validation for cron expressions
  static isValidExpression(expression: string): boolean {
    const parts = expression.split(" ")
    return parts.length === 5
  }

  // Get the next occurrence of a cron expression after a given date
  private static getNextOccurrence(expression: string, after: Date): Date {
    const parts = expression.split(" ")
    const minute = parts[0]
    const hour = parts[1]
    const dayOfMonth = parts[2]
    const month = parts[3]
    const dayOfWeek = parts[4]

    // This is a simplified implementation
    // In a real app, you would use a proper cron parser library

    const result = new Date(after)
    result.setSeconds(0)
    result.setMilliseconds(0)

    // Add at least one minute to ensure we get the next occurrence
    result.setMinutes(result.getMinutes() + 1)

    // Simple handling for common patterns
    if (minute !== "*") {
      if (minute.includes("*/")) {
        const interval = Number.parseInt(minute.split("/")[1], 10)
        const currentMinute = result.getMinutes()
        const nextMinute = Math.ceil(currentMinute / interval) * interval
        result.setMinutes(nextMinute % 60)
        if (nextMinute >= 60) {
          result.setHours(result.getHours() + 1)
        }
      } else if (!isNaN(Number.parseInt(minute, 10))) {
        const targetMinute = Number.parseInt(minute, 10)
        if (result.getMinutes() > targetMinute) {
          result.setHours(result.getHours() + 1)
        }
        result.setMinutes(targetMinute)
      }
    }

    if (hour !== "*") {
      if (hour.includes("*/")) {
        const interval = Number.parseInt(hour.split("/")[1], 10)
        const currentHour = result.getHours()
        const nextHour = Math.ceil(currentHour / interval) * interval
        result.setHours(nextHour % 24)
        if (nextHour >= 24) {
          result.setDate(result.getDate() + 1)
        }
      } else if (!isNaN(Number.parseInt(hour, 10))) {
        const targetHour = Number.parseInt(hour, 10)
        if (result.getHours() > targetHour) {
          result.setDate(result.getDate() + 1)
        }
        result.setHours(targetHour)
      }
    }

    // This is a simplified implementation
    // A real implementation would handle all cron features

    return result
  }

  // Format a date as a string
  private static formatDate(date: Date): string {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }
}
