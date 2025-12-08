import type { MovementType } from "@/types/movementType.enum";
import type { PaymentMethod } from "@/types/paymentMethod.enum";

export interface MovementPayload {
  description: string;
  valueMov: number;
  dateMov: string;
  typeMov: MovementType;
  categoryId: number | null;
  paymentMethods: PaymentMethod;
  accountId: string;
  observation: string;
}

