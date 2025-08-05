import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const StyledNavbar = styled.div`
  height: 80px;
  background: ${(props) =>
    ["/"].includes(props.location.pathname)
      ? props.theme.colors.blue.extraDark
      : props.theme.colors.blue.extraLight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  .app-logo {
    height: 40px;
    cursor: pointer;
    width: 119px;
  }
  .logo-menu-container {
    display: flex;
    gap: 56px;
    align-items: center;
  }

  .right {
    display: flex;
    gap: 25px;
    align-items: center;
    .nav-dropdowns {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      span {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.text};
        line-height: ${(props) => props.theme.typography.text2};
        color: ${(props) => props.theme.colors.black};
      }
      svg {
        color: ${(props) => props.theme.colors.black};
      }
    }

    /* Making Right side of navbar hidden for max width 1200px */
    @media (${deviceQuery.laptopL}) {
      display: none;
bb    }
  }

  .antd-menu {
    display: inline-block;
    width: 80%;
    min-width: 200px;
  }
  .drawer-icon {
    display: none;
  }
  /* Making Menu Items of navbar hidden for max width 1200px */
  @media (${deviceQuery.laptopL}) {
    .antd-menu {
      display: none;
      visibility: hidden;
    }
    .drawer-icon {
      display: block;
    }
  }
`;

export const StyledMenu = styled(Menu)`
  background: transparent;

  &.ant-menu-horizontal > .ant-menu-item::after,
  &.ant-menu-horizontal > .ant-menu-submenu::after {
    border-bottom: none !important;
    transition: none !important;
  }
  &.ant-menu-horizontal {
    border-bottom: 0;
  }
  &.active {
    color: ${(props) => props.theme.colors.blue.dark} !important;
  }
`;

export const StyledNavlink = styled(NavLink)`
  color: ${(props) =>
    props.color
      ? props.theme.colors.blue.dark
      : props.theme.colors.black} !important;
  text-decoration: none;
  font-weight: ${(props) => props.theme.fontWeight.semiLight};
  font-size: ${(props) => props.theme.typography.text};
  line-height: ${(props) => props.theme.typography.text2};

  &.active {
    color: ${(props) => props.theme.colors.blue.dark} !important;
  }
  &.signup-button {
    background: ${(props) => props.theme.colors.blue.dark};
    padding: 8px 21px;
    border-radius: 4px;
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text2};
    color: ${(props) => props.theme.colors.whiteOnly} !important;
  }
  &.signup-button.active {
    color: ${(props) => props.theme.colors.whiteOnly} !important;
  }
`;
