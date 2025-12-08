export const MovementType = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
  INITIAL: "INITIAL",
} as const;

export type MovementType = typeof MovementType[keyof typeof MovementType];
