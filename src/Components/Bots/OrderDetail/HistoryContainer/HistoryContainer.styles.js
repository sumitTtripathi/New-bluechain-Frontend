import styled from "styled-components";

export const StyledHistoryContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  .label {
    color: ${(props) => props.theme.colors.grey.semiDark};
    /* border-bottom: 1px dashed ${(props) =>
      props.theme.colors.grey.semiDark}; */
  }
  .label-def {
    color: var(--primary-colour, #3094ea);
    font-family: Helvetica;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .container-first {
    text-align: left;
  }
  .container-last {
    text-align: right;
  }
  .cursor {
    cursor: pointer;
  }
`;
