export function formatMonth(yyyyMM: string) {
  const [year, month] = yyyyMM.split("-");

  const date = new Date(Number(year), Number(month) - 1);

  return date.toLocaleString("pt-BR", { month: "long" });
}