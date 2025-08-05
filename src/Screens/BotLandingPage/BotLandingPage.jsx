import { useTranslation } from "react-i18next";
import { useScrollTop } from "../../Hooks/useScrollTop";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ScoreCard from "./cards/ScoreCard";
import BotTabs from "./Tabs/BotTabs";
import BotMarketPlace from "./Components/BotMarketPlace/BotMarketPlace";
import {
  BotLandingPageContainer,
  ScoreCardContainer,
  StyledCardsContainer,
  StyledLandingPage,
} from "./BotLandingPage.styles";

const BotLandingPage = () => {
  // hook that automatic scroll to top
  useScrollTop();
  const [cookies] = useCookies(["theme"]);

  const { t } = useTranslation();
  const token = useSelector((state) => state.global.token);
  const navigate = useNavigate();

  return (
    <BotLandingPageContainer currentTheme={localStorage.getItem("theme")}>
      <StyledLandingPage>
        <h1 className="title main">Bitorio Trading Bots</h1>
        <p className="subtitle">
          Intelligent pre-built trading bot help you automate and earn around
          the clock
        </p>
        <ScoreCardContainer>
          <ScoreCard score="340,247" scoreTitle="Global bot traders" />
          <ScoreCard score="340,247" scoreTitle="Global bot traders" />
          <ScoreCard score="340,247" scoreTitle="Global bot traders" />
        </ScoreCardContainer>
      </StyledLandingPage>
      <StyledCardsContainer>
        <BotTabs />
      </StyledCardsContainer>
      <BotMarketPlace />
    </BotLandingPageContainer>
  );
};

export default BotLandingPage;
