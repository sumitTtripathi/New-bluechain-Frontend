import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const AICardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 20px 25px;
  border: 1px solid ${(props) => props.theme.colors.grey.light};
  background: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  .font-grey {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .row {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .ai-title {
    font-weight: bold;
    font-size: 18px;
  }
  .copy-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.colors.blue.extraLight};
    color: ${(props) => props.theme.colors.blue.dark};
    padding: 5px 25px;
    border-radius: 25px;
    border: 1px solid ${(props) => props.theme.colors.blue.dark};
  }
  .people-row {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${(props) => props.theme.colors.grey.light};
    padding: 5px 0px;
    @media (${deviceQuery.mobileMSN}) {
      flex-wrap: wrap;
    }
  }
  .cartegory-btn {
    padding: 5px 15px;
    background: ${(props) => props.theme.colors.blue.extraLight};
    color: ${(props) => props.theme.colors.blue.dark};
    width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .people-img {
    width: 30px;
  }
  .graph-row {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
  }
  .percentage {
    font-weight: bold;
    font-size: 18px;
  }
  .green {
    color: ${(props) => props.theme.colors.marketUp};
  }
`;
