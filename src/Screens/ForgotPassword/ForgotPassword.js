import { useState } from "react";
import Step2 from "./Step2/Step2";
import Step1 from "./Step1/Step1";
import { useScrollTop } from "../../Hooks/useScrollTop";
import { useForm } from "antd/es/form/Form";
import {
  // useEmailVerificationMutation,
  useForgotPasswordMutation,
  useResendEmailOtpMutation,
  useVerifyEmailOtpMutation
} from "../../Services/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { ROUTES } from "../../Constants/Routes";
import { Helmet } from "react-helmet";
import { Config } from "../../Config";
import { OTPPurpose } from "../../Constants/OtpPupose";
import Step3 from "./Step3/Step3";
const ForgotPassword = () => {
  // hook that automatic scroll to top
  useScrollTop();
  const [forgotPassword] = useForgotPasswordMutation();
  const [emailForm] = useForm();
  const navigate = useNavigate();
  const [forgotPasswordForm] = useForm();
  const [resendEmailOtp] = useResendEmailOtpMutation();
  const [verifyEmailOtp] = useVerifyEmailOtpMutation();
  const emailAddressSubmitHandler = async () => {
    try {
      const response = await resendEmailOtp({
        email: emailForm.getFieldValue("email"),
        purpose: OTPPurpose?.FORGOT,
      }).unwrap();
      toast.success(response?.message);
      setCurrentStep(2);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const otpHandler =  async () => {
    try {
      const response = await verifyEmailOtp({
        email: emailForm.getFieldValue("email"),
        otp: String(forgotPasswordForm.getFieldValue("otp"))
      }).unwrap();
      toast.success(response?.message);
      setCurrentStep(3);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  }

  const forgotPasswordHandler = async () => {
    try {
      const email = emailForm.getFieldValue("email");
      const newpassword = forgotPasswordForm.getFieldValue("newpassword");
      const otp = forgotPasswordForm.getFieldValue("otp");
      const data = { email: email, password: newpassword, otp };
      const response = await forgotPassword(data).unwrap();
      toast.success(response?.message);
      navigate(ROUTES.LOGIN);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  // State to manage current step in flow of reset password.
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <>
      <Helmet>
        <title>{Config?.APP_NAME}</title>
      </Helmet>
      {currentStep === 1 && (
        <Step1 form={emailForm} handleSubmit={emailAddressSubmitHandler} />
      )}
      {currentStep === 2 && (
        <Step2
          form={forgotPasswordForm}
          handleSubmit={otpHandler}
          emailForm={emailForm}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 3 && (
        <Step3
          form={forgotPasswordForm}
          handleSubmit={forgotPasswordHandler}
          emailForm={emailForm}
          setCurrentStep={setCurrentStep}
        />
      )}
    </>
  );
};

export default ForgotPassword;
