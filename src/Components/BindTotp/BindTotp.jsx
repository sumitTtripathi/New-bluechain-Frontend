import { Button, Form, Input, Steps } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useTheme } from "styled-components";
import QRCode from "react-qr-code";

import {
  useEmailVerificationMutation,
  useGetUserQuery,
  useLazySetup2faQuery,
  useResendEmailOtpMutation,
  useVerify2faMutation,
} from "../../Services/Auth";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import { VALIDATIONS } from "../../Constants/Validations";
import { OTPPurpose } from "../../Constants/OtpPupose";
import { config } from "../../config";
import { StepperContent, StyledBindContainer } from "./BindTotp.styles";
import { SendCodeButton } from "../../GlobalStyles";
import { useSelector } from "react-redux";

const BindTotp = forwardRef((_, ref) => {
  const token = useSelector((state) => state.global.token);
  const { data: user } = useGetUserQuery({}, { skip: !token });
  const [resendEmailOtp] = useResendEmailOtpMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const theme = useTheme();
  const [setup2fa, { data: qrCode }] = useLazySetup2faQuery();
  const [otpForm] = useForm();
  const [faForm] = useForm();
  const [emailVerification, { isLoading: isEmailVerificationLoading }] =
    useEmailVerificationMutation();
  // states to manage resend otp timer
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [stepStatus, setStepStatus] = useState("process");
  const [verify2fa, { isLoading: verify2faLoading }] = useVerify2faMutation();
  const handleEmailOTPSubmit = async (values) => {
    try {
      await emailVerification({
        otp: values?.otp,
        email: user?.user?.email,
      }).unwrap();
      await setup2fa().unwrap();
      if (currentStep === 1) {
        setStepStatus("finish");
      }
      setCurrentStep(currentStep + 1);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  const handleVerify2fa = async (values) => {
    try {
      const data = {
        otp: values["verify-2fa-otp"],
        secretKey: qrCode?.secretKey,
      };
      await verify2fa(data).unwrap();
      if (currentStep === 1) {
        setStepStatus("finish");
      }
      setCurrentStep(currentStep + 1);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

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

  const steps = [
    {
      title: "Confirm Email",
      content: (
        <StepperContent>
          <Form
            onFinish={handleEmailOTPSubmit}
            validateTrigger={["onChange", "onBlur"]}
            initialValues={{ remember: true }}
            form={otpForm}
          >
            {(values, formInstance) => {
              const error = formInstance.getFieldError("otp");
              return (
                <>
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
                      <Input
                        size="large"
                        placeholder="Enter verification code"
                        autocomplete="off"
                      />
                    </Form.Item>
                    {seconds > 0 || minutes > 0 ? (
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
                        right="10px"
                        type="link"
                        style={{ position: "absolute", top: "5px" }}
                        error={error}
                        isTranslate
                        onClick={async () => {
                          try {
                            const response = await resendEmailOtp({
                              email: user?.user?.email,
                              purpose: OTPPurpose?.TOTP,
                            }).unwrap();
                            setSeconds(60);
                            toast.success(response?.message);
                          } catch (err) {
                            toast.error(err?.data?.message);
                          }
                        }}
                      >
                        Send Code
                      </SendCodeButton>
                    )}
                  </div>
                  <Button
                    htmlType="submit"
                    loading={isEmailVerificationLoading}
                    className="stepper-next-btn"
                  >
                    Next
                  </Button>
                </>
              );
            }}
          </Form>
        </StepperContent>
      ),
    },
    {
      title: "Scan QR",
      content: (
        <StepperContent style={{ textAlign: "center" }}>
          <QRCode value={qrCode?.secret || ""} />
          <p style={{ color: theme.colors.black }}>Private Key</p>
          <Input
            size="large"
            style={{
              color: theme.colors.black,
              textAlign: "center",
              fontWeight: theme.typography.bold,
            }}
            readOnly
            autocomplete="off"
            value={qrCode?.secretKey}
          />
          <div className="instructions">
            <p>1.Scan QR code via your Authenticator.</p>
            <p>2. Write down your private key on a paper.</p>
          </div>
          <div className="note">
            Note: Please keep your private key safe. If your private key in the
            authenticator is deleted mistakenly, you can recover by entering it
            manually. For your asset security, {config.APP_NAME} does not
            support private key retrieving.
          </div>
          <Form
            onFinish={handleVerify2fa}
            validateTrigger={["onChange", "onBlur"]}
            initialValues={{ remember: true }}
            form={faForm}
          >
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
              name="verify-2fa-otp"
            >
              <Input
                className="2fa-otp"
                size="large"
                autocomplete="off"
                placeholder="Please enter the verification code"
              />
            </Form.Item>
            <Button
              loading={verify2faLoading}
              htmlType="submit"
              className="stepper-next-btn"
            >
              Next
            </Button>
          </Form>
        </StepperContent>
      ),
    },
    {
      title: "Set Successfully",
      content: (
        <StepperContent style={{ textAlign: "center" }}>
          <img src="/Logo/Icons/success.svg" alt="success" />
          <p className="success">TOTP Bound Successfully</p>
        </StepperContent>
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setCurrentStep(0);
    setIsModalOpen(false);
    setStepStatus("process");
    otpForm.resetFields();
    faForm.resetFields();
  };
  useImperativeHandle(ref, () => {
    const modalRef = { showModal: showModal };
    ref.current = modalRef;
    return modalRef;
  });
  return (
    <StyledBindContainer
      title=""
      open={isModalOpen}
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <img src="/Logo/Icons/bindgoogle.svg" alt="mobile" />
      <p className="bind-title">Bind TOTP</p>
      <p className="bind-totp-disclaimer">
        For your asset security, withdrawal is unavailable within 24 hours after
        resetting TOTP Authenticator.
      </p>
      <Steps
        status={stepStatus}
        className="stepper"
        current={currentStep}
        items={items}
      />
      <div>{steps[currentStep].content}</div>
    </StyledBindContainer>
  );
});
BindTotp.displayName = "BindTotp";

export default BindTotp;
