export const VALIDATIONS = {
  PASSWORD: {
    min: 7,
    max: 128,
    REGEX:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!#%*?&])[A-Za-z\\d@$!#%*?&]{8,}$",
    MESSAGE:
      "Your password must be at least 7 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  },
  REQUIRED: "Required",
  TERMSCONDTIONS: "Please check terms & conditions",
  FREEZE_ACCOUNT: "Please read terms and conditions for freeze account",
  OTP: {
    MIN: 6,
    MAX: 6,
    MESSAGE: "Please enter otp of 6 digits",
  },
  PHONE: {
    MIN: 10,
    MAX: 12,
    MESSAGE: "Please enter valid phone number",
  },
  CONFIRM_PASSWORD: "The two passwords that you entered do not match!",
  COMPLETE_VERIFICATION_FIRST: "Please complete verification first!",
  EMAIL: "The input is not valid E-mail!",
};
