import { Breadcrumb, Button, Card, Checkbox, Form } from "antd";
import { AccountSettingsContainer } from "../../Settings.styles";
import { useScrollTop } from "../../../../Hooks/useScrollTop";
import { useNavigate } from "react-router";
import {
  useFreezeAccountMutation,
  useGetUserQuery,
} from "../../../../Services/Auth";
import { VALIDATIONS } from "../../../../Constants/Validations";
import { toast } from "react-toastify";
import { ROUTES } from "../../../../Constants/Routes";
import { useSelector } from "react-redux";

const FreezeAccount = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.global.token);
  const { data: user } = useGetUserQuery(
    {},
    {
      skip: !token,
    }
  );
  const [freezeAccount, { isLoading: freezeAccountLoading }] =
    useFreezeAccountMutation();

  const handleFreeze = async () => {
    try {
      const response = await freezeAccount(user?.user?.email).unwrap();
      toast.success(response?.message);
      navigate(`${ROUTES.SETTINGS}/${ROUTES.ACCOUNTSETTINGS}`);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  useScrollTop();
  return (
    <AccountSettingsContainer>
      <Breadcrumb separator=">">
        <Breadcrumb.Item onClick={() => navigate(-1)}>
          <img src="/Logo/Icons/user.svg" />
          Account Settings
        </Breadcrumb.Item>
        <Breadcrumb.Item>Freeze Account</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <img src="/Logo/Icons/freezeAccount.svg" alt="freeze" />
        <div className="terms-list">
          <p className="freeze-title">Freeze Account</p>
          <div className="terms">
            <p>
              1. The trading, withdrawal and login services in this account will
              be prohibited.
            </p>
            <p>2. All API private keys in this account will be deleted.</p>
            <p>3. All pending withdrawal requests will be canceled.</p>
            <p>4. All unexecuted orders will be canceled.</p>
          </div>
          <p className="note">Note:</p>
          <p className="disclaimer">
            After verification, it takes 3 to 30 days to reactivate this
            account.
          </p>
          <Form
            name="freeze-form"
            validateTrigger={["onBlur", "onChange"]}
            onFinish={handleFreeze}
          >
            <Form.Item
              valuePropName="checked"
              rules={[
                {
                  validator: async (_, checked) => {
                    if (!checked) {
                      return Promise.reject(
                        new Error(VALIDATIONS.FREEZE_ACCOUNT)
                      );
                    }
                  },
                },
              ]}
              name="condition"
            >
              <Checkbox>
                I understand, agree and accept all consequences of the account
                freezing.
              </Checkbox>
            </Form.Item>
            <Button
              loading={freezeAccountLoading}
              htmlType="submit"
              size="large"
              className="confirm-btn"
            >
              Confirm
            </Button>
          </Form>
        </div>
      </Card>
    </AccountSettingsContainer>
  );
};

export default FreezeAccount;
