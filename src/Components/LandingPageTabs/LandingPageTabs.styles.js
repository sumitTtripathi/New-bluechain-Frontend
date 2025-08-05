import { Tabs } from "antd";
import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const StyledLandingPageTabs = styled.div`
  text-align: left;
  padding: 65px 55px 60px 55px;
  @media (${deviceQuery.mobileL}) {
    padding: 20px 10px 0 10px;
  }
  .title {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.title3};
    line-height: ${(props) => props.theme.typography.title4};
    color: ${(props) => props.theme.colors.black};
    margin-bottom: 0;
  }
  .subtitle {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
    color: ${(props) => props.theme.colors.grey.dark};
    margin-top: 4px;
  }
`;

export const StyledTabs = styled(Tabs)`
  margin-top: 32px;
  .details {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text2};
    line-height: ${(props) => props.theme.typography.subTitle2};
    color: ${(props) => props.theme.colors.black};
  }
  .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    display: none;
  }
  .ant-tabs-tab {
    width: 120px;
    height: 41px;
    background: ${(props) => props.theme.colors.blue.gradient};
    border-radius: 8px;
    justify-content: center;
  }
  &.ant-tabs .ant-tabs-tab + .ant-tabs-tab {
    margin-left: 8px;
  }
  .ant-tabs-nav::before {
    display: none;
  }
  .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.blue.dark} !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active {
    color: ${(props) => props.theme.colors.grey.dark} !important;
    background: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.blue.dark};
    border-radius: 8px;
  }
`;
