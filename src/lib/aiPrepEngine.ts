export interface PrepEstimateInput {
  activeKitchenOrders: number;
  totalItemCount: number;
  maxItemBasePrepMinutes: number;
  outletMinPrepMinutes: number;
  managerOverrideMinutes?: number | null;
  isPeakDinnerWindow: boolean;
  aiModelRawPrediction?: number | null;
}

export interface PrepEstimateResult {
  promisedMinutes: number;
  aiRawMinutes: number;
  appliedSafetyFloor: boolean;
  reason: string;
}

export function calculateHonestPrepTime(input: PrepEstimateInput): PrepEstimateResult {
  const queueLoadMinutes = input.activeKitchenOrders * 4;
  const volumeLoadMinutes = Math.max(0, (input.totalItemCount - 2) * 3);
  const peakBuffer = input.isPeakDinnerWindow ? 8 : 0;

  const computedAiEstimate =
    input.aiModelRawPrediction && input.aiModelRawPrediction > 0
      ? input.aiModelRawPrediction
      : input.maxItemBasePrepMinutes + queueLoadMinutes + volumeLoadMinutes + peakBuffer;

  const effectiveFloor = Math.max(
    input.outletMinPrepMinutes,
    input.managerOverrideMinutes ?? 0
  );

  const promisedMinutes = Math.max(computedAiEstimate, effectiveFloor);
  const appliedSafetyFloor = promisedMinutes > computedAiEstimate;

  return {
    promisedMinutes,
    aiRawMinutes: computedAiEstimate,
    appliedSafetyFloor,
    reason: appliedSafetyFloor
      ? `Floor enforced (${effectiveFloor} mins minimum vs ${computedAiEstimate} mins AI estimate)`
      : `AI kitchen-load estimate (${input.activeKitchenOrders} active orders in queue)`,
  };
}

export interface LateStatusEvaluation {
  isLate: boolean;
  minutesLate: number;
  shouldAlertManagerAndCustomer: boolean;
}

export function evaluateOrderSla(
  promisedAt: Date,
  currentTime: Date,
  status: string,
  alreadyAlerted: boolean
): LateStatusEvaluation {
  if (status === 'READY_FOR_PICKUP' || status === 'HANDED_OFF' || status === 'CANCELLED') {
    return { isLate: false, minutesLate: 0, shouldAlertManagerAndCustomer: false };
  }

  const diffMs = currentTime.getTime() - promisedAt.getTime();
  const minutesLate = Math.floor(diffMs / 60000);

  if (minutesLate <= 0) {
    return { isLate: false, minutesLate: 0, shouldAlertManagerAndCustomer: false };
  }

  return {
    isLate: true,
    minutesLate,
    shouldAlertManagerAndCustomer: minutesLate >= 10 && !alreadyAlerted,
  };
}