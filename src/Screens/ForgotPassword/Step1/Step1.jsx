import { Form } from "antd";
import { StyledLoginButton, StyledLoginInput } from "../../../GlobalStyles";
import { ResetContainer } from "../../ResetPassword/ResetPassword.styles";
import { VALIDATIONS } from "../../../Constants/Validations";

const Step1 = ({ handleSubmit, form }) => {
  return (
    <ResetContainer>
      <div className="resetpassword-box">
        <div className="right">
          {/* Form For reset */}
          <Form
            onFinish={handleSubmit}
            validateTrigger={["onChange", "onBlur"]}
            form={form}
            className="resetpassword-form"
          >
            <div className="resetpassword-title-container">
              <img src="/Logo/Icons/security.svg" alt="security" />
              <p className="resetpassword-title">Reset Password</p>
            </div>
            <p className="desc warning">
              *Withdrawal service will be prohibited within 24 hours after
              resetting password
            </p>
            <div className="main-form">
              <div className="input-container">
                <label htmlFor="email" className="label">
                  Email Account
                </label>
                <Form.Item
                  rules={[
                    {
                      type: "email",
                      message: VALIDATIONS.EMAIL,
                    },
                    {
                      required: true,
                      message: VALIDATIONS.REQUIRED,
                    },
                  ]}
                  name="email"
                >
                  <StyledLoginInput
                    name="email"
                    id="email"
                    placeholder="Please enter your Email address"
                  />
                </Form.Item>
              </div>
            </div>
            <StyledLoginButton
              margintop="72px"
              type="primary"
              htmlType="submit"
            >
              Next
            </StyledLoginButton>
          </Form>
        </div>
      </div>
    </ResetContainer>
  );
};

export default Step1;
