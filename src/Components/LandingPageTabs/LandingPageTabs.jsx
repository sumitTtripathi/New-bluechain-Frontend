import { capitalizeWord } from "../../Utils/common";
import { Config } from "../../Config";
import { StyledLandingPageTabs, StyledTabs } from "./LandingPageTabs.styles";

// Component for a single tab content
const TabContent = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        columnGap: "21px",
      }}
    >
      <div>
        <img style={{ width: "100%" }} src="/Logo/Icons/card.png" />
        <span className="details">
          How to deposit /withdraw on {Config.APP_NAME}
        </span>
      </div>
      <div>
        <img style={{ width: "100%" }} src="/Logo/Icons/wallet.png" />
        <span className="details">
          {capitalizeWord(Config.APP_NAME)} Spot trading guide
        </span>
      </div>
    </div>
  );
};

// Used in Landing Page
const LandingPageTabs = () => {
  return (
    <StyledLandingPageTabs>
      <p className="title">For Beginners</p>
      <p className="subtitle">Master the process of crypto exchange readily</p>
      <StyledTabs
        defaultActiveKey="1"
        items={[
          {
            label: `Basic`,
            key: "1",
            children: <TabContent />,
          },
          // {
          //   label: `Advanced`,
          //   key: "2",
          //   children: <TabContent />,
          // },
        ]}
      />
    </StyledLandingPageTabs>
  );
};

export default LandingPageTabs;
