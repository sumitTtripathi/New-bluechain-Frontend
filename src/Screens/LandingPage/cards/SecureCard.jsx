import React from "react";
import { PermissionCardStyle } from "../LandingPage.styles";
import { config } from "../../../config";

const SecureCard = () => {
  return (
    <PermissionCardStyle
      style={{
        background: "url(/Banners/banner2.png)",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="text-container">
        <div className="heading-text">
          Proof of <span className="text-blue">Reserve</span>
        </div>
        <div className="banner-text">Secure and Transparent</div>
        <div className="bottom-line">
          <span>
            100% Reserve has been the bottom line of {config.APP_NAME}
          </span>
        </div>
      </div>
      <div>
        <img src={"/Logo/lock.svg"} alt="" />
      </div>
    </PermissionCardStyle>
  );
};

export default SecureCard;
