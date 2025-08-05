import { useTranslation } from "react-i18next";
import { Config } from "../../Config";
import { StyledFooter } from "./Footer.styles";
import { memo, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { useGetMarketCardsQuery } from "../../Services/Market";
import moment from "moment";
import { useNavigate } from "react-router";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD HH:mm:ss"));
  const [skipStatus, setSkipStatus] = useState(true);
  const { data: marketCardsData } = useGetMarketCardsQuery(undefined, {
    skip: skipStatus,
  });
  useEffect(() => {
    setInterval(() => {
      setDate(moment().format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);
    setTimeout(() => {
      setSkipStatus(false);
    }, 1000);
  }, []);
  return (
    <StyledFooter>
      <div className="main-footer">
        <div className="left">
          {Config.APP_LOGO({
            alt: "app-logo",
            className: "logo",
            fillRest: theme.colors.black,
          })}
          <p className="desc">{t("Making Crypto Trading Easier")}</p>
          <div className="social-container">
            <img
              className="social-icon"
              src={"/Logo/Social/mail.svg"}
              alt="mail"
            />
            <img
              className="social-icon"
              src={"/Logo/Social/twitter.svg"}
              alt="twitter"
            />
            <img
              className="social-icon"
              src={"/Logo/Social/youtube.svg"}
              alt="youtube"
            />
          </div>
          <p className="desc copyright">
            {t(`©2023 ${Config.APP_NAME}.com. All rights reserved.`)}
          </p>
        </div>
        <div className="right">
          <div
            className="link-column"
            onClick={() => {
              navigate("/about");
            }}
          >
            <span className="title">About</span>
            <span style={{ cursor: "pointer" }}>About us</span>
          </div>
        </div>
      </div>
      <div className="footer-line">
        <span>{t(date)}</span>
        <span>{t(`24H value: ${marketCardsData?.data?.fourthCard}`)}</span>
      </div>
    </StyledFooter>
  );
};

export default memo(Footer);
