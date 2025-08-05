import { Button } from "antd";
import styled from "styled-components";

export const SendCodeButton = styled(Button)`
  position: absolute;
  right: ${(props) => (props.right ? props.right : "0")};
  border: none;
  padding: 0;
  color: ${(props) => props.theme.colors.blue.dark};
  top: 0px;
  transform: ${(props) =>
    props.isTranslate && !props.error && "translate(0, -50%)"};
`;
