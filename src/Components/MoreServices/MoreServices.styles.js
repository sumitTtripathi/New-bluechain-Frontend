import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const StyledMoreServices = styled.div`
  padding: 48px 48px 89px 48px;
  background: ${(props) => props.theme.colors.blue.extraLight};

  .title {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.title3};
    line-height: ${(props) => props.theme.typography.title5};
    color: ${(props) => props.theme.colors.black};
    margin-bottom: 15px;
  }
  .divider {
    border-color: ${(props) => props.theme.colors.dividerColor};
    height: 80px;
  }
  @media (${deviceQuery.mobileL}) {
    padding: 20px 10px 0 10px;
    .divider {
      display: none;
    }
  }
  .card-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .card {
    width: 45%;
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.moreServicesBg};
    border-radius: 15px;
    height: 72px;
  }
  @media (${deviceQuery.mobileL}) {
    .card-container {
      gap: 20px;
      padding-bottom: 50px;
    }
    .card {
      width: 100%;
    }
  }
  .card:hover {
    .card-details {
      color: ${(props) => props.theme.colors.blue.dark};
    }
  }
  .card-internal {
    display: flex;
    height: 100%;
    padding-left: 25px;
    gap: 35px;
    align-items: center;
  }
  .card-details {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.subTitle2};
    line-height: ${(props) => props.theme.typography.titl3};
    color: ${(props) => props.theme.colors.black};
  }
`;
