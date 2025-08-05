import { Breadcrumb, Button, Card } from "antd";
import { AccountSettingsContainer } from "../../Settings.styles";
import { useScrollTop } from "../../../../Hooks/useScrollTop";
import { useNavigate } from "react-router";
import { config } from "../../../../config";

const DeleteAccount = () => {
  const navigate = useNavigate();
  useScrollTop();
  return (
    <AccountSettingsContainer>
      <Breadcrumb separator=">">
        <Breadcrumb.Item onClick={() => navigate(-1)}>
          <img src="/Logo/Icons/user.svg" />
          Account Settings
        </Breadcrumb.Item>
        <Breadcrumb.Item>Delete Account</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <img src="/Logo/Icons/freezeAccount.svg" alt="freeze" />
        <div className="terms-list">
          <p className="freeze-title">Important Reminder</p>
          <p className="details">
            After applying for account deletion, the ID information, transaction
            records and other related data in the current account will be
            permanently deleted by the system and cannot be retrieved, and{" "}
            {config.APP_NAME} will no longer provide any services to this
            account.
          </p>
          <div className="delete-account">
            <label>Delete Account :</label>
            <span>pratham.jain@oodles.io</span>
          </div>
          <p>Reminder:</p>
          <p className="disclaimer">
            1. Please understand that your application for bulechain account
            deletion is irrevocable once submitted.
          </p>
          <p className="disclaimer">
            2. If there is any deposit or withdrawal in progress or uncredited,
            please DO NOT apply for account deletion, otherwise these assets
            will not be recovered.
          </p>

          <Button size="large" className="confirm-btn">
            Apply for deletion
          </Button>
        </div>
      </Card>
    </AccountSettingsContainer>
  );
};

export default DeleteAccount;
