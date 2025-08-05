import styled from "styled-components";
import { deviceQuery } from "../../../MediaSizes";

export const StyledStickyNav = styled.div`
  width: 100%;
  padding: 10px 60px 10px 60px;
  box-shadow: 0px 18px 7px rgba(0, 0, 0, 0.01), 0px 10px 6px rgba(0, 0, 0, 0.05),
    0px 4px 4px rgba(0, 0, 0, 0.09), 0px 1px 2px rgba(0, 0, 0, 0.1),
    0px 0px 0px rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  background: ${(props) => props.theme.colors.blue.extraLight};
  @media (${deviceQuery.mobileL}) {
    display: none;
  }
  @media (${deviceQuery.tabletL}) {
    padding: 10px;
  }
  .coin-img-container {
    display: flex;
    gap: 20px;
    .coin-name-container {
      display: flex;
      gap: 20px;
    }
    .rating {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.subTitle1};
      color: ${(props) => props.theme.colors.rating};
    }
    .coin-name {
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.title2};
      color: ${(props) => props.theme.colors.black};
    }
    img {
      height: 70px;
      width: 70px;
    }
  }

  .latest-price-label {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .market-perc {
      background: ${(props) =>
        props.marketUp
          ? props.theme.colors.marketUp
          : props.theme.colors.marketDown};
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      width: 128px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.white};
    }
    .price {
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.title1};
      line-height: ${(props) => props.theme.typography.title2};
      color: ${(props) => props.theme.colors.black};
    }
    .row-left,
    .row-right {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
      .currency {
        color: ${(props) => props.theme.colors.black};
      }
      .ant-progress-text {
        display: none;
      }
      .price-value {
        font-weight: ${(props) => props.theme.fontWeight.bold};
        font-size: ${(props) => props.theme.typography.text};
        line-height: ${(props) => props.theme.typography.text1};
        color: ${(props) => props.theme.colors.black};
      }
    }
    .row-right > .price-deposit-btn {
      background: ${(props) => props.theme.colors.blue.gradient};
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.text1};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.blue.dark};
      border-radius: 8px;
      border: none;
      width: 140px;
      height: 40px;
    }
  }
  .right {
    width: 55%;
    text-align: left;
  }
`;
