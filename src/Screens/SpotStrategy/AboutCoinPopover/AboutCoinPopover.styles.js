import styled from "styled-components";

export const StyledAboutCoinPopover = styled.div`
  background: ${(props) => props.theme.colors.cardbg};
  .coin-name {
    display: flex;
    align-items: center;
    gap: 8px;
    img {
      width: 32px;
      height: 32px;
    }
  }
  .desc {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text2};
    color: ${(props) => props.theme.colors.grey.semiDark};
    margin-top: 14px;
  }
  .basic-info-details {
    margin-top: 20px;
    .title {
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.text2};
      line-height: ${(props) => props.theme.typography.subTitle2};
      color: ${(props) => props.theme.colors.black};
      margin-bottom: 16px;
    }
    .details-container {
      display: grid;
      align-items: center;
      margin-top: 16px;
      grid-template-columns: repeat(2, 1fr);
      .label {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.text};
        line-height: ${(props) => props.theme.typography.text1};
        color: ${(props) => props.theme.colors.grey.semiDark};
      }
      .value {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.text};
        line-height: ${(props) => props.theme.typography.text1};
        color: ${(props) => props.theme.colors.black};
        margin-top: 8px;
      }
    }
  }
  .links-container {
    display: flex;
    flex-wrap: wrap;
    margin: 24px 0;
    gap: 8px;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border: none;
      background: ${(props) => props.theme.colors.white};
      border-radius: 8px;
      span {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        color: ${(props) => props.theme.colors.grey.semiDark};
      }
    }
  }

  .links-container > a {
    background: ${(props) => props.theme.colors.white};
    border-radius: 8px;
    text-decoration: none;
    color: ${(props) => props.theme.colors.grey.semiDark};
    padding: 8px;
  }
  .button {
    background: ${(props) => props.theme.colors.blendBlue};
    border-radius: 8px;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.subTitle1};
    color: ${(props) => props.theme.colors.blue.dark};
    border: none;
    margin-top: 30px;
  }
`;
