import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDisable2faMutation } from "../../../../Services/Auth";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { useMemo, useState } from "react";
import { useTheme } from "styled-components";

const WithdrawModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const theme = useTheme();
  const [totpForm] = useForm();
  const [otp] = useState("");
  const [disable2fa] = useDisable2faMutation();
  const handleTotpSubmit = async (values) => {
    try {
      const response = await disable2fa(values).unwrap();
      toast.success(response?.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  const otpStyle = useMemo(() => {
    return {
      background: theme.colors.grey.semiLight,
      borderRadius: "8px",
      padding: "10px 10px",
      border: "none",
      width: "60px",
    };
  }, [theme]);

  const otpActiveBtn = {
    background: "rgba(48, 148, 234, 0.2)",
    borderRadius: "4px",
    color: theme.colors.grey.dark,
    padding: "5px 20px",
    border: "none",
  };
  const otpBtn = {
    background: theme.colors.withdrawContainer,
    borderRadius: "4px",
    color: theme.colors.grey.dark,
    padding: "5px 20px",
    border: "none",
  };
  return (
    <Modal
      title="ID Verification"
      footer={null}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        onFinish={handleTotpSubmit}
        validateTrigger={["onChange", "onBlur"]}
        initialValues={{ remember: true }}
        form={totpForm}
      >
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <Button className="otp-btn" style={otpBtn}>
            SMS
          </Button>
          <Button className="otp-active" style={otpActiveBtn}>
            TOTP Authentication
          </Button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          Please enter 6-digit TOTP code:
        </div>
        <OtpInput
          value={otp}
          onChange={() => {}}
          numInputs={6}
          renderSeparator={<span style={{ marginLeft: "20px" }}></span>}
          renderInput={() => (
            <Input autocomplete="off" style={otpStyle} className="otp-input" />
          )}
        />
      </Form>
    </Modal>
  );
};

export default WithdrawModal;
