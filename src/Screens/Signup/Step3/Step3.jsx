
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
} from "../../../Services/Auth";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import { VALIDATIONS } from "../../../Constants/Validations";
import { OTPPurpose } from "../../../Constants/OtpPupose";
import { Config } from "../../../Config";
import { StepperContent } from "../../../Components/BindTotp/BindTotp.styles";
import { SendCodeButton } from "../../../GlobalStyles";
import { useSelector } from "react-redux";
import { AiOutlineLeft } from "react-icons/ai";
import { capitalizeWord } from "../../../Utils/common";
import { LoginContainer } from "../../Login/Login.styles";
import { StyledBindContainer } from "../Signup.styles"
import { ROUTES } from "../../../Constants/Routes";
import { useNavigate } from "react-router";

const Step3 = ({
    signupForm,
    setCurrentStep
}) => {
    const navigate = useNavigate();
    const [resendEmailOtp] = useResendEmailOtpMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [current2faStep, setCurrent2faStep] = useState(0);
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
                email: signupForm.getFieldValue("email"),
            }).unwrap();
            await setup2fa().unwrap();
            if (current2faStep === 1) {
                setStepStatus("finish");
            }
            setCurrent2faStep(current2faStep + 1);
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
            if (current2faStep === 1) {
                setStepStatus("finish");
            }
            setCurrent2faStep(current2faStep + 1);
            setTimeout(() => {
                navigate(ROUTES.LOGIN);
            }, 2000)
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
                                                            email: signupForm.getFieldValue("email"),
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
                    <div className="skip-btn-wrapper">
                    <Button
                        type="button"
                        className="stepper-skip-btn"
                        style={{ marginTop: "10px" }}
                        onClick={() => {
                            navigate(ROUTES.LOGIN)
                        }}
                    >
                        Skip for Now
                    </Button>
                    </div>
                    
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
                        manually. For your asset security, {Config.APP_NAME} does not
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

    const handleCancel = () => {
        setCurrent2faStep(0);
        setIsModalOpen(false);
        setStepStatus("process");
        otpForm.resetFields();
        faForm.resetFields();
    };

    return (
        <LoginContainer>
            <div className="login-box">
                {/* Login Box Left Side */}
                <div className="left">
                    <img src={Config?.LOGIN_LOGO} alt="globe" />
                    <p className="desc">
                        Explore the Crypto World with {capitalizeWord(config.APP_NAME)}
                    </p>
                    <div className="minicard-container">

                    </div>
                </div>

                <div className="right">
                    {/* Form For Login */}
                    <Button onClick={() => setCurrentStep(2)} className="back-button">
                        <AiOutlineLeft />
                        <span>Back</span>
                    </Button>
                    <StyledBindContainer>
                        <img src="/Logo/Icons/bindgoogle.svg" alt="mobile" />
                        <p className="bind-title">Bind TOTP</p>
                        <p className="bind-totp-disclaimer">
                            For your asset security, withdrawal is unavailable within 24 hours after
                            resetting TOTP Authenticator.
                        </p>
                        <Steps
                            status={stepStatus}
                            className="stepper"
                            current={current2faStep}
                            items={items}
                        />
                        <div>{steps[current2faStep].content}</div>
                    </StyledBindContainer>
                </div>
            </div>
        </LoginContainer>
    );
}

export default Step3;
