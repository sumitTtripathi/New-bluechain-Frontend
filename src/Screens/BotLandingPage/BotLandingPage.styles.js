import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";
export const BotLandingPageContainer = styled.div`
  background-color: rgba(48, 148, 234, 0.08) !important;
  .explore {
    width: 90%;
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
  /* - */

  /* [class^="sc-"]:nth-child(2) {
    background: transparent !important;
  } */
  .title.main {
    margin-bottom: 22px;
    text-align: center;
    color: ${(props) => props.theme.colors.black};
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
  padding: 65px 55px 80px 55px;
  width: 100%;
  text-align: left;
  background-image: url("/Banners/BotBannersss.svg");
  background-position: 53% 0%;
  background-repeat: no-repeat;
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
    text-align: center;
  }

  .table-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    flex-wrap: wrap;
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
    background: ${(props) => props.theme.colors.white};
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
    font-weight: ${(props) => props.theme.fontWeight.semilight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.fontWeight.text2};
    color: ${(props) => props.theme.colors.whiteOnly};
  }
  .register-button:hover {
    color: ${(props) => props.theme.colors.white};
  }
`;

export const StyledCardsContainer = styled.div`
  text-align: left;
  padding: 65px 55px 0px 55px;
  @media (${deviceQuery.mobileL}) {
    padding: 20px 10px 0 10px;
  }
  .card-title {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.title3};
    line-height: ${(props) => props.theme.typography.titl4};
    color: ${(props) => props.theme.colors.black};
  }
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
    grid-template-columns: 1fr;
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
    color: ${(props) => props.theme.colors.white};
  }
  .trading-heading-text {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: ${(props) => props.theme.colors.blue.dark};
  }
  .heading-text {
    font-family: "Helvetica";
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: ${(props) => props.theme.colors.blue.dark};
  }
  .text-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }
  .text-red {
    color: #db5541;
  }
  .text-blue {
    color: ${(props) => props.theme.colors.blue.dark};
  }
  .bottom-line {
    background: linear-gradient(
      90deg,
      #2859fa 0%,
      #4893fd 51.04%,
      #6bb5fc 100%
    );
    border-radius: 4px;
    padding: 5px 15px;
    span {
      font-family: "Helvetica";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 11px;
      color: ${(props) => props.theme.colors.white};
    }
  }
  .trading-bottom-line {
    background: linear-gradient(
      90deg,
      #dac4ff 0%,
      #c5acf2 51.04%,
      rgba(225, 240, 255, 0) 100%
    );
    border-radius: 4px;
    padding: 5px 15px;
    width: fit-content;
    span {
      font-family: "Helvetica";
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 14px;
      color: ${(props) => props.theme.colors.blue.dark};
    }
  }
  .banner-text {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #2c3ca7;
  }
  .onestep-banner-text {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #e0dee1;
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
    background: #3094ea;
    border-radius: 500px;
    cursor: pointer;
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    font-size: 16px;
    padding: 10px 15px;
    color: #ffffff;
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
    color: #2c3ca7;
  }
  .heading-text {
    font-family: "Helvetica";
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #2c3ca7;
  }
  .text-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }
  .text-red {
    color: #db5541;
  }
  .text-blue {
    color: #3094ea;
  }
  .bottom-line {
    background: linear-gradient(
      90deg,
      #2859fa 0%,
      #4893fd 51.04%,
      #6bb5fc 100%
    );
    border-radius: 4px;
    padding: 5px 15px;
    span {
      font-family: "Helvetica";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 11px;
      color: #ffffff;
    }
  }
  .trading-bottom-line {
    background: linear-gradient(
      90deg,
      #dac4ff 0%,
      #c5acf2 51.04%,
      rgba(225, 240, 255, 0) 100%
    );
    border-radius: 4px;
    padding: 5px 15px;
    width: fit-content;
    span {
      font-family: "Helvetica";
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 14px;
      color: #3a0e83;
    }
  }
  .banner-text {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #2c3ca7;
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
    background: #3094ea;
    border-radius: 500px;
    cursor: pointer;
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    font-size: 16px;
    padding: 10px 15px;
    color: #ffffff;
    border: none;
  }
`;

export const ScoreLayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    color: ${(props) => props.theme.colors.grey.semiDark} !important;
  }
  h2 {
    color: ${(props) => props.theme.colors.black} !important;
  }
`;
export const ScoreCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => props?.justify || "center"};

  padding: 0px 20px;
  margin-top: 50px;

  @media (${deviceQuery.tabletS}) {
    padding: 0px 10px;
    gap: 20px;
  }
`;
export const GradientEffect = styled.div`
  width: 100%;
  height: 30px;
  background: linear-gradient(180deg, #f4fafc 0%, #ffffff 120.18%);
`;
export const TabHead = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.colors.grey.semiDark} !important;
`;
export const FlexColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${(props) => props?.width || "fit-content"};
  .default-card {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .row-card {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    @media (${deviceQuery.laptopL}) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export const FlexRow = styled.div`
  display: flex;

  gap: 10px;
  width: 100%;
  .head-container {
    display: flex;
    align-items: left;
    gap: 20px;
    .head-row {
      display: flex;
      gap: 10px;
      justify-content: space-between;
    .text-wrap{
      p{
        @media (${deviceQuery.laptopM}) {
          width: 80px;
      white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
    }
        

      }
      
    }

    }
  }
  .rest-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    .title{
     color: #27282C;
font-family: Helvetica;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
    }
  }
  .card-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 302px;
    height: 64px;
    padding: 10px;
    border-radius: 15px; color: ${(props) => {
      return props?.currentIndex === props?.index ? "white" : "black";
    }};
    background: ${(props) => {
      return props?.currentIndex === props?.index
        ? "rgb(48, 148, 234)"
        : "rgba(48, 148, 234, 0.15)";
    }};
    .left-container {
      display: flex;
      gap: 10px;
    }
  
    .ant-btn {
    background:${(props) => {
      return props?.currentIndex === props?.index
        ? "white"
        : "rgb(48, 148, 234)";
    }};
    color:${(props) => {
      return props?.currentIndex === props?.index
        ? "rgb(48, 148, 234)"
        : "white";
    }};
    border-radius: 50px;
  }
  .ant-btn:focus {
  background: white;
}}
  /* .card-container:active{
    /* background: rgb(48, 148, 234);
    background: rgb(48, 148, 234);
  } */ */

`;
export const MyBotContainer = styled.div`
  display: flex;
  justify-content: ${(props) => props?.justify || "center"};
  gap: 50px;
  @media (${deviceQuery.laptopL}) {
    flex-wrap: wrap-reverse;
  }
  .font-bold {
    font-weight: bold;
    color: ${(props) => props.theme.colors.black};
  }
  .font-grey {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
`;
export const OnGoingContainer = styled.div`
  display: flex;
  height: 128px;
  border: 1px dashed ${(props) => props.theme.colors.black};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  padding: 5px;
  background: ${(props) => props.theme.colors.blue.dark};
  display: flex;
  gap: 10px;
`;
