import React, { useEffect, useRef } from 'react';
import { useGetGeetestVerificationMutation } from '../../Services/Geetest';

const GeetestCaptcha = ({ captchaConfig, onSuccess, onError }) => {
  const captchaRef = useRef(null);
  const [verifyCaptcha] = useGetGeetestVerificationMutation();

  useEffect(() => {
    if (window.initGeetest) {
      window.initGeetest({
        gt: captchaConfig?.gt,
        challenge: captchaConfig?.challenge,
        offline: !captchaConfig?.success,
        new_captcha: true,
        product: 'bind',
        width: '100%',
        lang: 'en'
      }, (captchaObj) => {
        captchaObj.appendTo(captchaRef.current);
        captchaObj.onSuccess(() => {
          const result = captchaObj.getValidate();
          onSuccess && onSuccess(result);
        });
        captchaObj.onError(onError);
      });
    }
  }, [captchaConfig, onSuccess, onError]);

  return <div ref={captchaRef} />;
};

export default GeetestCaptcha;
