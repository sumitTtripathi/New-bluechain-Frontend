import styled from "styled-components"

export const PasswordStrengthWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .strength-bar {
    flex-grow: 1;
    height: 4px;
    background-color: #333;
    border-radius: 2px;
    overflow: hidden;
    margin-right: 10px;
  }
  
  .strength-indicator {
    height: 100%;
    transition: width 0.3s ease, background-color 0.3s ease;
  }
  
  .weak {
    background-color: #ff4d4f;
    width: 33%;
  }
  
  .middle {
    background-color: #ff7a45;
    width: 66%;
  }
  
  .strong {
    background-color: #52c41a;
    width: 100%;
  }
  
  .strength-text {
    font-size: 14px;
  }
  
  .weak-text {
    color: #ff4d4f;
  }
  
  .middle-text {
    color: #ff7a45;
  }
  
  .strong-text {
    color: #52c41a;
  }
`
