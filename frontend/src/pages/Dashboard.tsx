import { CardsDashboard } from "@/components/cards/cards-dashboard";
import { ChartAreaExpense } from "@/components/charts/chart-area-expense";
import { ChartAreaIncome } from "@/components/charts/chart-area-income";

export default function Dashboard() {

  return (
    <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
          
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <CardsDashboard />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:px-6 pb-6">
              <ChartAreaIncome />
              <ChartAreaExpense />
            </div>
          </div>
    </div>
  );
}
