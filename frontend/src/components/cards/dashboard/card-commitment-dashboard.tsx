import { IconAlertTriangle, IconMinus, IconTrendingDown, IconTrendingUp, IconX } from "@tabler/icons-react";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";

import { Badge } from "../../ui/badge";

interface CardCommitmentDashboardProps {
  title: string;
  income: number;
  expense: number;
  description: string;
  styleCard: string;
}

const STATUS_CONFIG = {
    neutral: {
        icon: <IconMinus />,
        badge: "text-slate-600 border-slate-400",
        label: "Equilíbrio financeiro",
    },
    healthy: {
        icon: <IconTrendingDown />,
        badge: "text-green-600 border-green-500",
        label: "Boa folga financeira",
    },
    warning: {
        icon: <IconAlertTriangle />,
        badge: "text-yellow-600 border-yellow-500",
        label: "Atenção aos gastos",
    },
    critical: {
        icon: <IconTrendingUp />,
        badge: "text-red-600 border-red-500",
        label: "Gastos elevados",
    },
    deficit: {
        icon: <IconX />,
        badge: "text-red-700 border-red-700",
        label: "Gastando mais do que ganha",
    },
};

const getCommitmentStatus = (percent: number) => {
    if (percent > 100) return "deficit";
    if (percent > 70) return "critical";
    if (percent > 50) return "warning";
    if (percent == 0) return "neutral";
    return "healthy";
}

export function CardCommitmentDashboard({title, income, expense, description, styleCard}:CardCommitmentDashboardProps){
    const commitment = income > 0 ? (Math.abs(expense) / income) * 100 : 0;

    const status = getCommitmentStatus(commitment);
    const config = STATUS_CONFIG[status];

    return(
        <Card className={`@container/card ${styleCard}`}>
            <CardHeader>
                <CardDescription>
                    {title}
                </CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {commitment.toFixed(1)}%
                </CardTitle>
                <CardAction>
                    <Badge variant="outline" className={config.badge}>
                        {config.icon}
                        <span className="ml-1">{config.label}</span>
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="text-muted-foreground">{description}</div>
            </CardFooter>
        </Card>
    ); 
}