import { SignupContainer } from "../Signup.styles";
import {
  SendCodeSignUp,
  StyledLoginButton,
  StyledLoginInput,
} from "../../../GlobalStyles";
import { AiOutlineLeft } from "react-icons/ai";
import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import GeetestCaptcha from "../../../Components/GeetestCaptcha/GeetestCaptcha";
import { useResendEmailOtpMutation } from "../../../Services/Auth";
import { VALIDATIONS } from "../../../Constants/Validations";
import { OTPPurpose } from "../../../Constants/OtpPupose";
import { toast } from "react-toastify";

const Step2 = ({
  isLoading,
  handleSubmit,
  form,
  setCurrentStep,
  signupForm,
  captchaConfig,
}) => {
  // states to manage resend otp timer
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [resendEmailOtp] = useResendEmailOtpMutation();
  // Logic to update resend otp timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);
  return (
    <SignupContainer>
      <div className="signup-box">
        {/* Login Box Left Side */}
        <div className="left">
          <p className="title">The Global Cryptocurrency Exchange</p>
          <p className="subtitle">Serving 200+ Countries /Regions Worldwide</p>
          <div className="social-container">
            <img src="/Logo/Social/telegram.svg" alt="telegram" />
            <img src="/Logo/Social/twitter.svg" alt="twitter" />
          </div>
          <div className="signup-image" />
        </div>

        <div className="right">
          {/* Form For Login */}
          <Button onClick={() => setCurrentStep(1)} className="back-button">
            <AiOutlineLeft />
            <span>Back</span>
          </Button>
          <Form
            validateTrigger={["onChange", "onBlur"]}
            initialValues={{ remember: true }}
            form={form}
            onFinish={handleSubmit}
            className="signup-form"
          >
            {(values, formInstance) => {
              const error = formInstance.getFieldError("otp");
              return (
                <>
                  <div className="signup-title-container">
                    <img src="/Logo/Icons/security.svg" alt="user" />
                    <p className="signup-title">Security Authentication</p>
                  </div>
                  <p className="desc">
                    Please complete the operation of security
                    <br /> authentication
                  </p>
                  <div className="main-form">
                    <div className="input-container">
                      <label htmlFor="sms" className="label">
                        Email Code
                      </label>
                      {/* Captcha Verification */}
                      <GeetestCaptcha captchaConfig={captchaConfig} />

                      <div className="verification-input-container">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: VALIDATIONS.REQUIRED,
                            },
                            {
                              min: VALIDATIONS.OTP.MIN,
                              message: VALIDATIONS.OTP.MESSAGE,
                            },
                            {
                              max: VALIDATIONS.OTP.MAX,
                              message: VALIDATIONS.OTP.MESSAGE,
                            },
                          ]}
                          name="otp"
                        >
                          <StyledLoginInput
                            type="number"
                            placeholder="Please enter code"
                          />
                        </Form.Item>
                        {seconds > 0 || minutes > 0 ? (
                          <span className="timer-disabled">
                            Resend (
                            {minutes && minutes < 10
                              ? `0${minutes}`
                              : minutes
                              ? minutes
                              : null}
                            {seconds < 10 ? `0${seconds}` : seconds})
                          </span>
                        ) : (
                          <SendCodeSignUp
                            error={error}
                            type="link"
                            onClick={async () => {
                              const response = await resendEmailOtp({
                                email: signupForm.getFieldValue("email"),
                                purpose: OTPPurpose?.REGISTER,
                              }).unwrap();
                              setSeconds(60);
                              toast.success(response?.message);
                            }}
                          >
                            Resend Code
                          </SendCodeSignUp>
                        )}
                      </div>
                    </div>
                  </div>

                  <StyledLoginButton
                    htmlType="submit"
                    margintop="22px"
                    type="primary"
                    loading={isLoading}
                  >
                    Submit
                  </StyledLoginButton>
                </>
              );
            }}
          </Form>
        </div>
      </div>
    </SignupContainer>
  );
};

export default Step2;
