import {
  StyledLoginButton,
  StyledLoginPasswordInput,
} from "../../../GlobalStyles";
import { ResetContainer } from "../../ResetPassword/ResetPassword.styles";
import { AiOutlineLeft } from "react-icons/ai";
import { Button, Form } from "antd";
import { VALIDATIONS } from "../../../Constants/Validations";

const Step3 = ({ setCurrentStep, loading, form, handleSubmit }) => {
  return (
    <ResetContainer>
      <div className="resetpassword-box">
        <div className="right">
          {/* Form For reset */}
          <Button onClick={() => setCurrentStep(2)} className="back-button">
            <AiOutlineLeft />
            <span>Back</span>
          </Button>
          <Form
            onFinish={handleSubmit}
            validateTrigger={["onChange", "onBlur"]}
            initialValues={{ remember: true }}
            form={form}
            className="resetpassword-form"
          >
            <div className="resetpassword-title-container">
              <img src="/Logo/Icons/security.svg" alt="security" />
              <p className="resetpassword-title no-break">
               Reset Password
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
                          new Error(VALIDATIONS.CONFIRM_PASSWORD)
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

export default Step3;
