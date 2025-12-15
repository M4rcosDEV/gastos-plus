import { dashboardService } from "@/services/dashboardService";
import type { CardsDashboardData } from "@/interfaces/CardsDashboardData";
import { useQuery } from "@tanstack/react-query";
import { CardStaticDashboard } from "@/components/cards/dashboard/card-static-dashboard";
import { CardCommitmentDashboard } from "@/components/cards/dashboard/card-commitment-dashboard";

export function CardsDashboard() {
  const balanceQuery = useQuery({
    queryKey: ["card", "balance"],
    queryFn: dashboardService.getBalanceTotal,
  });

  const incomeQuery = useQuery({
    queryKey: ["card", "income"],
    queryFn: dashboardService.getIncome,
  });

  const expenseQuery = useQuery({
    queryKey: ["card", "expense"],
    queryFn: dashboardService.getExpense,
  });

  const isLoading = balanceQuery.isLoading || incomeQuery.isLoading || expenseQuery.isLoading;

  if (isLoading) return <div>Carregando...</div>;

  if (balanceQuery.isError || incomeQuery.isError || expenseQuery.isError) {
    console.log("Error load dashboard")
  }

  const balance = balanceQuery.data!;
  const income = incomeQuery.data!;
  const expense = expenseQuery.data!;
  
  const statistics = (data?: CardsDashboardData) => {
    if (!data) return "draw";

    const current = data.currentTotal ?? 0;
    const previous = data.previousTotal ?? 0;

    if (current > previous) {
      return "up";
    }

    if (current < previous) {
      return "down";
    }

    return "draw"; 
  };

  const statisticsBalance = statistics(balance);
  const statisticsIncome = statistics(income);
  const statisticsExpense = statistics(expense);
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-b *:data-[slot=card]:from-black/3 *:data-[slot=card]:to-black/6 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <CardStaticDashboard
        title="Saldo do mês"
        styleCard="bg-blue-500/20 border-blue-500/40"
        data={balance}
        stat={statisticsBalance}
        description="Saldo líquido considerando todas as movimentações desse mês"
      />

      <CardStaticDashboard
        title="Saldo do mês"
        styleCard="bg-green-500/20 border-green-500/40"
        data={income}
        stat={statisticsIncome}
        description="Total recebido no mês até agora"
      />

      <CardStaticDashboard
        title="Despesas do mês"
        styleCard="bg-red-500/20 border-red-500/40"
        data={expense}
        stat={statisticsExpense}
        description="Total gasto neste mês até o momento"
      />

      <CardCommitmentDashboard
        title="Comprometimento da renda"
        income={income.currentTotal}
        expense={expense.currentTotal}
        description="Percentual da renda mensal comprometida com despesas"
        styleCard="bg-orange-500/20 border-orange-500/40"
      />

    </div>
  )
}
