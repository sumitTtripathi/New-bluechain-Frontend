import { Dropdown } from "antd";
import styled from "styled-components";

export const StyledDropdown = styled(Dropdown)`
  &.lang-selector {
    cursor: pointer;
    color: ${(props) => props.theme.colors.black};
  }
`;
