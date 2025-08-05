import styled from "styled-components";

export const StyledLoader = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.colors.blue.extraLight};
  justify-content: center;
`;
