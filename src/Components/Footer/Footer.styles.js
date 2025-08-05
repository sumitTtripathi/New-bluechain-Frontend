import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const StyledFooter = styled.div`
  .main-footer {
    padding: 48px;
    padding-bottom: 100px;
    background: ${(props) => props.theme.colors.blue.light};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left {
    display: flex;
    gap: 10px;
    text-align: left;
    align-items: left;
    flex-direction: column;
    .desc {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text2};
      line-height: ${(props) => props.theme.typography.subTitle2};
      color: ${(props) => props.theme.colors.grey.dark};
    }
    .desc.copyright {
      font-size: ${(props) => props.theme.typography.subText4};
    }
    .social-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .social-icon {
      cursor: pointer;
    }
  }
  .logo {
    align-self: flex-start;
    height: 37px;
    width: 144px;
  }
  .right {
    display: flex;
    width: 50%;
    justify-content: end;
    .link-column {
      display: flex;
      text-align: left;
      flex-direction: column;
      word-break: break-word;
      gap: 16px;
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text1};
      color: ${(props) => props.theme.colors.grey.dark};
    }
    .title {
      font-size: ${(props) => props.theme.typography.text1};
      line-height: ${(props) => props.theme.typography.subTitle2};
      color: ${(props) => props.theme.colors.black};
      cursor: pointer;
    }
  }
  .footer-line {
    padding: 0 48px;
    background: ${(props) => props.theme.colors.blue.dark};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    color: ${(props) => props.theme.colors.whiteOnly};
  }
  @media (${deviceQuery.mobileL}) {
    .footer-line {
      padding: 0 5px;
      font-size: ${(props) => props.theme.typography.text};
    }
    .main-footer {
      padding: 20px;
    }
  }
`;
