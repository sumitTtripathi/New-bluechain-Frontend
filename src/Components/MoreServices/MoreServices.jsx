import { Divider } from "antd";
import { capitalizeWord } from "../../Utils/common";
import { Config } from "../../Config";
import { StyledMoreServices } from "./MoreServices.styles";

// Used in Landing Page as a section
const MoreServices = () => {
  return (
    <StyledMoreServices>
      <p className="title">More Services</p>
      <div className="card-container">
        <div className="card">
          <div className="card-internal">
            <img src="/Logo/Icons/partner.svg" />
            <span className="card-details">
              {capitalizeWord(Config.APP_NAME)} partners
            </span>
          </div>
        </div>
        <Divider className="divider" type="vertical" />
        <div className="card">
          <div className="card-internal">
            <img src="/Logo/Icons/help.svg" />
            <span className="card-details">Help Centers</span>
          </div>
        </div>
      </div>
    </StyledMoreServices>
  );
};

export default MoreServices;
