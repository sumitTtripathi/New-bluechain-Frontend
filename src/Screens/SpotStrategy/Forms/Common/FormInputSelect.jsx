import { Form, Select } from "antd";
import { useState } from "react";

const FormInputSelect = ({ selectOption, name, data }) => {
  const [value, setValue] = useState(data);
  return (
    <Form.Item name={name}>
      <Select
        value={value}
        onChange={(e) => {
          setValue({ value: e, label: e });
        }}
        options={selectOption}
      />
    </Form.Item>
  );
};

export default FormInputSelect;
