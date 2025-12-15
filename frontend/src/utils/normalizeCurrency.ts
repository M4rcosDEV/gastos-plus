export function normalizeCurrency(value: string){
    return Number(value.replace(/\./g, "").replace(",", "."));
}