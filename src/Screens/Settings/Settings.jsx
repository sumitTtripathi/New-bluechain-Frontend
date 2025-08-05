import { Button } from "antd";
import { SettingsContainer } from "./Settings.styles";
import { FaUserAlt } from "react-icons/fa";
import { BsHexagonFill } from "react-icons/bs";
import { Outlet, useLocation, useNavigate } from "react-router";
import { ROUTES } from "../../Constants/Routes";
import { Helmet } from "react-helmet";
import { config } from "../../config";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SettingsContainer>
      <div className="settings-change-container">
        <Helmet>
          <title>{config?.APP_NAME}</title>
        </Helmet>
        <Button
          onClick={() =>
            navigate(`${ROUTES.SETTINGS}/${ROUTES.ACCOUNTSETTINGS}`)
          }
          // size="large"
          icon={<FaUserAlt />}
          className={`settings-btn ${
            location.pathname.split("/").includes("basic") && "active"
          }`}
        >
          Account Settings
        </Button>
        <Button
          icon={<BsHexagonFill />}
          onClick={() =>
            navigate(`${ROUTES.SETTINGS}/${ROUTES.PREFERENCESETTINGS}`)
          }
          // size="large"
          className={`settings-btn ${
            location.pathname.split("/").includes("preference") && "active"
          }`}
        >
          Preference Settings
        </Button>
      </div>
      <div className="outlet-container">
        <Outlet />
      </div>
    </SettingsContainer>
  );
};

export default Settings;
