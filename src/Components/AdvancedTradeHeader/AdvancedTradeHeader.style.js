import { Modal } from "antd";
import styled from "styled-components";

export const AdvancedTradeHeaderContainer = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 0px 20px;
  color: ${(props) => props.theme.colors.whiteOnly};
  .item-center {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .w-half {
    width: 50%;
    padding: 5px 10px;
    text-align: center;
    background: ${(props) => props.theme.colors.blue.dark};
  }
  .select-d {
    width: 100%;
  }
`;
export const ModalContainer = styled(Modal)`
  .t-header {
    border-bottom: 1px solid ${(props) => props.theme.colors.sliderbg};
    padding-bottom: 5px;
    margin-bottom: 20px;
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
  }
  .error-text {
    color: ${(props) => props.theme.colors.marketDown};
  }
  .label {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .value {
    color: ${(props) => props.theme.colors.black};
  }
  .body-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .standard-black {
      color: ${(props) => props.theme.colors.black};
    }
  }
  .lev-field {
    padding: 5px 10px;
    border-radius: 5px;
    background: ${(props) => props.theme.colors.withdrawContainer} !important;
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .tab-wrapper {
    display: flex;
    gap: 15px;
    padding: 5px 20px;
    border: 1px solid ${(props) => props.theme.colors.sliderbg};
    margin-top: 5px;
    border-radius: 20px;
    overflow-x: auto;
    margin-bottom: 20px;
  }
  .tab-wrapper::-webkit-scrollbar {
    display: none;
  }
  .tab-wrapper-item {
    background: ${(props) => props.theme.colors.blue.dark};
    font-size: ${(props) => props.theme.typography.subText2};
    color: ${(props) => props.theme.colors.whiteOnly};
    padding: 2px 15px;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
  }
  .ant-modal-content {
    background: ${(props) => props.theme.colors.white};
  }
  .ant-modal-close-icon {
    color: ${(props) => props.theme.colors.black} !important;
  }
`;
export const LogoInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 30px;
  }
  div {
    font-weight: bold;
  }
  .mode {
    font-size: ${(props) => props.theme.typography.subText2};
    color: ${(props) => props.theme.colors.blue.dark};
    background: ${(props) => props.theme.colors.blue.gradient1};
    padding: 2px 8px;
    border-radius: 3px;
  }
  .tab-container {
    display: flex;
    gap: 10px;
  }
`;
