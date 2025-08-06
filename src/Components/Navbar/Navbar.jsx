import { StyledMenu, StyledNavbar, StyledNavlink } from "./Navbar.styles";
import { FiMoon } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { capitalizeWord } from "../../Utils/common";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router";
import CustomDrawer from "../CustomDrawer/CustomDrawer";
import { IoReorderThreeOutline } from "react-icons/io5";
import { ROUTES } from "../../Constants/Routes";
import { MdLightMode } from "react-icons/md";
import { Config } from "../../Config";
import { useTheme } from "styled-components";
import { Dropdown } from "antd";
import { BsChevronDown } from "react-icons/bs";
import AccountDropdown from "../AccountDropdown/AccountDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useOnClickOutside } from "../../Hooks/useOutsideClick";
import { checkIfLogin } from "../../Common/Common";
import { ThemeContext } from "../../App";
import { setBotOptions, setThemeValue } from "../../Services/Auth";

const ORDERITEMS = [
  { name: "Orders ", to: ROUTES.CURRENTSPOT },
  // { label: "Bot Orders", key: ROUTES.BOT_ORDER_HISTORY },
];
const SPOTITEMS = [
  { label: "Spot ", key: ROUTES.ASSET },
  { label: "Withdraw ", key: ROUTES.WITHDRAW },
  { label: "Deposit", key: ROUTES.DEPOSIT },
];

// Array of navbar menu
const NavMenuItems = [
  { name: "Market", to: ROUTES.MARKET },
  // { name: "Spot", to: `${ROUTES.SPOT}/BTC` },
    { name: "Spot", to: `` },
  { name: "Perpetual", to: `${ROUTES.PERPETUAL}/BTC` },
  // { name: "Trading Bot", to: ROUTES.BOT_LANDING },
    { name: "Trading Bot" },
];

// Links Array used in Navbar

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();
  const token = useSelector((state) => state.global.token);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Create this ref to pass in Custom Drawer
  const drawerRef = useRef();

  const accountDropdownRef = useRef();

  const setLanguage = useCallback((value) => {
    setSelectedLang(capitalizeWord(value));
    localStorage.setItem("language", value);
  }, []);
  // Using useTranslation for multi-language support
  const { i18n, t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("English");

  const items = (t) => {
    return NavMenuItems?.map((link) => {
      return {
        label: (
          <StyledNavlink
            onClick={() => {
              dispatch(setBotOptions(null));
              localStorage.removeItem("botOption");
            }}
            to={link?.to}
          >
            {t(link?.name)}
          </StyledNavlink>
        ),
        key: link?.to,
      };
    });
  };
  const getOrderLink = (t) => {
    return ORDERITEMS?.map((link) => {
      return {
        label: (
          <StyledNavlink
            onClick={() => {
              dispatch(setBotOptions(null));
              localStorage.removeItem("botOption");
            }}
            to={link?.to}
          >
            {t(link?.name)}
          </StyledNavlink>
        ),
        key: link?.to,
      };
    });
  };
  // Type of language which app supports.

  // Calling this function on language change
  const onLangChange = useCallback(
    (e) => {
      i18n.changeLanguage(e?.key);
      setLanguage(e?.domEvent?.currentTarget?.dataset?.label);
    },
    [i18n, setLanguage]
  );
  const langMenu = useMemo(
    () => [
      {
        key: "english",
        label: "English",
        "data-label": "English",
        onClick: onLangChange,
      },
    ],
    [onLangChange]
  );
  // Calling this useEffect to set language key in localStorage if it not exists
  useEffect(() => {
    if (!localStorage.getItem("language")) setLanguage("English");
  }, [setLanguage]);
  useOnClickOutside(accountDropdownRef, () => {
    setIsModalOpen(false);
  });

  const getAccountDropDown = useCallback(() => {
    return (
      <AccountDropdown
        setIsModalOpen={setIsModalOpen}
        setMenuKey={() => {}}
        ref={accountDropdownRef}
      />
    );
  }, []);

  return (
    <StyledNavbar location={location}>
      <div className="logo-menu-container">
        {Config.APP_LOGO({
          onClick: () => navigate("/"),
          alt: "app-logo",
          className: "app-logo",
          fillRest: theme.colors.black,
        })}

        <div className="antd-menu">
          <StyledMenu mode="horizontal" items={items(t)} />
        </div>
      </div>
      <div className="right">
        {checkIfLogin() && token ? (
          <>
            <a className="nav-dropdowns">
              <StyledMenu mode="horizontal" items={getOrderLink(t)} />
            </a>
            <Dropdown
              menu={{
                onClick: (item) => {
                  navigate(item?.key);
                },
                items: SPOTITEMS,
              }}
            >
              <a className="nav-dropdowns">
                <span>Assets</span>
                <BsChevronDown size={14} />
              </a>
            </Dropdown>
            <Dropdown
              placement="bottomLeft"
              open={isModalOpen}
              dropdownRender={getAccountDropDown}
            >
              <a onClick={() => setIsModalOpen(true)} className="nav-dropdowns">
                <span>Account</span>
                <BsChevronDown size={14} />
              </a>
            </Dropdown>
          </>
        ) : (
          <>
            <StyledNavlink to={ROUTES.LOGIN}>{t("Log in")}</StyledNavlink>
            {/* <StyledNavlink to={ROUTES.SIGNUP} className="signup-button">
              {t("Sign Up")}
            </StyledNavlink> */}
          </>
        )}

        <div
          style={{ cursor: "pointer" }}
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

        <CustomDropdown
          items={langMenu}
          label={selectedLang}
          icon={<BiChevronDown />}
        />
      </div>
      <div className="drawer-icon">
        <IoReorderThreeOutline
          style={{ cursor: "pointer" }}
          color={theme.colors.black}
          onClick={drawerRef?.current?.onOpenDrawer}
          size={30}
        />
      </div>
      <CustomDrawer items={items(t)} ref={drawerRef} placement="top" />
    </StyledNavbar>
  );
};

export default Navbar;
