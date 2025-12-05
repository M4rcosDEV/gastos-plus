"use client"

import { ChartColumnIncreasing, InfoIcon, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useAuthStore } from "@/stores/authStore"
import { useEffect, useState } from "react"
import { getLast6Months } from "@/services/dashboardService"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

export const description = "A simple area chart"


type dataResponse = {
  month: string,
  total: number
}

const chartConfig = {
  receita: {
    label: "Receita",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaIncome() {
  const user = useAuthStore((state) => state.user)
  const [chartData, setChartData] = useState<dataResponse[]>([])
  const [monthWin, setMonthWin] = useState<dataResponse>()
  const [fistMonth, setFistMonth] = useState<dataResponse>()
  const [lastMonth, setLastMonth] = useState<dataResponse>()

  useEffect(() => {
    if(!user) return 
    async function loadData() {
      try {
        const data = await getLast6Months(user.id, "INCOME")
        
        setChartData(data)
      } catch (error) {
        console.error("Erro ao carregar gráfico:", error)
      }
    }

    loadData()
    
  },[user])

  useEffect(() => {
    if (chartData.length === 0) return

    const monthWin = chartData.reduce((accumulator, currentValue) => {
      if(currentValue.total >= accumulator.total){
        return currentValue;
      }

      return accumulator;
    })

    setMonthWin(monthWin);
    setFistMonth(chartData[0]);
    setLastMonth(chartData[chartData.length - 1]);

  },[chartData])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico de Receitas</CardTitle>
        <CardDescription>
          Receitas dos últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              padding={{ left: 2, right: 2 }} 
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="total"
              type="natural"
              fill="var(--chart-2)"
              fillOpacity={0.4}
              stroke="var(--chart-2)"
            />

          </AreaChart>
        </ChartContainer>
        {chartData.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <ChartColumnIncreasing className="h-10 w-10 text-muted-foreground opacity-40" />
            <p className="text-gray-400 text-sm">Sem movimentação</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-end gap-2 leading-none font-medium">
              Maior receita registrada em {monthWin ? monthWin.month : "—"}
              {/* DESKTOP */}
              <div className="hidden md:block">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon size={12} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Valores iguais priorizam o mês mais recente.</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* MOBILE */}
              <div className="block md:hidden">
                <Popover>
                  <PopoverTrigger asChild>
                    <InfoIcon size={12} />
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <p className="text-sm text-muted-foreground">
                      Valores iguais priorizam o mês mais recente.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>

            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {chartData.length >= 2 && fistMonth && lastMonth ? (
                <p>
                  {fistMonth.month} - {lastMonth.month} {new Date().getFullYear()}
                </p>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
