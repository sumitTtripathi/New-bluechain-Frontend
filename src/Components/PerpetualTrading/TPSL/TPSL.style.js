import styled from "styled-components";

export const ContainerMinMax = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  .label {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
`;
