/* eslint-disable */
import { FaUserAlt } from "react-icons/fa";
import { ProfilePicture } from "../../Assets/Svg/ProfilePicture";
import { StyledAccountContainer } from "./AccountDropdown.styles";
import { BsHexagonFill } from "react-icons/bs";
import { Divider } from "antd";
import { Logout } from "../../Assets/Svg/Logout";
import { useNavigate } from "react-router";
import { ROUTES } from "../../Constants/Routes";
import { useDispatch, useSelector } from "react-redux";
import {
  setToken,
  setUser,
  useGetUserQuery,
  useLogoutMutation,
} from "../../Services/Auth";
import { toast } from "react-toastify";
import { useTheme } from "styled-components";
import { useCookies } from "react-cookie";
import { forwardRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AccountDropdown = forwardRef(
  ({ setIsModalOpen, setShowDrawer, setMenuKey }, ref) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const token = useSelector((state) => state.global.token);
    const [logout] = useLogoutMutation();
    const { data: user } = useGetUserQuery({}, { skip: !token });
    const dispatch = useDispatch();
    const [, , removeCookie] = useCookies(["token"]);
    const mouseLeave = () => {
      setMenuKey("2");
      setIsModalOpen(false);
    };
    const blurHandler = () => {
      setMenuKey("2");
      setIsModalOpen(false);
    };
    return (
      <StyledAccountContainer
        ref={ref}
        onMouseLeave={mouseLeave}
        onBlur={blurHandler}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0px 10px",
            height: "30px",
          }}
        >
          <AiOutlineClose
            style={{ cursor: "pointer" }}
            onClick={() => {
              setMenuKey((prevState) => (prevState === "1" ? "2" : "1"));
              setIsModalOpen(false);
            }}
            size={20}
            color={theme.colors.black}
          />
        </div>
        <ProfilePicture height={43} width={43} className="profile-picture" />
        <div className="account-name">
          <p>{user?.user?.email}</p>
        </div>
        <div className="menu-items">
          <div
            onClick={() => {
              setMenuKey("2");
              setIsModalOpen(false);
              setShowDrawer?.(false);
              navigate(`${ROUTES.SETTINGS}/${ROUTES.ACCOUNTSETTINGS}`);
            }}
            className="single-menu"
          >
            <FaUserAlt />
            <span>Account Settings</span>
          </div>
          <div
            onClick={() => {
              setMenuKey("2");
              setIsModalOpen(false);
              setShowDrawer?.(false);
              navigate(`${ROUTES.SETTINGS}/${ROUTES.PREFERENCESETTINGS}`);
            }}
            className="single-menu"
          >
            <BsHexagonFill />
            <span>Preferences Settings</span>
          </div>
          <Divider className="account-divider" />
          <div
            onClick={async () => {
              try {
                // const ipResponse = await getIp().unwrap();
                const response = await logout({
                  // ip: ipResponse?.query,
                  ip: "223.190.86.207",
                  // email: user?.user?.email,
                });
                navigate(ROUTES.LOGIN);
                toast.success(response?.data?.message);
                removeCookie("token");
                localStorage.removeItem("token");
                localStorage.removeItem("email");
                setMenuKey("2");
                setIsModalOpen(false);
                dispatch(setUser({ user: {} }));
                dispatch(setToken({ token: "" }));
              } catch (error) {
                toast.error(error?.data?.message);
              }
            }}
            className="single-menu"
          >
            <Logout />
            <span>Logout</span>
          </div>
        </div>
      </StyledAccountContainer>
    );
  }
);

AccountDropdown.displayName = "AccountDropdown";

export default AccountDropdown;
