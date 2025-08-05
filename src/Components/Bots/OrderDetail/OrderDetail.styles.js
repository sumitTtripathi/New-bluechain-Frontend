import styled from "styled-components";
import { deviceQuery } from "../../../MediaSizes";

export const CoinDetailsContainer = styled.div`
  background-color: ${(props) => props.theme.colors.blue.extraLight};
  display: flex;
  flex-direction: column;
  gap: 40px;

  label {
    color: ${(props) => props.theme.colors.grey.semiDark}!important;
  }

  .value-info {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
    @media (${deviceQuery.tabletL}) {
      flex-direction: column;
      gap: 5px;
      align-items: start;
    }
  }
  .space-between {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  .d-flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 50px;
  }
  .cursor {
    cursor: pointer;
  }
  .marketUp {
    color: ${(props) => props.theme.colors.marketUp} !important;
  }
  .marketDown {
    color: ${(props) => props.theme.colors.marketDown} !important;
  }
  .top {
    width: 92%;
    margin: auto;
    @media (${deviceQuery.mobileL}) {
      width: 99%;
    }
  }
  .icon-head {
    background: rgba(48, 148, 234, 0.08);
    color: #3094ea;
  }
  .run-time {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: ${(props) => props.theme.typography.text};
  }
  .stop-btn {
    background: ${(props) => props.theme.colors.blue.dark};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.text1};
    line-height: ${(props) => props.theme.typography.text2};
    border-radius: 20px;
    border: none;
    width: 140px;
    height: 40px;
    color: ${(props) => props.theme.colors.whiteOnly} !important;
  }
  .coin-details-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0px;
  }
  .details {
    background: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.grey.sliderTrack};
    width: 92%;
    margin: auto;
    border-radius: 10px;
    @media (${deviceQuery.mobileL}) {
      width: 99%;
    }
    .details-container {
      width: 95%;
      margin: auto;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: center;
      @media (${deviceQuery.mobileL}) {
        width: 99%;
      }
      p {
        margin-bottom: 10px;
      }
      .close-btn {
       padding: 6px 15px;
       color: ${(props) => props.theme.colors.black}; 
       cursor: pointer;
        border: ${(props) => props.theme.borders.border2};
        border-radius: 7px;
        font-size: ${(props) => props.theme.typography.subText4};
      }
      .holdings {
        display: flex;
        gap: 20px;
        align-items: center;
        width: 100%;
        margin: 20px 0px;
        padding: 15px 20px;
        background: ${(props) => props.theme.colors.blue.extraLight};
        white-space: break-spaces;
        p {
          margin: 0;
          color: ${(props) => props.theme.colors.black};
          @media (${deviceQuery.mobileL}) {
            font-size: 16px;
          }
        }
        img {
          width: 30px;
          heightL auto;
          
        }
      }
      .open-positions {
        width: 100%;
        padding-bottom: 20px;
        flex-wrap: wrap;
        display: grid;
        grid-template-columns: 1fr 1fr 0.5fr;
        grid-gap: 10px;
        justify-content: space-between;
        align-items: center;
    
        @media (${deviceQuery.tabletMS}) {
          grid-template-columns: repeat(1, 1fr);
        }
        .fields {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 5px;
          label {
            font-size: 12px;
            color: grey !important;
          }
        }
      }

      .ranges {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 20px;
        text-align: left;
        @media (${deviceQuery.tabletM}) {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (${deviceQuery.mobileL}) {
          grid-template-columns: repeat(2, 1fr);
          padding: 0 20px;
        }
      }
    }
  }
  .grid {
    background: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.grey.sliderTrack};
    width: 92%;
    margin: auto;
    border-radius: 10px;
    @media (${deviceQuery.mobileL}) {
      width: 99%;
    }
    color: ${(props) => props.theme.colors.black} !important  ;
    .bold {
      font-weight: bold;
    }
    .text-grey {
      color: ${(props) => props.theme.colors.grey.semiDark} !important  ;
    }
    .grid-container {
      width: 95%;
      margin: auto;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: center;

      .grid-table {
        width: 100%;
        overflow: scroll;
        display: flex;
        gap: 10px;
      }
      .grid-table::-webkit-scrollbar {
        display: none;
      }

      .grid-table {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }
    }
    .ant-progress {
      position: relative;
    }
    .ant-progress:before {
      // content: "Buy order 7";
      position: absolute;
      z-index: 1;
      left: 1%;
      top: 2px;
      color: #ffffff;
    }
    .ant-progress:after {
      content: "Sell order 5";
      position: absolute;
      z-index: 1;
      right: 1%;
      top: 2px;
      color: #ffffff;
    }
    .ant-progress > .ant-progress-outer > .ant-progress-inner {
      height: 22px;
      border-radius: 2px !important;
    }
    .ant-progress
      > .ant-progress-outer
      > .ant-progress-inner
      > .ant-progress-bg {
      height: 100% !important;
      border-radius: 2px !important;
    }
    .ant-table-cell {
      background: none !important;
      color: ${(props) => props.theme.colors.black};
    }
  }
  .history {
    background: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.grey.sliderTrack};
    width: 92%;
    margin: auto;
    margin-bottom: 60px;
    border-radius: 10px;
    @media (${deviceQuery.mobileL}) {
      width: 99%;
    }
    .history-container {
      width: 95%;
      margin: auto;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: center;
      .history-data {
        width: 100%;
      }
    }
    .ant-table-thead>tr>th{
      background: ${(props) => props.theme.colors.white};
      color: ${(props) => props.theme.colors.black};
    }
    .ant-empty-description{
      color: ${(props) => props.theme.colors.black};
    }
    
    .ant-table-cell{
      color: ${(props) => props.theme.colors.black} !important;
    }
    
  }
  .heads {
    color: var(--primary-colour, #3094ea);
    font-family: Helvetica;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: center;
    padding-top: 15px;
  }
  .ant-breadcrumb {
    a {
      color: ${(props) => props.theme.colors.black} !important;
    }
    .ant-breadcrumb-separator {
      color: ${(props) => props.theme.colors.black} !important;
    }
  }
  .ant-breadcrumb-link{
    color: ${(props) => props.theme.colors.black} !important;
  }
`;

