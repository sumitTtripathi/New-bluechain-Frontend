import { Button, Form, Input, Steps } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import CountrySelect from "../CountrySelect/CountrySelect";
import en from "react-phone-number-input/locale/en.json";
import {
  useEmailVerificationMutation,
  useGetUserQuery,
  useResendEmailOtpMutation,
  useSendPhoneOtpMutation,
  useVerifyPhoneOtpMutation,
} from "../../Services/Auth";
import { useForm } from "antd/es/form/Form";
import { VALIDATIONS } from "../../Constants/Validations";
import { toast } from "react-toastify";
import { OTPPurpose } from "../../Constants/OtpPupose";
import {
  SendCodeButton,
  StepperContent,
  StyledBindContainer,
} from "./bindMobile.styles";
import { getCountryCallingCode } from "react-phone-number-input/input";
import { useSelector } from "react-redux";

const BindMobile = forwardRef((_, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  // states to manage resend otp timer
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [phoneMinutes, setPhoneMinutes] = useState(0);
  const [phoneSeconds, setPhoneSeconds] = useState(0);
  const [stepStatus, setStepStatus] = useState("process");
  const [verifyPhoneOtp, { isLoading: phoneOtpVerifyLoading }] =
    useVerifyPhoneOtpMutation();
  const token = useSelector((state) => state.global.token);

  const { data: user } = useGetUserQuery({}, { skip: !token });

  const [resendEmailOtp] = useResendEmailOtpMutation();
  const [emailVerification, { isLoading: isEmailVerificationLoading }] =
    useEmailVerificationMutation();
  const [phone, setPhone] = useState({});
  const [otpForm] = useForm();
  const [phoneForm] = useForm();
  const [sendPhoneOtp] = useSendPhoneOtpMutation();
  // Logic to update resend otp timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (phoneSeconds > 0) {
        setPhoneSeconds(phoneSeconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
      if (phoneSeconds === 0) {
        if (phoneMinutes === 0) {
          clearInterval(interval);
        } else {
          setPhoneSeconds(59);
          setPhoneMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes, phoneSeconds, phoneMinutes]);
  const handleVerifyPhone = async (values) => {
    try {
      await verifyPhoneOtp({
        email: user?.user?.email,
        country_code: getCountryCallingCode(values?.country_code),
        phone_number: values?.phone_number,
        otp: values["phone-otp"],
        accounts_page: true,
      }).unwrap();

      if (currentStep === 1) {
        setStepStatus("finish");
      }
      setCurrentStep(currentStep + 1);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  const handleEmailOTPSubmit = async (values) => {
    try {
      await emailVerification({
        otp: values?.otp,
        email: user?.user?.email,
      }).unwrap();
      if (currentStep === 1) {
        setStepStatus("finish");
      }
      setCurrentStep(currentStep + 1);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

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
            {(_, formInstance) => {
              const error = formInstance.getFieldError("otp");
              return (
                <>
                  {" "}
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
                        error={error}
                        style={{ position: "absolute", top: "5px" }}
                        right="10px"
                        type="link"
                        isTranslate
                        onClick={async () => {
                          try {
                            const response = await resendEmailOtp({
                              email: user?.user?.email,
                              purpose: OTPPurpose?.MOBILE,
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
                    loading={isEmailVerificationLoading}
                    htmlType="submit"
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
      title: "Enter Mobile",
      content: (
        <StepperContent>
          <Form
            onValuesChange={(v) => {
              setPhone((prev) => {
                return {
                  ...prev,
                  ...v,
                };
              });
            }}
            validateTrigger={["onChange", "onBlur"]}
            initialValues={{ remember: true }}
            form={phoneForm}
            onFinish={handleVerifyPhone}
          >
            <div className="phone-input">
              <CountrySelect form={phoneForm} size="large" labels={en} />
              <Form.Item
                style={{ minWidth: "75%" }}
                rules={[
                  {
                    required: true,
                    message: VALIDATIONS.REQUIRED,
                  },
                  {
                    min: VALIDATIONS.PHONE.MIN,
                    message: VALIDATIONS.PHONE.MESSAGE,
                  },
                  {
                    max: VALIDATIONS.PHONE.MAX,
                    message: VALIDATIONS.PHONE.MESSAGE,
                  },
                ]}
                name="phone_number"
              >
                <Input
                  autocomplete="off"
                  size="large"
                  placeholder="Enter number"
                />
              </Form.Item>
            </div>
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
                name="phone-otp"
              >
                <Input
                  style={{ marginTop: 20 }}
                  size="large"
                  placeholder="Enter verification code"
                  autocomplete="off"
                />
              </Form.Item>
              {phoneSeconds > 0 || phoneMinutes > 0 ? (
                <span
                  className="timer-disabled"
                  style={{ position: "absolute", top: "38px" }}
                >
                  Resend (
                  {phoneMinutes && phoneMinutes < 10
                    ? `0${phoneMinutes}`
                    : phoneMinutes || null}
                  {phoneSeconds < 10 ? `0${phoneSeconds}` : phoneSeconds})
                </span>
              ) : (
                <SendCodeButton
                  right="10px"
                  type="link"
                  style={{ position: "absolute", top: "20px" }}
                  onClick={async () => {
                    try {
                      const response = await sendPhoneOtp({
                        country_code: getCountryCallingCode(
                          phone?.country_code
                        ),
                        phone_number: Number(phone?.phone_number),
                        accounts_page: true,
                      }).unwrap();
                      setPhoneSeconds(60);
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
              loading={phoneOtpVerifyLoading}
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
          <p className="success">Mobile Bound Successfully</p>
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
    setSeconds(0);
    setPhoneSeconds(0);
    otpForm.resetFields();
    phoneForm.resetFields();
    setPhoneMinutes(0);
    setMinutes(0);
    setStepStatus("process");
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
      <img src="/Logo/Icons/bindphone.svg" alt="mobile" />
      <p className="bind-title">Bind Mobile</p>
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
BindMobile.displayName = "BindMobile";

export default BindMobile;
