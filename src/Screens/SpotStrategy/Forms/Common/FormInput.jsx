import { Divider, Form, Input } from "antd";

const FormInput = ({ prefix, asset, name, rules }) => {
  return (
    <Form.Item name={name} rules={rules}>
      <Input
        autocomplete="off"
        className="input"
        suffix={
          <>
            <span className="label">{asset}</span>
          </>
        }
        prefix={
          <>
            <span className="label">{prefix}</span>
            <Divider type="vertical" />
          </>
        }
      />
    </Form.Item>
  );
};

export default FormInput;
