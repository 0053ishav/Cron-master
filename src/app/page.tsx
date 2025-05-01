"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ChevronDown, Copy, Info, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";
import { CronParser } from "@/lib/cron-parser";
import Image from "next/image";
import { ProFeatures } from "@/components/ProFeatures";

export default function CronMaster() {
  const [mode, setMode] = useState<"basic" | "advanced">("basic");
  const [copied, setCopied] = useState(false);
  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState(false);
  const [nextRuns, setNextRuns] = useState<string[]>([]);

  // Cron expression parts
  const [minutes, setMinutes] = useState("*");
  const [hours, setHours] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");

  // Advanced mode expression
  const [advancedExpression, setAdvancedExpression] = useState("* * * * *");

  // Current cron expression
  const [cronExpression, setCronExpression] = useState("* * * * *");
  const [cronDescription, setCronDescription] = useState("Runs every minute");

  // Update cron expression when any part changes
  useEffect(() => {
    if (mode === "basic") {
      const newExpression = `${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
      setCronExpression(newExpression);
      updateNextRuns(newExpression);
    } else {
      setCronExpression(advancedExpression);
      updateNextRuns(advancedExpression);
    }
  }, [minutes, hours, dayOfMonth, month, dayOfWeek, advancedExpression, mode]);

  // Update next runs
  const updateNextRuns = (expression: string) => {
    try {
      const runs = CronParser.getNextRuns(expression, 5);
      setNextRuns(runs);
      setCronDescription(CronParser.getDescription(expression));
    } catch {
      setNextRuns(["Invalid cron expression"]);
      setCronDescription("Invalid cron expression");
    }
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(cronExpression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="dark">
      <main className="min-h-screen p-4 md:p-8 bg-background">
      <div className="flex justify-between items-center mb-8">
  <div>
    <div className="flex items-center">
      <Image
        src={"/cron/cronLogo-removebg.png"}
        alt="Cron Master"
        width={100}
        height={100}
      />
      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
        CronMaster
      </h1>
    </div>
    <p className="text-muted-foreground">
      Generate cron expressions without memorizing syntax
    </p>
  </div>
  <ThemeToggle />
</div>

{/* Animated Cron Ticker */}
<div className="relative mb-8 flex overflow-x-hidden bg-muted/20 py-2 rounded-lg">
  <div className="whitespace-nowrap animate-marquee">
    {[
      "* * * * *",
      "0 * * * *", 
      "0 0 * * *",
      "0 0 * * 1",
      "*/5 * * * *",
      "0 0 1 * *",
      "0 12 * * *",
      "@hourly",
      "@daily",
      "@weekly"
    ].map((expr, i) => (
      <span key={i} className="mx-4 text-sm md:text-base font-mono text-muted-foreground">
        {expr}
      </span>
    ))}
  </div>
  <div className="whitespace-nowrap absolute top-0 animate-marquee2">
    {[
      "* * * * *",
      "0 * * * *", 
      "0 0 * * *",
      "0 0 * * 1",
      "*/5 * * * *",
      "0 0 1 * *",
      "0 12 * * *",
      "@hourly",
      "@daily",
      "@weekly"
    ].map((expr, i) => (
      <span key={i} className="mx-4 text-sm md:text-base font-mono text-muted-foreground">
        {expr}
      </span>
    ))}
  </div>
</div>
        
        <div className="flex flex-col lg:flex-row">
          <div className="order-2 md:order-1">
            <ProFeatures />
          </div>
          <div className="order-1 md:order-2 max-w-4xl mx-auto">
            
            <div className="mb-8 cursor-pointer rounded-2xl p-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">
              <Card className="mb-8 cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Interactive Cron Generator</CardTitle>
                    <Tabs
                      defaultValue="basic"
                      className="w-[200px] cursor-pointer"
                      onValueChange={(value) =>
                        setMode(value as "basic" | "advanced")
                      }
                    >
                      <TabsList className="grid w-full grid-cols-2 cursor-pointer">
                        <TabsTrigger className="cursor-pointer" value="basic">
                          Basic
                        </TabsTrigger>
                        <TabsTrigger
                          className="cursor-pointer"
                          value="advanced"
                        >
                          Advanced
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <CardDescription>
                    Create and test cron expressions with visual selectors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mode === "basic" ? (
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <CronFieldSelector
                        label="Minutes"
                        value={minutes}
                        onChange={setMinutes}
                        options={[
                          { value: "*", label: "Every minute (*)" },
                          { value: "0", label: "At minute 0 (0)" },
                          { value: "*/5", label: "Every 5 minutes (*/5)" },
                          { value: "*/10", label: "Every 10 minutes (*/10)" },
                          { value: "*/15", label: "Every 15 minutes (*/15)" },
                          { value: "*/30", label: "Every 30 minutes (*/30)" },
                          {
                            value: "0,30",
                            label: "At minutes 0 and 30 (0,30)",
                          },
                        ]}
                        tooltip="Specifies which minutes the command runs on (0-59)"
                      />
                      <CronFieldSelector
                        label="Hours"
                        value={hours}
                        onChange={setHours}
                        options={[
                          { value: "*", label: "Every hour (*)" },
                          { value: "0", label: "At midnight (0)" },
                          { value: "*/2", label: "Every 2 hours (*/2)" },
                          { value: "*/6", label: "Every 6 hours (*/6)" },
                          { value: "9-17", label: "Business hours (9-17)" },
                          { value: "0,12", label: "Twice daily (0,12)" },
                        ]}
                        tooltip="Specifies which hours the command runs on (0-23)"
                      />
                      <CronFieldSelector
                        label="Day of Month"
                        value={dayOfMonth}
                        onChange={setDayOfMonth}
                        options={[
                          { value: "*", label: "Every day (*)" },
                          { value: "1", label: "1st day (1)" },
                          { value: "15", label: "15th day (15)" },
                          { value: "L", label: "Last day (L)" },
                          { value: "1-7", label: "1st week (1-7)" },
                          { value: "1,15", label: "1st & 15th (1,15)" },
                        ]}
                        tooltip="Specifies which day of the month the command runs on (1-31)"
                      />
                      <CronFieldSelector
                        label="Month"
                        value={month}
                        onChange={setMonth}
                        options={[
                          { value: "*", label: "Every month (*)" },
                          { value: "1", label: "January (1)" },
                          { value: "6", label: "June (6)" },
                          { value: "12", label: "December (12)" },
                          { value: "1-3", label: "Q1 (1-3)" },
                          { value: "6-8", label: "Summer (6-8)" },
                        ]}
                        tooltip="Specifies which month the command runs on (1-12 or JAN-DEC)"
                      />
                      <CronFieldSelector
                        label="Day of Week"
                        value={dayOfWeek}
                        onChange={setDayOfWeek}
                        options={[
                          { value: "*", label: "Every day (*)" },
                          { value: "0", label: "Sunday (0)" },
                          { value: "1-5", label: "Weekdays (1-5)" },
                          { value: "6,0", label: "Weekends (6,0)" },
                          { value: "1", label: "Monday (1)" },
                          { value: "5", label: "Friday (5)" },
                        ]}
                        tooltip="Specifies which day of the week the command runs on (0-6 or SUN-SAT)"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="advanced-expression">
                          Cron Expression
                        </Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            id="advanced-expression"
                            value={advancedExpression}
                            onChange={(e) =>
                              setAdvancedExpression(e.target.value)
                            }
                            placeholder="* * * * *"
                            className="font-mono"
                          />
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Info className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Cron Expression Format
                                </DialogTitle>
                                <DialogDescription>
                                  A cron expression consists of 5 fields
                                  separated by spaces:
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-5 gap-2 text-center font-mono text-sm mb-4">
                                <div>minute</div>
                                <div>hour</div>
                                <div>day (month)</div>
                                <div>month</div>
                                <div>day (week)</div>
                              </div>
                              <div className="grid grid-cols-5 gap-2 text-center font-mono bg-muted p-2 rounded-md">
                                <div>0-59</div>
                                <div>0-23</div>
                                <div>1-31</div>
                                <div>1-12</div>
                                <div>0-6</div>
                              </div>
                              <div className="mt-4 space-y-2">
                                <p>
                                  <span className="font-mono">*</span> - any
                                  value
                                </p>
                                <p>
                                  <span className="font-mono">*/n</span> - every
                                  n values
                                </p>
                                <p>
                                  <span className="font-mono">n-m</span> - range
                                  from n to m
                                </p>
                                <p>
                                  <span className="font-mono">n,m</span> -
                                  specific values n and m
                                </p>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <Label>Cron Expression</Label>
                        <div className="flex items-center mt-1 gap-2">
                          <code className="flex-1 bg-muted p-2 rounded-md font-mono text-lg">
                            {cronExpression}
                          </code>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={copyToClipboard}
                            className="transition-all duration-200 cursor-copy"
                          >
                            {copied ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="flex-1">
                        <Label>Description</Label>
                        <div className="bg-muted p-2 rounded-md mt-1 min-h-[40px]">
                          {cronDescription}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Next Execution Times</Label>
                      <div className="bg-muted p-3 rounded-md mt-1 space-y-1">
                        {nextRuns.map((run, index) => (
                          <div key={index} className="font-mono text-sm">
                            {run}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-yellow-500 border-yellow-500"
                    >
                      Free Tier
                    </Badge>
                    {/* <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500"
                  >
                    Upgrade to Pro
                  </Badge> */}
                  </div>
                  
                  {/* <Button>Test Run</Button> */}
                </CardFooter>
              </Card>
            </div>
            <Collapsible
              open={isCheatsheetOpen}
              onOpenChange={setIsCheatsheetOpen}
              className="mb-8 border rounded-lg"
            >
              <div className="flex items-center justify-between p-4">
                <h2 className="text-xl font-semibold">Cron Cheatsheet</h2>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isCheatsheetOpen ? "rotate-180" : ""
                      )}
                    />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="p-4 pt-0 space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Expression</th>
                          <th className="text-left p-2">Description</th>
                          <th className="text-left p-2">Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">* * * * *</td>
                          <td className="p-2">Every minute</td>
                          <td className="p-2">12:01, 12:02, 12:03, ...</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">0 * * * *</td>
                          <td className="p-2">Every hour</td>
                          <td className="p-2">12:00, 13:00, 14:00, ...</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">0 0 * * *</td>
                          <td className="p-2">Every day at midnight</td>
                          <td className="p-2">00:00 each day</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">*/5 9-17 * * 1-5</td>
                          <td className="p-2">
                            Every 5 minutes, 9AM-5PM, weekdays
                          </td>
                          <td className="p-2">
                            9:00, 9:05, 9:10, ... (Mon-Fri)
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">0 0 1,15 * *</td>
                          <td className="p-2">
                            Midnight on 1st and 15th of month
                          </td>
                          <td className="p-2">00:00 on 1st, 00:00 on 15th</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Cron Explained</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Cron Expressions Explained</DialogTitle>
                          <DialogDescription>
                            A comprehensive guide to cron syntax and usage
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                          <div>
                            <h3 className="text-lg font-medium">
                              Basic Format
                            </h3>
                            <p className="mt-1">
                              A cron expression consists of 5 fields separated
                              by spaces:
                            </p>
                            <pre className="bg-muted p-2 rounded-md mt-2 font-mono overflow-x-auto">
                              ┌───────────── minute (0 - 59) │ ┌─────────────
                              hour (0 - 23) │ │ ┌───────────── day of the month
                              (1 - 31) │ │ │ ┌───────────── month (1 - 12) │ │ │
                              │ ┌───────────── day of the week (0 - 6) (Sunday
                              to Saturday) │ │ │ │ │ * * * * *
                            </pre>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium">
                              Special Characters
                            </h3>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>
                                <span className="font-mono">*</span> - any value
                              </li>
                              <li>
                                <span className="font-mono">,</span> - value
                                list separator
                              </li>
                              <li>
                                <span className="font-mono">-</span> - range of
                                values
                              </li>
                              <li>
                                <span className="font-mono">/</span> - step
                                values
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium">Examples</h3>
                            <div className="space-y-2 mt-1">
                              <div>
                                <p className="font-mono">0 0 * * *</p>
                                <p className="text-muted-foreground">
                                  Run once a day at midnight
                                </p>
                              </div>
                              <div>
                                <p className="font-mono">*/15 * * * *</p>
                                <p className="text-muted-foreground">
                                  Run every 15 minutes
                                </p>
                              </div>
                              <div>
                                <p className="font-mono">0 9 * * 1</p>
                                <p className="text-muted-foreground">
                                  Run at 9:00 AM every Monday
                                </p>
                              </div>
                              <div>
                                <p className="font-mono">0 0 1 */3 *</p>
                                <p className="text-muted-foreground">
                                  Run at midnight on the first day of every
                                  third month
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium">
                              Special Expressions
                            </h3>
                            <div className="space-y-2 mt-1">
                              <div>
                                <p className="font-mono">
                                  @yearly (or @annually)
                                </p>
                                <p className="text-muted-foreground">
                                  Run once a year at midnight on January 1st (0
                                  0 1 1 *)
                                </p>
                              </div>
                              <div>
                                <p className="font-mono">@monthly</p>
                                <p className="text-muted-foreground">
                                  Run once a month at midnight on the first day
                                  (0 0 1 * *)
                                </p>
                              </div>
                              <div>
                                <p className="font-mono">@weekly</p>
                                <p className="text-muted-foreground">
                                  Run once a week at midnight on Sunday (0 0 * *
                                  0)
                                </p>
                              </div>
                              <div>
                                <p className="font-mono">
                                  @daily (or @midnight)
                                </p>
                                <p className="text-muted-foreground">
                                  Run once a day at midnight (0 0 * * *)
                                </p>
                              </div>
                              <div>
                                <p className="font-mono">@hourly</p>
                                <p className="text-muted-foreground">
                                  Run once an hour at the beginning of the hour
                                  (0 * * * *)
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Card>
              <CardHeader>
                <CardTitle>Why Use CronMaster?</CardTitle>
                <CardDescription>
                  Designed for developers who need to create cron expressions
                  quickly and accurately
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Visual Generation</h3>
                  <p className="text-sm text-muted-foreground">
                    Create complex cron expressions without memorizing syntax
                    using our intuitive visual interface
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Instant Validation</h3>
                  <p className="text-sm text-muted-foreground">
                    See the next execution times immediately to verify your
                    expression works as expected
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Developer-Friendly</h3>
                  <p className="text-sm text-muted-foreground">
                    Built by developers for developers with a clean, efficient
                    interface and helpful documentation
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Pro Features</span> include
                  saved expressions, validation, and API access
                </div>
                <Button
                  variant="outline"
                  disabled
                  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 opacity-60 cursor-not-allowed"
                >
                  Pro Coming Soon
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}

interface CronFieldSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  tooltip: string;
}

function CronFieldSelector({
  label,
  value,
  onChange,
  options,
  tooltip,
}: CronFieldSelectorProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1">
        <Label htmlFor={label}>{label}</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3 w-3 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={label} className="w-full">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is only rendered on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-5 w-9 bg-muted rounded-full" />; // Placeholder to avoid mismatch
  }

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="theme-toggle" className="sr-only">
        Toggle theme
      </Label>
      <Switch
        id="theme-toggle"
        checked={theme !== "light"}
        onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
        className="data-[state=checked]:bg-primary"
      />
      {theme === "light" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </div>
  );
}
