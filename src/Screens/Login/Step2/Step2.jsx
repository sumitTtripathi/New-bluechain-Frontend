import { capitalizeWord } from "../../../Utils/common";
import { Config } from "../../../Config";
import { LoginContainer } from "../Login.styles";
import {
  SendCodeButton,
  StyledLoginButton,
  StyledLoginInput,
} from "../../../GlobalStyles";
import { AiOutlineLeft } from "react-icons/ai";
import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSendPhoneOtpMutation } from "../../../Services/Auth";
import { VALIDATIONS } from "../../../Constants/Validations";
import { useSelector } from "react-redux";
import GeetestCaptcha from "../../../Components/GeetestCaptcha/GeetestCaptcha";

const Step2 = ({
  captchaConfig,
  setCurrentStep,
  form,
  handleSubmit,
  isLoading,
  verificationType,
  setVerificationType,
}) => {
  // states to manage resend otp timer
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [sendPhoneOtp] = useSendPhoneOtpMutation();
  const user = useSelector((state) => state.global.user);
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
    <>
      <Button onClick={() => setCurrentStep(1)} className="back-button">
        <AiOutlineLeft />
        <span>Back</span>
      </Button>
      <Form
        validateTrigger={["onChange", "onBlur"]}
        initialValues={{ remember: true }}
        form={form}
        onFinish={handleSubmit}
        className="login-form"
      >
        <div className="login-title-container">
          <img src="/Logo/Icons/security.svg" alt="user" />
          <p className="login-title">2FA</p>
        </div>
        <GeetestCaptcha captchaConfig={captchaConfig} />

        <p className="desc">
          Please complete the operation of security
          <br /> authentication
        </p>
        <div className="main-form">
          <div className="input-container">
            <label htmlFor="sms" className="label">
              {verificationType === "sms" ? "SMS Code" : "TOTP Code"}
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
                <StyledLoginInput placeholder="Please enter code" />
              </Form.Item>
              {verificationType === "sms" &&
                (seconds > 0 || minutes > 0 ? (
                  <span
                    className="timer-disabled"
                    style={{ position: "absolute", top: "15px" }}
                  >
                    Resend (
                    {minutes && minutes < 10
                      ? `0${minutes}`
                      : minutes || null}
                    {seconds < 10 ? `0${seconds}` : seconds})
                  </span>
                ) : (
                  <SendCodeButton
                    type="link"
                    onClick={async () => {
                      try {
                        const response = await sendPhoneOtp({
                          country_code: user?.country_code,
                          phone_number: user?.phone_number,
                          accounts_page: false,
                        }).unwrap();
                        toast.success(response?.data?.message);
                        setSeconds(60);
                      } catch (err) {
                        toast.error(err?.data?.message);
                      }
                    }}
                  >
                    Send Code
                  </SendCodeButton>
                ))}
              { }
            </div>
          </div>
        </div>
        {user?.totp_flag && (
          <Button
            type="link"
            onClick={() =>
              setVerificationType("totp")
            }
            className="toggle-verification-button"
          >
            {/* {verificationType === "sms"
                  ? "TOTP Verification"
                  : "Mobile  Verification"} */}
            TOTP Verification
          </Button>
        )}

        <StyledLoginButton
          htmlType="submit"
          margintop="22px"
          loading={isLoading}
          type="primary"
        >
          Submit
        </StyledLoginButton>
      </Form>
    </>
  );















































  
};

export default Step2;
