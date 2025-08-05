import { useNavigate } from "react-router";
import { Config } from "../../Config";
import { StyledMenu } from "../Navbar/Navbar.styles";
import { StyledCustomDrawer } from "./CustomDrawer.styles";
import { AiOutlineClose } from "react-icons/ai";
import { ROUTES } from "../../Constants/Routes";
import { Button, Collapse } from "antd";
import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTheme } from "styled-components";
import AccountDropdown from "../AccountDropdown/AccountDropdown";
import { useDispatch, useSelector } from "react-redux";
import { MdLightMode } from "react-icons/md";
import { FiMoon } from "react-icons/fi";
import { useOnClickOutside } from "../../Hooks/useOutsideClick";
import { ThemeContext } from "../../App";
import { setThemeValue } from "../../Services/Auth";

// Side Drawer for small screen devices
const CustomDrawer = forwardRef(({ placement, items }, ref) => {
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);
  const [showDrawer, setShowDrawer] = useState(false);
  const [menuKey, setMenuKey] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();
  const token = useSelector((state) => state.global.token);
  const accountDropdownRef = useRef();
  const onOpenDrawer = () => {
    setShowDrawer(true);
  };
  const SPOTITEMS = [
    {
      key: "1",
      label: "Asset",
      children: (
        <div>
          <p
            onClick={() => {
              navigate("/asset/spot");
              onCloseDrawer();
            }}
          >
            Spot
          </p>
          <p
            onClick={() => {
              navigate("/asset/withdraw");
              onCloseDrawer();
            }}
          >
            Withdraw
          </p>
          <p
            onClick={() => {
              navigate("/asset/Deposit");
              onCloseDrawer();
            }}
          >
            Deposit
          </p>
        </div>
      ),
    },
  ];
  const MENUITEMS = [
    {
      key: "1",
      label: "Accounts",
      children: (
        <AccountDropdown
          setMenuKey={setMenuKey}
          setIsModalOpen={() => {}}
          setShowDrawer={setShowDrawer}
          ref={accountDropdownRef}
        />
      ),
    },
  ];
  const ORDERITEMS = [
    {
      key: "1",
      label: "Orders",
      children: (
        <div>
          <p
            onClick={() => {
              navigate("/spot/current");
              onCloseDrawer();
            }}
          >
            Spot Orders
          </p>
        </div>
      ),
    },
  ];
  // Adding OpenDrawer function to passed ref
  useImperativeHandle(ref, () => {
    return (ref.current = { onOpenDrawer: onOpenDrawer });
  });
  const onCloseDrawer = function () {
    setShowDrawer(false);
  };

  useOnClickOutside(accountDropdownRef, () => {
    setMenuKey("2");
  });
  return (
    <StyledCustomDrawer
      height="100%"
      placement={placement}
      closable={false}
      onClose={onCloseDrawer}
      open={showDrawer}
      key={placement}
    >
      <div className="drawer-header">
        {Config.APP_LOGO({
          onClick: () => {
            navigate(ROUTES.HOME);
            onCloseDrawer();
          },
          alt: "app-logo",
          className: "app-logo",
          fillRest: theme.colors.black,
        })}

        <AiOutlineClose
          style={{ cursor: "pointer" }}
          onClick={onCloseDrawer}
          size={25}
          color={theme.colors.black}
        />
      </div>
      <StyledMenu
        onClick={onCloseDrawer}
        color="white"
        mode="vertical"
        items={items}
      />
      <div
        style={{ cursor: "pointer", padding: "0px 18px" }}
        onClick={() => {
          if (themeContext?.currentTheme === "light") {
            themeContext?.setCurrentTheme("dark");
            localStorage.setItem("theme", "dark");
            dispatch(setThemeValue("dark"));
          } else {
            themeContext?.setCurrentTheme("light");
            localStorage.setItem("theme", "light");
            dispatch(setThemeValue("light"));
          }
        }}
      >
        {themeContext?.currentTheme === "light" ? (
          <FiMoon size={20} strokeWidth={1} color={theme.colors.black} />
        ) : (
          <MdLightMode size={20} color={theme.colors.black} />
        )}
      </div>
      {token?.length > 0 ? (
        <div className="dropdown-container">
          <div
            onClick={() => {
              onCloseDrawer();
              navigate(ROUTES.CURRENTSPOT);
            }}
            style={{ color: theme.colors.black }}
          >
            Orders
          </div>
          <Collapse className="my-collapse" items={SPOTITEMS} />
          <Collapse
            activeKey={menuKey}
            className="my-collapse"
            items={MENUITEMS}
            onChange={() => {
              setMenuKey((prevState) => (prevState === "1" ? "2" : "1"));
            }}
          />
        </div>
      ) : (
        <>
          <div className="button-container">
            <Button
              onClick={() => {
                navigate(ROUTES.LOGIN);
                onCloseDrawer();
              }}
              className="button"
            >
              Log In
            </Button>
            <Button
              onClick={() => {
                navigate(ROUTES.SIGNUP);
                onCloseDrawer();
              }}
              type="primary"
              className="button"
            >
              SignUp
            </Button>
          </div>
        </>
      )}
    </StyledCustomDrawer>
  );
});

CustomDrawer.displayName = "CustomDrawer";

export default CustomDrawer;
