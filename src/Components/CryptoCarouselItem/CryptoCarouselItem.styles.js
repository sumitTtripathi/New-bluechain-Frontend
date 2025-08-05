import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const StyledCryptoCarouselItem = styled.div`
  display: flex;
  width: 100%;
  /* justify-content: space-between; */
  align-items: center;
  color: ${(props) => props.theme.colors.grey.semiDark};
  .test {
    display: flex;
    cursor: pointer;
    align-items: center;
    min-width: 20%;
  }
  .test:last-child {
    .break-line {
      display: none;
    }
  }
  .contain-card {
    width: 100%;
    display: flex !important;
    justify-content: space-around;
    @media (${deviceQuery.laptopL}) {
      justify-content: space-around;
      gap: 50px;
      align-items: center;
    }
    @media (${deviceQuery.mobileSM}) {
      flex-direction: column;
    }
  }
  .v-none {
    visibility: hidden;
    @media (${deviceQuery.mobileSM}) {
      display: none !important;
    }
  }
  @media (${deviceQuery.laptopL}) {
    overflow-x: auto !important;
  }
  @media (${deviceQuery.laptopS}) {
    justify-content: space-between;
  }
`;

export const StyledSingleCryptoCard = styled.div`
  min-width: 100%;
  padding: 0 22px;
  .card-first-row {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  .crypto-details {
    display: flex;
    align-items: center;
    gap: 8px;
    .crypto-icon {
      height: 30px;
      width: 30px;
    }
  }
  .price {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.subTitle1};
    line-height: ${(props) => props.theme.typography.subTitle2};
    color: ${(props) => props.theme.colors.black};
    margin-top: 8px;
  }
  .price-layer-container {
    display: flex;
    align-items: center;
    margin-top: 8px;
    gap: 8px;
  }
  .percentage {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.text1};
    line-height: ${(props) => props.theme.typography.text2};
    color: ${(props) =>
      props.percentage > 0
        ? props.theme.colors.marketUp
        : props.theme.colors.marketDown};
  }
  .crypto-name {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.text2};
    line-height: ${(props) => props.theme.typography.text1};
    color: ${(props) => props.theme.colors.black};
  }
`;
