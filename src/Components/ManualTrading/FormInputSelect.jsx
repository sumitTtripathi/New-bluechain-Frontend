import { Form, Select } from "antd";

const FormInputSelect = ({
  selectValue,
  setSelectValue,
  selectOption,
  name,
}) => {
  const handleChange = (value) => {
    setSelectValue(value);
  };
  return (
    <Form.Item name={name}>
      <Select
        value={selectValue}
        style={{
          width: "100%",
          textAlign: "right",
        }}
        onChange={handleChange}
        options={selectOption}
      />
    </Form.Item>
  );
};

export default FormInputSelect;
