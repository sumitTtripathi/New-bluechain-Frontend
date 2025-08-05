import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";
export const LandingPageContainer = styled.div`
   background: ${(props) => props.theme.colors.deepBlack};
  .explore {
    padding: 46px 0 150px 0;
    background: ${(props) => props.theme.images.bgImage};
    .background {
    }
  }
  .ant-table-column-sorter,
  .ant-table-column-sorter:hover {
    color: ${(props) => props.theme.colors.black} !important;
  }
  .ant-table-wrapper .ant-table-tbody > tr > td {
    color: ${(props) => props.theme.colors.grey.black} !important;
  }
  .ant-pagination-item-active a {
    color: ${(props) => props.theme.colors.blue.dark} !important;
  }
  .ant-pagination .ant-pagination-disabled .ant-pagination-item-link,
  .ant-pagination .ant-pagination-next .ant-pagination-item-link,
  .ant-pagination .ant-pagination-item a,
  .ant-pagination
    .ant-pagination-jump-next
    .ant-pagination-item-container
    .ant-pagination-item-ellipsis,
  .ant-pagination .ant-pagination-prev .ant-pagination-item-link {
    color: ${(props) => props.theme.colors.black};
  }
  ,
  .table-title + div {
    background-color: transparent !important;
  }

  [class^="sc-"]:nth-child(2) {
    background: transparent !important;
  }
  .title.main {
    margin-bottom: 22px;
  }
  .title {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.title3};
    line-height: ${(props) => props.theme.typography.title5};
    color: ${(props) => props.theme.colors.black};
  }
  @media (${deviceQuery.mobileL}) {
    .explore {
      .title {
        font-size: ${(props) => props.theme.typography.title1};
      }
    }
  }
  .register-btn {
    background: ${(props) => props.theme.colors.blue.dark};
    border-radius: 500px;
    height: 53px;
    min-width: 230px;
  }
`;

export const StyledLandingPage = styled.div`
  background: ${(props) => props.theme.colors.blue.gradient3};
  padding: 65px 55px 20px 55px;
  text-align: left;
  .title {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.title7};
    line-height: ${(props) => props.theme.typography.title8};
    color: ${(props) => props.theme.colors.black};
  }
  .subtitle {
    margin-top: 22px;
    font-weight: ${(props) => props.theme.fontWeight.semilight};
    font-size: ${(props) => props.theme.typography.subTitle1};
    line-height: ${(props) => props.theme.typography.subTitle3};
    color: ${(props) => props.theme.colors.grey.dark};
  }

  .table-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 100px;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
  .table-title + div[class^="sc-"] {
    background-color: transparent !important;
  }
  .more-icon {
    display: flex;
    cursor: pointer;
    align-items: center;
    gap: 12px;
    color: ${(props) => props.theme.colors.blue.dark};
  }
  .market-title {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.title3};
    line-height: ${(props) => props.theme.typography.title4};
    color: ${(props) => props.theme.colors.black};
  }
  .market-subtitle {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
    color: ${(props) => props.theme.colors.grey.dark};
    margin-top: 4px;
  }

  @media (${deviceQuery.mobileL}) {
    padding: 65px 10px 20px 10px;
  }
`;
export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 39px;
  gap: 21px;
  .input {
    max-width: 321px;
    height: 50px;
    background: white;
    border: 1px solid ${(props) => props.theme.colors.grey.light};
    border-radius: 500px;
    color: ${(props) => props.theme.colors.black};
  }

  .input::placeholder {
    color: ${(props) => props.theme.colors.placeHolderColor};
  }

  .register-button {
  padding-left: 40px;
  padding-right: 40px;
  height: 50px;
  border: none;
  background: ${(props) => props.theme.colors.blue.dark};
  border-radius: 500px;
  font-weight: ${(props) => props.theme.fontWeight.semiLight};
  font-size: ${(props) => props.theme.typography.text};
  line-height: ${(props) => props.theme.typography.text2};
  color: ${(props) => props.theme.colors.whiteOnly};
}

