import styled from "styled-components";

export const StyledAccountContainer = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: 15px;
  box-shadow: 0px 15px 6px rgba(0, 0, 0, 0.01), 0px 8px 5px rgba(0, 0, 0, 0.03),
    0px 4px 4px rgba(0, 0, 0, 0.04), 0px 1px 2px rgba(0, 0, 0, 0.05),
    0px 0px 0px rgba(0, 0, 0, 0.05);
  min-width: 200px;
  svg {
    margin: 22px 0 11px 22px;
  }
  .account-name {
    height: 28px;
    display: flex;
    align-items: center;
    padding-left: 14px;
    background: ${(props) => props.theme.colors.blue.extraLight};
    p {
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text1};
      color: ${(props) => props.theme.colors.black};
      margin: 0;
    }
  }
  .menu-items {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    gap: 7px;
  }
  .single-menu {
    display: flex;
    align-items: center;
    height: 32px;
    width: 100%;
    gap: 13px;
    cursor: pointer;
    padding-left: 14px;
    span {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.grey.semiDark};
    }
    svg {
      margin: 0;
      color: ${(props) => props.theme.colors.logout};
    }
  }
  .account-divider {
    color: ${(props) => props.theme.colors.grey.semiDark};
    margin-bottom: 0;
  }
`;
