import { StyledNavlink } from "../../../Components/Navbar/Navbar.styles";
import { ROUTES } from "../../../Constants/Routes";
// import { useScrollTop } from "../../Hooks/useScrollTop";
import { capitalizeWord } from "../../../Utils/common";
import { config } from "../../../config";
import { useScrollTop } from "../../../Hooks/useScrollTop";
import {
  StyledCheckbox,
  StyledLoginButton,
  StyledLoginInput,
  StyledLoginPasswordInput,
} from "../../../GlobalStyles";
import { SignupContainer } from "../Signup.styles";
import { Form } from "antd";
import { VALIDATIONS } from "../../../Constants/Validations";
import { useState } from "react";
import TermsandCondtionModal from "../../../Components/T&CModal/T&CModal";
import { GeetestCaptcha } from "../../../Captcha";

const Step1 = ({ handleSubmit, form, isLoading,captchaConfig }) => {
  const [isTermsAndConditionsModalOpen, setIsTermsAndConditionsModalOpen] =
    useState(false);
  // hook that automatic scroll to top
  useScrollTop();
  const handleOk = () => {
    setIsTermsAndConditionsModalOpen(true);
  };
  const handleCancel = () => {
    setIsTermsAndConditionsModalOpen(false);
  };
  return (
    <SignupContainer>
      <div className="signup-box">
        {/* Signup Box Left Side */}
        <div className="left">
          <p className="title">The Global Cryptocurrency Exchange</p>
          <p className="subtitle">Serving 200+ Countries /Regions Worldwide</p>
          <div className="social-container">
            <img src="/Logo/Social/telegram.svg" alt="telegram" />
            <img src="/Logo/Social/twitter.svg" alt="twitter" />
          </div>
          <div className="signup-image" />
        </div>
        <TermsandCondtionModal
          isModalOpen={isTermsAndConditionsModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
        <div className="right">
        <GeetestCaptcha captchaConfig={captchaConfig} />
          {/* Form For Signup */}
          <Form
            form={form}
            name="signupForm"
            onFinish={handleSubmit}
            className="signup-form"
            validateTrigger={["onChange", "onBlur"]}
            initialValues={{ remember: true }}
          >
            <div className="signup-title-container">
              <img src="/Logo/Icons/user.svg" alt="user" />
              <p className="signup-title">
                Create your {capitalizeWord(config.APP_NAME)} account
              </p>
            </div>
            <p className="desc">Start Exploring the Crypto World</p>
            <div className="main-form">
              <div className="input-container">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: VALIDATIONS.REQUIRED,
                    },
                  ]}
                >
                  <StyledLoginInput placeholder="Please enter your Email Address" />
                </Form.Item>
              </div>
              <div className="input-container">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: VALIDATIONS.REQUIRED,
                    },
                    {
                      pattern: new RegExp(VALIDATIONS.PASSWORD.REGEX),
                      message: VALIDATIONS.PASSWORD.MESSAGE,
                    },
                  ]}
                >
                  <StyledLoginPasswordInput placeholder="Please enter your password" />
                </Form.Item>
              </div>
            </div>
            <Form.Item
              valuePropName="checked"
              rules={[
                {
                  validator: async (_, checked) => {
                    if (!checked) {
                      return Promise.reject(
                        new Error(VALIDATIONS.TERMSCONDTIONS)
                      );
                    }
                  },
                },
              ]}
              name="termsConditions"
            >
              <StyledCheckbox margintop="111px">
                I’ve read & agreed with{" "}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOk();
                  }}
                  className="terms"
                >
                  {capitalizeWord(config.APP_NAME)} Terms of Service
                </span>
              </StyledCheckbox>
            </Form.Item>
            <StyledLoginButton
              htmlType="submit"
              loading={isLoading}
              margintop="17px"
              type="primary"
            >
              Sign Up
            </StyledLoginButton>
            <div className="bottom-container">
              <p className="desc">
                Already registered ?{" "}
                <StyledNavlink color="darkBlue" to={ROUTES.LOGIN}>
                  Log in NOW
                </StyledNavlink>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </SignupContainer>
  );
};

export default Step1;