.register-button:hover {
  color: ${(props) => props.theme.colors.whiteOnly} !important;
  background: ${(props) => props.theme.colors.marketUp} !important;
}
`;

export const StyledCardsContainer = styled.div`
  text-align: left;
  padding: 65px 55px 0px 55px;
  background : ${(props) => props.theme.colors.gradient1};
  @media (${deviceQuery.mobileL}) {
    padding: 20px 10px 0 10px;
  }
  .card-title {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.title3};
    line-height: ${(props) => props.theme.typography.titl4};
    color: ${(props) => props.theme.colors.black};
}]
  .card-subtitle {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.subText2};
    line-height: ${(props) => props.theme.typography.subText4};
    color: ${(props) => props.theme.colors.grey.dark};
    margin-top: 4px;
  }
  .cards {
    margin: 40px 0;
  }
  .images-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 30px;
    @media (${deviceQuery.tabletM}) {
      grid-template-columns: 1fr;
      img:last-child {
        margin-top: 17px;
      }
    }
  }
  .images-container-reverse {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-top: 17px;
    column-gap: 30px;
    @media (${deviceQuery.tabletM}) {
      grid-template-columns: 1fr;
    }
  }
`;
export const TradeCryptoCardStyle = styled.div`
  display: flex;
  padding: 20px 15px;
  border-radius: 15px;
  img {
    position: relative;
  }
  .text-end-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
  .onestep-heading-text {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: white;
  }
  .trading-heading-text {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: ${(props) => props.theme.colors.tradeHeading};
  }
  .heading-text {
    font-family: "Helvetica";
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: ${(props) => props.theme.colors.tradeHeading};
  }
  .text-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }
  .text-red {
    color: ${(props) => props.theme.colors.marketDown};
  }
  .text-blue {
    color: ${(props) => props.theme.colors.blue.dark};
  }
  .bottom-line {
    background: ${(props) => props.theme.colors.bottomGradient};
    border-radius: 4px;
    padding: 5px 15px;
    span {
      font-family: "Helvetica";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 11px;
      color: ${(props) => props.theme.colors.whiteOnly};
    }
  }
  .trading-bottom-line {
    background: ${(props) => props.theme.colors.tradingBottomGradient};

    border-radius: 4px;
    padding: 5px 15px;
    width: fit-content;
    span {
      font-family: "Helvetica";
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 14px;
      color: ${(props) => props.theme.colors.blue.blueShade};
    }
  }
  .banner-text {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: ${(props) => props.theme.colors.tradeHeading};
  }
  .onestep-banner-text {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: ${(props) => props.theme.colors.grey.greyish};
  }
  .banner-btn {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 6px 16px;
    gap: 10px;
    left: 16px;
    top: 111px;
    background: ${(props) => props.theme.colors.blue.dark};
    border-radius: 500px;
    cursor: pointer;
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    font-size: 16px;
    padding: 10px 15px;
    color: ${(props) => props.theme.colors.whiteOnly};
    border: none;
  }
`;
export const PermissionCardStyle = styled.div`
  display: flex;
  flex: 1;
  height: 150px;
  padding: 20px 15px;
  img {
    position: relative;
    width: 170px;
    height: 165px;
    top: -30px;
  }
  .trading-heading-text {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: ${(props) => props.theme.colors.tradeHeading};
  }
  .heading-text {
    font-family: "Helvetica";
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: ${(props) => props.theme.colors.tradeHeading};
  }
  .text-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }
  .text-red {
    color: ${(props) => props.theme.colors.marketDown};
  }
  .text-blue {
    color: ${(props) => props.theme.colors.blue.dark};
  }
  .bottom-line {
    background: ${(props) => props.theme.colors.bottomGradient};
    border-radius: 4px;
    padding: 5px 15px;
    span {
      font-family: "Helvetica";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 11px;
      color: ${(props) => props.theme.colors.whiteOnly};
    }
  }
  .trading-bottom-line {
    background: ${(props) => props.theme.colors.tradingBottomGradient};
    border-radius: 4px;
    padding: 5px 15px;
    width: fit-content;
    span {
      font-family: "Helvetica";
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 14px;
      color: ${(props) => props.theme.colors.blue.blueShade};
    }
  }
  .banner-text {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: ${(props) => props.theme.colors.tradeHeading};
  }
  .banner-btn {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 6px 16px;
    gap: 10px;
    left: 16px;
    top: 111px;
    background: ${(props) => props.theme.colors.blue.dark};
    border-radius: 500px;
    cursor: pointer;
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    font-size: 16px;
    padding: 10px 15px;
    color: ${(props) => props.theme.colors.whiteOnly};
    border: none;
  }
`;

export const GradientEffect = styled.div`
  width: 100%;
  height: 30px;
  background: ${(props) => props.theme.colors.blue.gradient4};
`;
