import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import { CountrySelectContainer } from "./CountrySelect.styles";
import { useEffect, useState } from "react";
import { VALIDATIONS } from "../../Constants/Validations";
import { Form } from "antd";
import { v4 as uuidv4 } from "uuid";

const CountrySelect = ({ labels, ...rest }) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setOptions(
      getCountries().map((country) => {
        return {
          key: uuidv4(),
          label: labels[country] + `+${getCountryCallingCode(country)}`,
          value: country,
          name: getCountryCallingCode(country),
        };
      })
    );
  }, [labels]);

  return (
    <Form.Item
      style={{ minWidth: "25%" }}
      rules={[
        {
          required: true,
          message: VALIDATIONS.REQUIRED,
        },
      ]}
      name="country_code"
    >
      <CountrySelectContainer
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        placeholder="Country Code"
        options={options}
        {...rest}
      />
    </Form.Item>
  );
};

export default CountrySelect;
