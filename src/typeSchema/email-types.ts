export type NewUserEmailType = {
  logo?: string;
  newsPageUrl?: string;
  researchPageUrl?: string;
  laboratoryPageUrl?: string;
  myReservationPageUrl?: string;
  userName: string;
  verificationToken: string;
};

export type ResetPasswordEmailType = {
  logo?: string;
  newsPageUrl?: string;
  researchPageUrl?: string;
  laboratoryPageUrl?: string;
  myReservationPageUrl?: string;
  userName: string;
  resetPasswordToken: string;
};
