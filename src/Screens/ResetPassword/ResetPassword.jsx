import {
  StyledLoginButton,
  StyledLoginPasswordInput,
} from "../../GlobalStyles";
import { ResetContainer } from "./ResetPassword.styles";

import { Form } from "antd";
import { VALIDATIONS } from "../../Constants/Validations";
import { useForm } from "antd/es/form/Form";
import { useResetPasswordMutation } from "../../Services/Auth";
import { toast } from "react-toastify";
import { ROUTES } from "../../Constants/Routes";
import { useNavigate } from "react-router";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPasswordForm] = useForm();
  const [resetPassword, { isLoading: loading }] = useResetPasswordMutation();
  const handleSubmit = async () => {
    try {
      const password = resetPasswordForm.getFieldValue("newpassword");
      const response = await resetPassword({ password });
      navigate(`${ROUTES.SETTINGS}/${ROUTES.ACCOUNTSETTINGS}`);
      toast.success(response?.data?.message);
    } catch (e) {
      toast.error(e?.data?.message);
    }
  };
  return (
    <ResetContainer>
      <div className="resetpassword-box">
        <div className="right">
          {/* Form For reset */}

          <Form
            onFinish={handleSubmit}
            validateTrigger={["onChange", "onBlur"]}
            initialValues={{ remember: true }}
            form={resetPasswordForm}
            className="resetpassword-form"
          >
            <div className="resetpassword-title-container">
              <img src="/Logo/Icons/security.svg" alt="security" />
              <p className="resetpassword-title no-break">
                Security Authentication
              </p>
            </div>
            <p className="desc warning">
              *Withdrawal service will be prohibited within 24 hours after
              resetting password
            </p>
            <div className="main-form">
              <div className="input-container">
                <label htmlFor="newpassword" className="label">
                  New Password
                </label>
                <Form.Item
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
                  name="newpassword"
                >
                  <StyledLoginPasswordInput placeholder="Please enter the password" />
                </Form.Item>
              </div>
              <div className="input-container">
                <label htmlFor="confirmpassword" className="label">
                  Confirm Password
                </label>

                <Form.Item
                  dependencies={["newpassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newpassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                  name="confirm-password"
                >
                  <StyledLoginPasswordInput placeholder="Please enter the password" />
                </Form.Item>
              </div>
            </div>
            <StyledLoginButton
              htmlType="submit"
              margintop="72px"
              loading={loading}
              type="primary"
            >
              Confirm
            </StyledLoginButton>
          </Form>
        </div>
      </div>
    </ResetContainer>
  );
};

export default ResetPassword;
