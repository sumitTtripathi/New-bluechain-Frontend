import { Button, Form, Input, Modal } from "antd";
import { VALIDATIONS } from "../../../../../Constants/Validations";
import { useForm } from "antd/es/form/Form";
import { useDisable2faMutation } from "../../../../../Services/Auth";
import { toast } from "react-toastify";
import styled, { useTheme } from "styled-components";
const StyledVerifyTotpModal = styled(Modal)`
  .ant-modal-content {
    background: ${(props) => props.theme.colors.white};
  }
  input {
    border: none;
    background: ${(props) => props.theme.colors.blue.light};
  }
  input::placeholder {
    color: ${(props) => props.theme.colors.black};
  }

  .ant-modal-body > .bind-title {
    margin: 22px 0;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.subTitle1};
    line-height: ${(props) => props.theme.typography.subTitle3};
    color: ${(props) => props.theme.colors.black};
  }
`;
const VerifyTotp = ({ isModalOpen, handleOk, handleCancel }) => {
  const [totpForm] = useForm();
  const theme = useTheme();
  const [disable2fa, { isLoading: isDisable2faLoading }] =
    useDisable2faMutation();
  const handleTotpSubmit = async (values) => {
    try {
      const response = await disable2fa(values).unwrap();
      handleOk();
      toast.success(response?.message);
    } catch (err) {
      handleOk();
      toast.error(err?.data?.message);
    }
  };
  return (
    <StyledVerifyTotpModal
      title=""
      footer={null}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className="bind-title">Unbind Totp</p>
      <Form
        onFinish={handleTotpSubmit}
        validateTrigger={["onChange", "onBlur"]}
        initialValues={{ remember: true }}
        form={totpForm}
      >
        <label style={{ marginBottom: "10px", color: theme.colors.black }}>
          Totp:
        </label>

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
            autocomplete="off"
            size="large"
            placeholder="Enter Totp Code"
          />
        </Form.Item>
        <Button
          loading={isDisable2faLoading}
          htmlType="submit"
          type="primary"
          className="stepper-next-btn"
        >
          Proceed
        </Button>
      </Form>
    </StyledVerifyTotpModal>
  );
};

export default VerifyTotp;
