import { Button, Form, Input } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  useSendPhoneOtpMutation,
  useVerifyPhoneOtpMutation,
} from "../../Services/Auth";
import { useForm } from "antd/es/form/Form";
import { VALIDATIONS } from "../../Constants/Validations";
import { toast } from "react-toastify";
import { StepperContent, StyledBindContainer } from "./bindMobile.styles";
import { SendCodeButton } from "../../GlobalStyles";

const OtpModal = forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // states to manage resend otp timer
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [phoneMinutes, setPhoneMinutes] = useState(0);
  const [phoneSeconds, setPhoneSeconds] = useState(0);
  const [verifyPhoneOtp, { isLoading: phoneOtpVerifyLoading }] =
    useVerifyPhoneOtpMutation();

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
        email: props?.user?.user?.email,
        country_code: props?.user?.user?.country_code,
        phone_number: props?.user?.user?.phone_number,
        otp: values["phone-otp"],
        accounts_page: true,
      }).unwrap();
      props?.setIsValid(true);
      props?.setCurrentStep(4);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSeconds(0);
    setPhoneSeconds(0);
    otpForm.resetFields();
    phoneForm.resetFields();
    setPhoneMinutes(0);
    setMinutes(0);
  };
  useImperativeHandle(ref, () => {
    return (ref.current = { showModal: showModal });
  });
  return (
    <StyledBindContainer
      title=""
      open={isModalOpen}
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {/* <p className="bind-title">Mobile SMS</p> */}
      <StepperContent>
        <Form
          validateTrigger={["onChange", "onBlur"]}
          initialValues={{ remember: true }}
          form={phoneForm}
          onFinish={handleVerifyPhone}
        >
          <div className="verification-input-container">
            <div className="login-title-container">
              <img src="/Logo/Icons/security.svg" alt="user" />
              <p className="login-title">2FA</p>
            </div>

            <p className="desc">
              Please complete the operation of security
              <br /> authentication
            </p>
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
              <span className="timer-disabled">
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
                onClick={async () => {
                  try {
                    await sendPhoneOtp({
                      country_code: props?.user?.user?.country_code,
                      phone_number: props?.user?.user?.phone_number,
                      accounts_page: false,
                    }).unwrap();
                    setPhoneSeconds(60);
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
    </StyledBindContainer>
  );
});
OtpModal.displayName = "OtpModal";

export default OtpModal;
