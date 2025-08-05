import styled from "styled-components";

export const StyledLoginMiniContainer = styled.div`
  background: ${(props) => props.theme.colors.blend};
  border-radius: 15px;
  padding: 16px;
  width: 185px;
  .coin-icon {
    height: 20px;
    width: 20px;
  }
  .first-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
  }
  .coin-details {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .coin-name {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.subText2};
    line-height: ${(props) => props.theme.typography.subText4};
    color: ${(props) => props.theme.colors.black};
  }
  .market-details {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
  }
  .market-info {
    color: ${(props) => props.theme.colors.marketDown};
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.subText2};
    line-height: ${(props) => props.theme.typography.subText4};
  }
`;
