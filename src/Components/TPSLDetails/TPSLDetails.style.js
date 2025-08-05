import styled from "styled-components";

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding 10px;
  border-radius: 10px;
  font-size: ${(props) => props.theme.typography.subText2};
  background: ${(props) => props.theme.colors.withdrawContainer};
  color: ${(props) => props.theme.colors.grey.semiDark};
  .justify-between {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  .flex {
    display: flex;
    gap: 7px;
  }
`;
