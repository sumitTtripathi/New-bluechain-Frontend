import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const StyledButtonsHead = styled.div`
  padding: 5px;

  button {
    font-size: 13px;
    padding: 5px 7px;
    border-color: ${(props) =>
      props.active
        ? props?.theme?.colors?.blue?.dark
        : props?.theme?.colors?.grey?.semilight};
    /* */
    span {
      color: ${(props) =>
        props.active
          ? props?.theme?.colors?.blue?.dark
          : props?.theme?.colors?.grey?.semilight} !important;
    }
  }
  button:active {
    color: blue !important;
  }
`;

function ButtonsHead({
  label,
  value,
  setSelectedAlgoOrder,
  selectedAlgoOrder,
}) {
  return (
    <StyledButtonsHead active={value === selectedAlgoOrder}>
      <Button onClick={() => setSelectedAlgoOrder(value)}>{label}</Button>
    </StyledButtonsHead>
  );
}

export default ButtonsHead;
