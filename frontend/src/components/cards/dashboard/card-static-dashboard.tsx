import { currencyFormatter } from "@/utils/currencyFormatter";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Minus } from "lucide-react";
import { Badge } from '@/components/ui/badge'
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import type { CardsDashboardData } from "@/interfaces/CardsDashboardData";

interface CardStaticDashboardProps{
    title: string;
    data: CardsDashboardData;
    stat: string;
    description: string;
    styleCard: string;
}

export function CardStaticDashboard({title, data, stat, description, styleCard}:CardStaticDashboardProps) {
    return(
        <Card className={`@container/card ${styleCard}`}>
            <CardHeader>
                <CardDescription>
                    {title}
                </CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {currencyFormatter.format(data.currentTotal)}
                </CardTitle>
                <CardAction>
                    <Badge variant="outline">
                    {stat === "up" && (
                        <>
                        <IconTrendingUp />
                        <span className="ml-1">
                            {stat === "up"}
                            +{data.percent}%
                        </span>
                        </>
                    )}

                    {stat === "down" && (
                        <>
                        <IconTrendingDown />
                        <span className="ml-1">
                            -{Math.abs(data.percent)}%
                        </span>
                        </>
                    )}

                    {stat === "draw" && (
                        <>
                        <Minus />
                        <span className="ml-1">{data.percent}%</span>
                        </>
                    )}
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    {stat === "up" && (
                    <>
                        Em alta neste mês
                        <IconTrendingUp className="size-4" />
                    </>
                    )}

                    {stat === "down" && (
                    <>
                        Em queda neste mês
                        <IconTrendingDown className="size-4" />
                    </>
                    )}

                    {stat === "draw" && (
                    <>
                        Estável neste mês
                        <Minus className="size-4" />
                    </>
                    )}
                </div>
                <div className="text-muted-foreground">
                    {description}
                </div>
            </CardFooter>
        </Card>
    );
}