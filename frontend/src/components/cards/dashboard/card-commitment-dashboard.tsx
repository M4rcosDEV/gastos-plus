import {
  IconAlertTriangle,
  IconMinus,
  IconTrendingDown,
  IconTrendingUp,
  IconX,
} from "@tabler/icons-react"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import { Badge } from "../../ui/badge"

interface CardCommitmentDashboardProps {
  title: string
  income: number
  expense: number
  description: string
  styleCard: string
}

const STATUS_CONFIG = {
  neutral: {
    icon: IconMinus,
    badgeClass: "text-slate-600 border-slate-400 bg-slate-50",
    label: "Equilíbrio financeiro",
  },
  healthy: {
    icon: IconTrendingDown,
    badgeClass: "text-emerald-600 border-emerald-400 bg-emerald-50",
    label: "Boa folga financeira",
  },
  warning: {
    icon: IconAlertTriangle,
    badgeClass: "text-yellow-700 border-yellow-500 bg-yellow-50",
    label: "Atenção aos gastos",
  },
  critical: {
    icon: IconTrendingUp,
    badgeClass: "text-red-600 border-red-500 bg-red-50",
    label: "Gastos elevados",
  },
  deficit: {
    icon: IconX,
    badgeClass: "text-red-700 border-red-700 bg-red-50",
    label: "Gastando mais do que ganha",
  },
} as const

const getCommitmentStatus = (percent: number) => {
  if (percent > 100) return "deficit"
  if (percent > 70) return "critical"
  if (percent > 50) return "warning"
  if (percent === 0) return "neutral"
  return "healthy"
}

export function CardCommitmentDashboard({
  title,
  income,
  expense,
  description,
  styleCard,
}: CardCommitmentDashboardProps) {
  const commitment = income > 0 ? (Math.abs(expense) / income) * 100 : 0
  const status = getCommitmentStatus(commitment)
  const config = STATUS_CONFIG[status]
  const Icon = config.icon

  return (
    <Card className={`@container/card ${styleCard}`}>
      <CardHeader className="flex flex-col">
        {/* Header top (igual ao outro card) */}
        <div className="flex items-center justify-between gap-2">
          <CardDescription className="text-sm font-medium">
            {title}
          </CardDescription>
        </div>

        {/* Valor principal */}
        <CardTitle className="mt-2 text-2xl font-bold tabular-nums @[250px]/card:text-3xl">
          {commitment.toFixed(1)}%
        </CardTitle>
      </CardHeader>

      <CardFooter className="flex-col items-start gap-1 pt-4 text-sm">
        <div className="flex items-center gap-1.5 font-medium text-foreground">
          <Icon className="size-4" />
          <span>{config.label}</span>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardFooter>
    </Card>
  )
}
