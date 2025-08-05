import styled from "styled-components";

export const SpotCard = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  border-radius: 10px;
  align-items: center;
  margin: 20px 0;
  cursor: pointer;
  background: ${(props) => props.theme.colors.withdrawContainer};
  .font-bold {
    font-weight: bold;
    color: ${(props) => props.theme.colors.black};
  }
  .font-blue {
    color: ${(props) => props.theme.colors.blue.dark};
  }
  .font-grey {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .font-green {
    color: ${(props) => props.theme.colors.marketUp};
  }
`;
export const CardDetailContainer = styled.div`
  display: flex;
  gap: 5px;
`;
export const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
