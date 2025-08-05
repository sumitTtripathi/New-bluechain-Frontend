import {
  StyledLoginButton,
  StyledLoginInput,
  StyledLoginPasswordInput,
} from "../../../GlobalStyles";
import { ResetContainer } from "../../ResetPassword/ResetPassword.styles";
import { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Button, Form } from "antd";
import { VALIDATIONS } from "../../../Constants/Validations";
import { useResendEmailOtpMutation } from "../../../Services/Auth";
import { toast } from "react-toastify";
import { OTPPurpose } from "../../../Constants/OtpPupose";
import { SendCodeButton } from "../ForgotPassword.styles";

const Step2 = ({ form, handleSubmit, setCurrentStep, loading, emailForm }) => {
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
    <ResetContainer>
      <div className="resetpassword-box">
        <div className="right">
          {/* Form For reset */}
          <Button onClick={() => setCurrentStep(1)} className="back-button">
            <AiOutlineLeft />
            <span>Back</span>
          </Button>
          <Form
            form={form}
            onFinish={handleSubmit}
            validateTrigger={["onChange", "onBlur"]}
            className="resetpassword-form"
          >
            <div className="resetpassword-title-container">
              <img src="/Logo/Icons/security.svg" alt="security" />
              <p className="resetpassword-title no-break">
                Security Authentication
              </p>
            </div>
            {
              seconds > 0 || minutes > 0 ? <p className="desc">
                Please complete the operation of security authentication
              </p> : <p className="desc warning">
                *Withdrawal service will be prohibited within 24 hours after
                resetting password
              </p>
            }
            <div className="main-form">
              <div className="input-container">
                <label htmlFor="code" className="label">
                  Email verification code
                </label>
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
                      name="code"
                      id="code"
                      placeholder="Please enter code"
                    />
                  </Form.Item>
                  {seconds > 0 || minutes > 0 ? (
                    <span className="timer-disabled">
                      Resend (
                      {minutes && minutes < 10
                        ? `0${minutes}`
                        : minutes || null}
                      {seconds < 10 ? `0${seconds}` : seconds})
                    </span>
                  ) : (
                    <SendCodeButton
                      right="0"
                      type="link"
                      onClick={async () => {
                        try {
                          const response = await resendEmailOtp({
                            email: emailForm.getFieldValue("email"),
                            purpose: OTPPurpose?.FORGOT,
                          }).unwrap();
                          setSeconds(60);
                          toast.success(response?.message);
                        } catch (error) {
                          toast.error(error?.data?.message);
                        }
                      }}
                    >
                      Send Code
                    </SendCodeButton>
                  )}
                </div>
                {
                  (seconds > 0 || minutes > 0) && <p className="desc">
                    verification code has been sent to your mail id {emailForm.getFieldValue("email")}
                  </p>
                }
              </div>
            </div>
            <StyledLoginButton
              loading={loading}
              margintop="72px"
              htmlType="submit"
              type="primary"
            >
              Next
            </StyledLoginButton>
          </Form>
        </div>
      </div>
    </ResetContainer>
  );
};

export default Step2;
