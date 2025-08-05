import React from "react";
import { PermissionCardStyle } from "../LandingPage.styles";
import { config } from "../../../config";

const PermissionCard = () => {
  return (
    <PermissionCardStyle
      style={{
        background: "url(/Banners/banner1.png)",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="text-container">
        <div className="heading-text">
          {config.APP_NAME} will <span className="text-red">NOT</span> ask for
          Your sensitive information
        </div>
        <div className="banner-text">Be aware of phishing and fraud</div>
        <div>
          <button className="banner-btn">Click to verify</button>
        </div>
      </div>
      <div>
        <img src={"/Logo/permission.svg"} alt="" />
      </div>
    </PermissionCardStyle>
  );
};

export default PermissionCard;
