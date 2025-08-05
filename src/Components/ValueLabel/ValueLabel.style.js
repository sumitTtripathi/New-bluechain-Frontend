import styled from "styled-components";

export const LabelValueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  .label {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .value {
    color: ${(props) => props.theme.colors.black};
  }
`;
