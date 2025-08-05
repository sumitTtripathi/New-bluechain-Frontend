import React from "react";
import { RadioContainer } from "./RadioText.style";

const RadioText = ({ selected, text, label, group, onChange }) => {
  return (
    <RadioContainer>
      <div>
        <input
          onChange={onChange}
          checked={selected ? "checked" : ""}
          type="radio"
          name={group}
        />
      </div>
      <div>
        <div>{label}</div>
        <div>{text}</div>
      </div>
    </RadioContainer>
  );
};

export default RadioText;
