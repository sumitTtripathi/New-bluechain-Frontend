import styled from "styled-components";

export const StyledMarketCard = styled.div`
  background: white;
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  /* width: 435px;
  height: 370px; */
  .logo-head {
    p {
      color: var(--black, #27282c);
      font-family: Helvetica;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
  .head-container {
    display: flex;
    justify-content: space-between;
    .small-head {
      display: flex;
      gap: 20px;
      p {
        color: var(--primary-colour, #3094ea);
        font-family: Helvetica;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
  .main-body {
    display: flex;
    flex-direction: column;
    .upper-main-body {
      display: flex;
      justify-content: space-between;
      .container {
        display: flex;
        flex-direction: column;
      }
      .right {
        text-align: right;
      }
    }
    .lower-main-body {
      display: flex;

      .container {
        display: flex;
      }
      .last {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;
