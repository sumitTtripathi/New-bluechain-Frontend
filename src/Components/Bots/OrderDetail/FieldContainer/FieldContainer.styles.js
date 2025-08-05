import styled from "styled-components";

export const StyledFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .label {
    color: ${(props) => props.theme.colors.grey.semiDark};
    /* border-bottom: 1px dashed ${(props) =>
      props.theme.colors.grey.semiDark}; */
  }
  .value {
    color: ${(props) => props.theme.colors.black};
    font-family: Helvetica;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
