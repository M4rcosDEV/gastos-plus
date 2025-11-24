import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function CardsDashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-b *:data-[slot=card]:from-black/3 *:data-[slot=card]:to-black/6 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

      <Card className="@container/card bg-blue-500/20 border-blue-500/40">
        <CardHeader>
          <CardDescription>Saldo Atual</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Em alta neste mês <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Saldo líquido considerando todas as movimentações recentes
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-green-500/20 border-green-500/40">
        <CardHeader>
          <CardDescription>Receitas do mês</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,234
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Queda de 20% neste período <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total recebido no mês até agora
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-red-500/20 border-red-500/40">
        <CardHeader>
          <CardDescription>Despesas do mês</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Aumento de 12.5% neste período <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Total gasto neste mês até o momento.</div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card bg-orange-500/20 border-orange-500/40">
        <CardHeader>
          <CardDescription>Resultado do mês</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Aumento de 4.5% neste período <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Desempenho do mês considerando entradas e saídas</div>
        </CardFooter>
      </Card>
    </div>
  )
}
