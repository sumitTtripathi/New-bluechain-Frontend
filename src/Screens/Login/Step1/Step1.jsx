import { StyledNavlink } from "../../../Components/Navbar/Navbar.styles";
import { ROUTES } from "../../../Constants/Routes";
import { capitalizeWord } from "../../../Utils/common";
import { config } from "../../../config";
import { LoginContainer } from "../Login.styles";
import {
  StyledLoginButton,
  StyledLoginInput,
  StyledLoginPasswordInput,
} from "../../../GlobalStyles";
import { GeetestCaptcha } from "../../../Captcha";
import { memo } from "react";
import { Form } from "antd";

import { VALIDATIONS } from "../../../Constants/Validations";
import { useGetCoinListQuery } from "../../../Services/Market";
import LoginMiniCard from "../../../Components/LoginMiniCard/LoginMiniCard"

const Step1 = ({
  captchaConfig,
  geetestVerificationLoading,
  setLoginFormState,
  isLoading,
  handleSubmit,
  form,
}) => {

  return (
    <Form
      form={form}
      name="loginform"
      onValuesChange={(v) =>
        setLoginFormState((prev) => {
          return {
            ...prev,
            ...v,
          };
        })
      }
      validateTrigger={["onChange", "onBlur"]}
      onFinish={handleSubmit}
      className="login-form"
      initialValues={{ remember: true }}
    >
      <div className="login-title-container">
        <img src="/Logo/Icons/user.svg" alt="user" />
        <p className="login-title">
          Login to your {capitalizeWord(config.APP_NAME)} account
        </p>
      </div>
      <p className="desc">
        Please login with your account with the{" "}
        {capitalizeWord(config.APP_NAME)} <br />
        app
      </p>
      <div className="main-form">
        <div className="input-container">
          <label htmlFor="email" className="label">
            Email Id
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
            <StyledLoginInput placeholder="Please enter your Email Id" />
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
      {/* Captcha Verification */}
      <GeetestCaptcha captchaConfig={captchaConfig} />
      <StyledLoginButton
        htmlType="submit"
        margintop="72px"
        type="primary"
        loading={isLoading || geetestVerificationLoading}
      >
        Log In
      </StyledLoginButton>
      <div className="bottom-container">
        <StyledNavlink color="darkBlue" to={ROUTES.SIGNUP}>
          Register Now
        </StyledNavlink>
        <p className="break-line">|</p>
        <StyledNavlink color="darkBlue" to={ROUTES.FORGOTPASSWORD}>
          Forgot Password
        </StyledNavlink>
      </div>
    </Form>
  );
};

export default memo(Step1);
