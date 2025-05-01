import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Lock, Rocket } from "lucide-react"

export function ProFeatures() {
  return (
    <Card className="w-full max-w-2xl border ">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Rocket className="text-cyan-400" size={20} />
          <CardTitle className="text-lg font-semibold text-gradient">
            CronMaster Pro Features
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Take your cron workflow to the next level.
        </p>
      </CardHeader>

      <CardContent className="grid gap-4">
        <FeatureItem label="AI-Powered Cron Generator" />
        <FeatureItem label="Prebuilt Templates (Node, AWS, Jenkins...)" />
        <FeatureItem label="Reverse Cron Parser" />
        <FeatureItem label="Next Run Time Preview" />
        <FeatureItem label="Timezone & DST Support" />
        <FeatureItem label="Save & Share Expressions" />
        <FeatureItem label="Embeddable Widget" />
        <FeatureItem label="Notifications & Reminders (Coming)" locked />
      </CardContent>

      <div className="text-center px-6 pb-6">
        <Badge variant="outline" className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 text-white border-0 cursor-not-allowed opacity-60">
          🚀 Pro Launching Soon — $5/month
        </Badge>
        <p className="text-sm text-muted-foreground mt-2">
          All features above will be included at launch.
        </p>
      </div>
    </Card>
  )
}

function FeatureItem({ label, locked = false }: { label: string; locked?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {locked ? (
        <Lock size={16} className="text-red-400" />
      ) : (
        <Check size={16} className="text-green-400" />
      )}
      <span className={locked ? "text-muted-foreground line-through" : ""}>
        {label}
      </span>
    </div>
  )
}
