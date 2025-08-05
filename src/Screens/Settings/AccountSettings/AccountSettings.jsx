import { Button, Card, Col, Row, Switch } from "antd";
import { AccountSettingsContainer } from "../Settings.styles";
import { ROUTES } from "../../../Constants/Routes";
import { useNavigate } from "react-router";
import LoginStatusManagement from "./Components/LoginStatusManagement/LoginStatusManagement";
import LoginHistory from "./Components/LoginHistory/LoginHistory";
import { useScrollTop } from "../../../Hooks/useScrollTop";
import { useRef, useState } from "react";
import {
  useFreezeAccountMutation,
  useGetUserQuery,
} from "../../../Services/Auth";
import VerifyTotp from "./Components/VerifyTotp/VerifyTotp";
import FadeLoader from "../../../Components/FadeLoader/FadeLoader";
import BindMobile from "../../../Components/BindMobile/BindMobile";
import BindTotp from "../../../Components/BindTotp/BindTotp";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from "moment";
import { EditIcon } from "../../../Components/Icons/Icons";
import { capitalizeWord } from "../../../Utils/common";

const AccountSettings = () => {
  const navigate = useNavigate();
  const bindMobileRef = useRef();
  const [isVerifyTotpModal, setIsVerifyTotpModal] = useState(false);

  const bindTotpRef = useRef();
  const [freezeAccount, { isLoading: freezeAccountLoading }] =
    useFreezeAccountMutation();
  const token = useSelector((state) => state.global.token);
  const { data: user, isLoading: userDetailsLoading } = useGetUserQuery(
    {},
    { skip: !token }
  );
  const handleOk = () => {
    setIsVerifyTotpModal(false);
  };
  const handleCancel = () => {
    setIsVerifyTotpModal(false);
  };
  useScrollTop();
  return (
    <AccountSettingsContainer>
      {userDetailsLoading && <FadeLoader />}
      <div className="profile-container">
        <img src="/Logo/Icons/profilepicture.svg" alt="profile" />
        <div className="user-details">
          <div className="user-details-inner">
            <p className="username">{capitalizeWord(user?.user?.email)}</p>
            <span><EditIcon /></span>
          </div>
          <div>
            <label className="label">Email : </label>
            <span className="value">{user?.user?.email}</span>
          </div>
        </div>
        {/* <img className="edit-icon" src="/Logo/Icons/edit.svg" alt="edit" /> */}
      </div>
      <div className="settings-main">
        {/* Account Verification Settings */}
        <p className="title">Account Verification</p>
        <div className="settings">
          <div className="single-setting">
            <div className="label-container">
              <img src="/Logo/Icons/mail.svg" className="mail_icon" alt="mail" />
              <label>Email</label>
            </div>
            <div className="label-container">
              <img src="/Logo/Icons/tick.svg" alt="tick" />
              <span>{user?.user?.email}</span>
            </div>
            <div className="label-container">
              <Button
                disabled
                className="change-btn"
              >
                Change
              </Button>
            </div>
          </div>
          {/* <div className="single-setting">
            <div className="label-container">
              <img src="/Logo/Icons/phone.svg" alt="mail" />
              <label>Mobile</label>
            </div>
            <div className="label-container">
              {user?.user?.phone_flag ? (
                <>
                  <img src="/Logo/Icons/tick.svg" alt="tick" />
                  <span>{user?.user?.phone_number}</span>
                </>
              ) : (
                <>
                  <img src="/Logo/Icons/disable-tick.svg" alt="tick" />
                  <span>Unbound</span>
                </>
              )}
            </div>
            <div className="label-container">
              <Button
                onClick={() => {
                  bindMobileRef?.current?.showModal();
                }}
                className="change-btn"
              >
                {user?.user?.phone_number ? "Change" : "Bind"}
              </Button>
              <BindMobile ref={bindMobileRef} />
            </div>
          </div> */}
          <div className="single-setting">
            <div className="label-container">
              <img src="/Logo/Icons/google.svg" alt="mail" />
              <label>TOTP</label>
            </div>
            <div className="label-container">
              {user?.user?.totp_flag ? (
                <>
                  <img src="/Logo/Icons/tick.svg" alt="tick" />
                  <span>Set</span>
                </>
              ) : (
                <>
                  <img src="/Logo/Icons/disable-tick.svg" alt="tick" />
                  <span>Unbound</span>
                </>
              )}
            </div>
            <div className="label-container">
              {user?.user?.totp_flag ? (
                <>
                  <Switch
                    defaultChecked={user?.user?.totp_flag}
                    checked={user?.user?.totp_flag}
                    onChange={() => setIsVerifyTotpModal(true)}
                  />
                  <VerifyTotp
                    isModalOpen={isVerifyTotpModal}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                  />
                </>
              ) : (
                <Button
                  onClick={() => {
                    bindTotpRef?.current?.showModal();
                  }}
                  className="change-btn"
                >
                  Bind
                </Button>
              )}

              <BindTotp ref={bindTotpRef} />
            </div>
          </div>
        </div>
        {/* Advance Settings */}
        <p className="title">Advanced Settings</p>
        <Row gutter={[22, 22]}>
          <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }} span={12}>
            <Card className="settings-card">
              <img src="/Logo/Icons/resetlock.svg" alt="reset-lock" />
              <p className="card-title">Password</p>
              <p className="card-label">For login password management</p>
              <Row align="middle" className="my-flex" justify="space-between">
                <Col>
                  <Button
                    onClick={() => navigate(ROUTES.RESETPASSWORD)}
                    className="account-manage-btn"
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }} span={12}>
            <Card className="settings-card">
              <img src="/Logo/Icons/blockuser.svg" alt="reset-lock" />
              <p className="card-title">Account Management</p>
              {/* <p className="card-label">Freeze or delete account</p> */}
              <Row className="my-flex" gutter={48}>
                <Col>
                  <Button
                    loading={freezeAccountLoading}
                    onClick={async () => {
                      if (user?.user?.acc_freeze) {
                        const response = await freezeAccount(
                          user?.user?.email
                        ).unwrap();
                        toast.success(response?.message);
                      } else navigate(`${ROUTES.FORBID.replace("basic/", "")}`);
                    }}
                    className="account-manage-btn"
                  >
                    {user?.user?.acc_freeze ? "Unfreeze" : "Freeze"}
                  </Button>
                </Col>
                {/* <Col>
                  <Button
                    onClick={() =>
                      navigate(`${ROUTES.CANCEL.replace("basic/", "")}`)
                    }
                    className="account-manage-btn"
                  >
                    Delete
                  </Button>
                </Col> */}
              </Row>
            </Card>
          </Col>
        </Row>
        <LoginStatusManagement />
        <LoginHistory />
      </div>
    </AccountSettingsContainer>
  );
};

export default AccountSettings;
