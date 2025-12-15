import { currencyFormatter } from "@/utils/currencyFormatter"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import type { CardsDashboardData } from "@/interfaces/CardsDashboardData"

interface CardStaticDashboardProps {
  title: string
  data: CardsDashboardData
  stat: string
  description: string
  styleCard?: string
}

const statConfig = {
  up: {
    icon: IconTrendingUp,
    label: "Em alta neste mês",
    badgeClass: "text-emerald-600 border-emerald-300 bg-emerald-50",
    sign: "+",
  },
  down: {
    icon: IconTrendingDown,
    label: "Em queda neste mês",
    badgeClass: "text-red-600 border-red-300 bg-red-50",
    sign: "-",
  },
  draw: {
    icon: Minus,
    label: "Estável neste mês",
    badgeClass: "text-gray-600 border-gray-300 bg-gray-50",
    sign: "",
  },
} as const

export function CardStaticDashboard({ title, data, stat, description, styleCard }: CardStaticDashboardProps) {
  const config = statConfig[stat as keyof typeof statConfig] || statConfig.draw
  const Icon = config.icon
  const percent = stat === "down" ? Math.abs(data.percent) : data.percent

  return (
    <Card className={`@container/card ${styleCard || ""}`}>
      <CardHeader className="flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <CardDescription className="text-sm font-medium">{title}</CardDescription>
          <CardAction>
            <Badge variant="outline" className={`${config.badgeClass} gap-1 px-2 py-0.5`}>
              <Icon className="size-3.5" />
              <span className="text-xs font-semibold">
                {config.sign}
                {percent}%
              </span>
            </Badge>
          </CardAction>
        </div>

        <CardTitle className="mt-2 flex items-center text-2xl font-bold tabular-nums @[250px]/card:text-3xl">
          {data.currentTotal < 0 && <span>-</span>}
          <span>{currencyFormatter.format(Math.abs(data.currentTotal))}</span>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm pt-4">
        <div className="flex items-center gap-1.5 font-medium text-foreground">
          <Icon className="size-4" />
          <span>{config.label}</span>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardFooter>
    </Card>
  )
}
