/* eslint-disable */
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Step2 from "./Step2/Step2";
import Step1 from "./Step1/Step1";
import { useScrollTop } from "../../Hooks/useScrollTop";
import { toast } from "react-toastify";
import { VALIDATIONS } from "../../Constants/Validations";
import { Config as appConfig, Config } from "../../Config";
import { capitalizeWord } from "../../Utils/common";

import {
  setToken,
  setUser,
  useLoginMutation,
  usePostLoginMutation,
  useValidateLoginMutation,
  useVerifyPhoneOtpMutation,
} from "../../Services/Auth";
import { useGetGeetestVerificationMutation } from "../../Services/Geetest";
import { captchaHandler } from "../../GeetestFunction";
import { ROUTES } from "../../Constants/Routes";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Form } from "antd";
import { Helmet } from "react-helmet";
import { LoginContainer } from "./Login.styles";
import LoginMiniCard from "../../Components/LoginMiniCard/LoginMiniCard";
import { useGetCoinListQuery } from "../../Services/Market";

const Login = () => {
  useScrollTop();
  const [getGeetestVerification, { isLoading: geetestVerificationLoading }] =
    useGetGeetestVerificationMutation();
  const [login, { isLoading: isLoginLoading, data: user }] = useLoginMutation();
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });
  const [, setCookies] = useCookies(["token"]);
  const dispatch = useDispatch();
  const [verifyPhoneOtp, { isLoading: verifyPhoneLoading }] =
    useVerifyPhoneOtpMutation();
  const navigate = useNavigate();
  const [postLogin, { isLoading: isPostLoginLoading }] = usePostLoginMutation();
  const [loginFormValues] = Form.useForm();
  const [loginOTPForm] = Form.useForm();
  const currentStepRef = useRef(1);
  const [loginStep, setLoginStep] = useState(1);

  const [verificationType, setVerificationType] = useState(
    user?.user?.phone_flag ? "sms" : "totp"
  );

  useEffect(() => {
    if (user) {
      setVerificationType("totp");
    }
  }, [user]);

  const [validateLogin, { isLoading: validateLoginLoading }] =
    useValidateLoginMutation();
  // const [currentStep, setCurrentStep] = useState(1);

  const loginFormSubmit = (values) => {
    if (captchaConfig.Config.product === "bind") {
      if (window.captchaObj) {
        window.captchaObj.showCaptcha();
      } else {
        alert("Please wait for the verification initialization to complete");
        return false;
      }
    } else {
      validate(values);
    }
  };

  const loginOTPFormSubmit = async (values) => {
    if (captchaConfig.Config.product === "bind") {
      if (window.captchaObj) {
        window.captchaObj.showCaptcha();
      } else {
        alert("Please wait for the verification initialization to complete");
        return false;
      }
    } else {
      validate(values);
    }
  };

  const setCurrentStep = (step) => {
    currentStepRef.current = step;
    setLoginStep(step);
  }

  const afterValidateTotp = useCallback(async (captchaResult) => {
    try {
      const values = loginOTPForm.getFieldsValue();
      const data = {
        ...values,
        email: user?.user?.email,
        country_code:
          verificationType === "sms" ? user?.user?.country_code : undefined,
        phone_number:
          verificationType === "sms" ? user?.user?.phone_number : undefined,
        accounts_page: false,
        id: user?.user?._id
      };

      await (validateLogin(data)).unwrap();

      // const ipResponse = await getIp().unwrap();
      const ipData = {
        // country: ipResponse?.country,
        // regionName: ipResponse?.regionName,
        // city: ipResponse?.city,
        // device: isMobile ? "Mobile" : "PC",
        // os: osName,
        // browser: browserName,
        // ip: ipResponse?.query,
        country: "India",
        regionName: "Haryana",
        city: "Gurgaon",
        device: "PC",
        os: "Linux",
        ip: "223.190.86.207",
        browser: "Chrome",
      };

      const response = await postLogin({
        ...loginFormState,
        ...ipData,
        ...captchaResult
      }).unwrap();

      toast.success(response?.message);
      dispatch(setToken({ token: response?.token }));
      setCookies?.("token", JSON.stringify(response?.token));
      localStorage.setItem("token", JSON.stringify(response?.token));
      localStorage.setItem(
        "email",
        JSON.stringify(
          verificationType === "sms" ? user?.email : response?.user?.email
        )
      );

      navigate(ROUTES.HOME);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  }, [validateLogin, setCookies, loginOTPForm, user]);

  const afterValidate = useCallback(async (captchaResult) => {
    try {
      // const ipResponse = await getIp().unwrap();
      const ipData = {
        // country: ipResponse?.country,
        // regionName: ipResponse?.regionName,
        // city: ipResponse?.city,
        // device: isMobile ? "Mobile" : "PC",
        // os: osName,
        // browser: browserName,
        // ip: ipResponse?.query,
        country: "India",
        regionName: "Haryana",
        city: "Gurgaon",
        device: "PC",
        os: "Linux",
        ip: "223.190.86.207",
        browser: "Chrome",
      };
      const formValues = loginFormValues?.getFieldsValue();
      const response = await login({ ...ipData, ...formValues, ...captchaResult }).unwrap();
      if (response?.user?.totp_flag) {
        setCurrentStep(2);
      } else {
        navigate(ROUTES.HOME);
        toast.success(response?.message);
        dispatch(setToken({ token: response?.token }));
        setCookies?.("token", JSON.stringify(response?.token));
        localStorage.setItem("token", JSON.stringify(response?.token));
        localStorage.setItem("email", JSON.stringify(response?.user?.email));
      }
      dispatch(setUser({ user: response?.user }));
    } catch (error) {
      toast.error(error?.data?.message);
    }
  }, [navigate, login, setCookies, loginFormValues, dispatch]);

  const validate = useCallback(
    async (values) => {
      try {
        const result = window.captchaObj.getValidate();
        if (!result) {
          toast(VALIDATIONS.COMPLETE_VERIFICATION_FIRST);
          return;
        }
        if (currentStepRef.current === 1) {
          await afterValidate();
        }
        else if (currentStepRef.current === 2) {
          await afterValidateTotp(result);
        }
      } catch (error) {
        toast.error(error?.data?.message);
      }
    },
    [getGeetestVerification, afterValidate, afterValidateTotp]
  );

  const captchaConfig = useMemo(() => {
    return {
      Config: {
        captchaId: appConfig.GEETEST_KEY,
        language: "eng",
        product: "bind",
        protocol: "https://",
      },
      handler: (captchaObj) =>
        captchaHandler(captchaObj, captchaConfig, validate),
    };
  }, [validate]);

  const { data: coinListData } = useGetCoinListQuery({
    currentPage: 1
  });


  return (
    <>
      <Helmet>
        <title>{Config?.APP_NAME}</title>
      </Helmet>

      <LoginContainer>
        <div className="login-box">
          {/* Login Box Left Side */}
          <div className="left">
            <img src={Config?.LOGIN_LOGO} alt="globe" />
            <p className="desc">
              Explore the Crypto World with {capitalizeWord(Config.APP_NAME)}
            </p>
            <div className="minicard-container">
              {coinListData?.data?.data?.slice(0, 4)?.map((item, i) => {
                return <LoginMiniCard key={item?.symbol} item={item} />;
              })}
            </div>
          </div>

          <div className="right">
            {loginStep === 1 ? (
              <Step1
                isLoading={isLoginLoading}
                captchaConfig={captchaConfig}
                setLoginFormState={setLoginFormState}
                handleSubmit={loginFormSubmit}
                setCurrentStep={setCurrentStep}
                form={loginFormValues}
                geetestVerificationLoading={geetestVerificationLoading}
              />
            ) : loginStep === 2 ? (
              <Step2
                captchaConfig={captchaConfig}
                handleSubmit={loginOTPFormSubmit}
                form={loginOTPForm}
                isLoading={isLoginLoading}
                setCurrentStep={setCurrentStep}
                setVerificationType={setVerificationType}
              />
            ) : (
              <Step1 />
            )}
          </div>
        </div>
      </LoginContainer>
    </>
  );
};

export default memo(Login);
