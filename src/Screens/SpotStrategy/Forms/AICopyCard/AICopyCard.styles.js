import styled from "styled-components";

export const StyledAICopyCard = styled.div`
  border-radius: 8px;
  background: ${(props) => props.theme.colors.grey.semiLight};
  padding: 15px;
  display: flex;
  flex-direction: column;
  .account-container {
    display: flex;
  }
  .basic-info {
    display: flex;
    flex-direction: column;

    .divider {
      width: 8px;
      height: 1px;
      background-color: ${(props) => props.theme.colors.grey.dark};
      /* border: 1px dotted ${(props) =>
        props.theme.colors.grey.mediumLight}; */
      margin: 0px !important;
    }
  }
  .information {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    .basic-info-container {
      color: ${(props) => props.theme.colors.grey.dark};
      font-family: Helvetica;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .dark {
      color: ${(props) => props.theme.colors.black};
    }
    .market {
      color: ${(props) =>
        props?.active
          ? props.theme.colors.marketDown
          : props.theme.colors.marketUp};
    }
  }
`;
