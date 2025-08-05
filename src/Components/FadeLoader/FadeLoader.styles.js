import styled from "styled-components";

export const StyledFadeLoader = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  z-index: 1100;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.backdrop};
`;
