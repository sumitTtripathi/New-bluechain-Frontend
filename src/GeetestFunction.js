import { toast } from "react-toastify";

export const captchaHandler = async (captchaObj, captchaConfig, validate) => {
  window.captchaObj = captchaObj;
  captchaObj
    .appendTo("#captcha")
    .onReady(function () {
      console.log("ready");
    })
    .onNextReady(function () {})
    .onBoxShow(function () {
      console.log("boxShow");
    })
    .onError(function (e) {
      console.log(e);
    })
    .onSuccess(async () => {
      try {
        if (captchaConfig.config.product === "bind") {
          await validate();

        }
      } catch (error) {
        toast.error(error?.message);
      }
    });
};
