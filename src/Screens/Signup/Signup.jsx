import { memo, useCallback, useMemo, useState } from "react";
import Step2 from "./Step2/Step2";
import Step1 from "./Step1/Step1";
import { useScrollTop } from "../../Hooks/useScrollTop";
import { VALIDATIONS } from "../../Constants/Validations";
import { Config as appConfig, Config } from "../../Config";
import { toast } from "react-toastify";
import {
  setToken,
  useEmailVerificationMutation,
  useSignUpEmailVerificationMutation,
  useSignupMutation,
} from "../../Services/Auth";
import { useNavigate } from "react-router";
import { ROUTES } from "../../Constants/Routes";
import { captchaHandler } from "../../GeetestFunction";
import { Form } from "antd";
import { Helmet } from "react-helmet";
import Step3 from "./Step3/Step3";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();
  const [emailVerification, { isLoading: isEmailVerificationLoading }] =
    useSignUpEmailVerificationMutation();
  const [signupForm] = Form.useForm();
  const [OTPForm] = Form.useForm();

  const navigate = useNavigate();
  // State to manage current step in flow of reset password.
  const [currentStep, setCurrentStep] = useState(1);
  // hook that automatic scroll to top
  useScrollTop();

  const signupFormSubmitHandler = async (values) => {
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

  const OTPFormSubmitHandler = async () => {
    try {

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

      const data = {
        email: signupForm.getFieldValue("email"),
        otp: String(OTPForm.getFieldValue("otp")),
      };
      const response = await emailVerification({
        ...data,
        ...ipData
      }).unwrap();
      // navigate(ROUTES.LOGIN);
      setCurrentStep(3);
      toast.success(response?.message);
      dispatch(setToken({ token: response?.token }));
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  // API Call after geetest captcha verification succeeded
  const afterValidate = useCallback(async () => {
    try {
      const data = {
        email: signupForm.getFieldValue("email"),
        otp: String(OTPForm.getFieldValue("otp")),
      };
      const response = await emailVerification({
        ...data,
      }).unwrap();
      // navigate(ROUTES.LOGIN);
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  }, [navigate, emailVerification, OTPForm, signupForm]);

  const afterValidateSignUp = useCallback(async (captchaResult) => {
    try {
      const data = {
        email: signupForm.getFieldValue("email"),
        password: (signupForm.getFieldValue("password")),
        termsConditions: (signupForm.getFieldValue("termsConditions")),
        ...captchaResult
      };
      const response = await signup({
        ...data,
      }).unwrap();
      toast.success(response?.message);
      setCurrentStep(2);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  }, [navigate, signupForm]);

  // validating Geetest verification and calling api for Email Verification
  const validate = useCallback(async () => {
    try {
      let result = await window.captchaObj.getValidate();
      if (!result) {
        toast.error(VALIDATIONS.COMPLETE_VERIFICATION_FIRST);
        return;
      }
      await afterValidateSignUp(result);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  }, [afterValidate]);

  // Geetest Captcha Config
  const captchaConfig = useMemo(() => {
    return {
      Config: {
        captchaId: appConfig.GEETEST_KEY,
        language: "eng",
        product: "bind",
        protocol: "https://",
      },
      handler: (captchaObj) => {
        captchaObj.appendTo("#geetest-captcha");
        captchaHandler(captchaObj, captchaConfig, validate);
      }
    };
  }, [validate]);

  return (
    <>
      <Helmet>
        <title>{Config?.APP_NAME}</title>
      </Helmet>{" "}

      {currentStep === 1 ? (
        <Step1
          captchaConfig={captchaConfig}
          isLoading={isLoading}
          handleSubmit={signupFormSubmitHandler}
          setCurrentStep={setCurrentStep}
          form={signupForm}
        />
      ) : currentStep === 2 ? (
        <Step2
          captchaConfig={captchaConfig}
          handleSubmit={OTPFormSubmitHandler}
          form={OTPForm}
          signupForm={signupForm}
          isLoading={isEmailVerificationLoading}
          setCurrentStep={setCurrentStep}
        />
      ) : currentStep === 3 ? (
        <Step3
          signupForm={signupForm}
          setCurrentStep={setCurrentStep}
        />) : (
        <Step1 />
      )}
    </>
  );
};

export default memo(Signup);
