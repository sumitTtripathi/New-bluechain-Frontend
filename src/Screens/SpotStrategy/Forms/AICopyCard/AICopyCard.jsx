import { Button, Collapse, Divider, Form } from "antd";
import React, { useState } from "react";
import { useTheme } from "styled-components";
import ActionButton from "../../../../Components/ActionButton/ActionButton";
import AdvancedManualTrading from "../../../../Components/ManualTrading/AdvancedManualTrading";
import SuccessModal from "../../../../Components/ManualTrading/SuccessModal";
import { StyledSlider } from "../../../Spot/SpotTrading/SpotTrading.styles";
import ConfirmationModal from "../Common/ConfirmationModal";
import FormInput from "../Common/FormInput";
import { StyledAICopyCard } from "./AICopyCard.styles";

function AICopyCard({ setAdjustForm }) {
  const theme = useTheme();
  const items = [
    {
      key: "1",
      label: "Advanced",
      children: (
        <div className="information">
          <div className="basic-info-container">
            <p>Start condition</p>
            <p>Stop condition</p>
            <p>TP price</p>
            <p>SL price</p>
          </div>
          <div className="basic-info-container dark">
            <p>Instant</p>
            <p>Manual</p>
            <p>--</p>
            <p>--</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <StyledAICopyCard>
      <div className="account-container">
        <img src="" alt="account" />
        <p>Simson_Joe</p>
      </div>
      <Divider type="vertical" />
      <div className="basic-info">
        <h3>Basic Information</h3>
        <div className="information">
          <div className="basic-info-container">
            <p>PnL%</p>
            <p>Runtime</p>
            <p>Max drawdown</p>
            <p>Price range</p>
            <p>Grid mode</p>
            <p>Grid quantity</p>
          </div>
          <div className="basic-info-container dark">
            <p className="market">+425.51%</p>
            <p>71d 9h</p>
            <p>10.81%</p>
            <p>10,000-150,000 USDT</p>
            <p>Arithmetic</p>
            <p>150</p>
          </div>
        </div>

        <div className="basic-info-container">
          <Collapse items={items} />
        </div>

        <Divider className="divider" dashed={true} />
      </div>
      <Button
        onClick={() => {
          setAdjustForm(true);
        }}
        style={{
          border: "none",
          color: theme.colors.blue.dark,
          background: "transparent",
          textAlign: "left",
          fontSize: "16px",
        }}
      >
        {" "}
        Adjust Parameters{" "}
      </Button>
    </StyledAICopyCard>
  );
}

export default AICopyCard;
