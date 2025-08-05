import { Collapse, Tabs } from "antd";
import styled from "styled-components";
import { deviceQuery } from "../../../../MediaSizes";

export const StyledBotMarketPlace = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  .marketplace-container {
    width: 92%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 20px;

    .head-buttons {
      display: flex;
      gap: 20px;
      padding: 10px 0px;
      width: 100%;
      overflow: scroll;
    }
    .head-buttons::-webkit-scrollbar {
      display: none;
    }
    .head-buttons {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
    .market-card {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-top: 40px;
      text-align: left;
      width: 100%;
      @media (${deviceQuery.laptopL}) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (${deviceQuery.tabletL}) {
        grid-template-columns: repeat(1, 1fr);
      }
    }
    .faq-section {
      width: 95%;
      margin: auto;
      margin-top: 60px;
      .title {
        color: ${(props) => props.theme.colors.black};
        font-family: Helvetica;
        font-size: 32px;
        font-style: normal;
        line-height: normal;
      }
    }
    .dropdowns {
      width: 100%;
      overflow: scroll;
      display: flex;
      justify-content: space-between;
      /* overflow: auto;
    overflow-x: hidden; */

      .section {
        display: flex;
      }
    }
    .dropdowns::-webkit-scrollbar {
      display: none;
    }
    .dropdowns {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
    .first-dropdown {
      display: flex;
      gap: 50px;
      align-items: center;
    }

    .ant-select-selector {
      background-color: transparent !important;
    }
    .ant-select-selection-placeholder {
      color: ${(props) => props.theme.colors.black} !important;
    }
  }
`;

export const StyledCollapse = styled(Collapse)`
  width: 95%;
  margin: auto;
  text-align: left;
  .ant-collapse-item {
    .ant-collapse-header {
      .ant-collapse-header-text {
        color: var(--black, #27282c);
        font-family: Helvetica;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }
    .ant-collapse-content {
      background: transparent;
      .ant-collapse-content-box {
        p {
          color: var(--grey, #7b7485);
          font-family: Helvetica;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 150%;
        }
      }
    }
  }
`;
export const StyledTab = styled(Tabs)`
  color: ${(props) => props.theme.colors.black};
`;
