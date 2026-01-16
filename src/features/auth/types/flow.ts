export type AuthFlowMode = 'signup' | 'reset';
export type AuthFlowModeOrNull = AuthFlowMode | null;

export type NextAfterVerify = 'add-location' | 'reset-password';
export type NextAfterVerifyOrNull = NextAfterVerify | null;

export type SignupDetails = {
  phoneNumber: string;
  firstName: string;
  lastName: string;
};

export type ResetDetails = {
  phoneNumber: string;
};