export const ColoredValue = styled.span`
  color: ${(props) => (props?.color ? props?.color : "black")};
`;

export const CoinHeader = styled.div`
  margin: 20px 0px;

  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  font-size: ${(props) => props.theme.typography.subTitle1};

  .grid {
    background: ${(props) => props.theme.colors.blue.gradient};
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    gap: 5px;
    align-items: center;
    color: ${(props) => props.theme.colors.blue.dark};
    font-size: ${(props) => props.theme.typography.subText4};
  }
`;
export const SummaryContainer = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  gap: 10px;
  padding: 25px 30px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.grey.sliderTrack};
  background: ${(props) => props.theme.colors.white};
  @media (${deviceQuery.tabletMS}) {
    padding: 25px 10px;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    text-align: left;
  }
  .label {
    color: ${(props) => props.theme.colors.grey.semiDark};
    border-bottom: 1px dashed ${(props) => props.theme.colors.grey.semiDark};
    margin-bottom: 5px;
  }
  .value {
    color: ${(props) => props.theme.colors.black}!important;
  }
  .w-full {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .withdraw-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;
    background: ${(props) => props.theme.colors.grey.sliderTrack};
    border-radius: 30px;
    color: ${(props) => props.theme.colors.grey.semiDark};
    font-size: 12px;
  }
  .flex:first-child {
    border-bottom: 1px solid ${(props) => props.theme.colors.grey.sliderTrack};
    padding-bottom: 10px;
  }
  .w-full:first-child {
    padding: 0px 30px;
    @media (${deviceQuery.tabletMS}) {
      padding: 25px 0px;
    }
  }
`;

export const OrderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10ppx;
  width: 100%;
  div:first-child {
    width: ${(props) =>
      props?.calculations?.buy ? `${props?.calculations?.buy}%` : "0%"};
    text-align: start;
    background: ${(props) => props.theme.colors.marketUp};
    color: ${(props) => props.theme.colors.whiteOnly};
    display:${(props) =>
      props?.calculations?.buy ? `block` : "none"};  !important; 
    padding:${(props) =>
      props?.calculations?.buy ? `7px 15px` : "0"};  !important;
  }
  div:last-child {
    width: ${(props) =>
      props.calculations?.sell ? `${props.calculations?.sell}%` : "0%"};
    text-align: end;
    display:${(props) =>
      props?.calculations?.sell ? `block` : "none"}  !important;  
    background: ${(props) => props.theme.colors.marketDown};
    color: ${(props) => props.theme.colors.whiteOnly};
    padding:${(props) =>
      props?.calculations?.sell ? `7px 15px` : "0"} !important;  
    }
`;
