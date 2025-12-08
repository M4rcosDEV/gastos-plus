export const PaymentMethod = {
  DINHEIRO: "DINHEIRO",
  CARTAO_CREDITO: "CARTAO_CREDITO",
  CARTAO_DEBITO: "CARTAO_DEBITO",
  TRANSFERENCIA: "TRANSFERENCIA",
  PIX: "PIX",
} as const;

export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod];
