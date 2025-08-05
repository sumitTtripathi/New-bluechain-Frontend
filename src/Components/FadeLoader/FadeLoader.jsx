import { Spin } from "antd";
import { StyledFadeLoader } from "./FadeLoader.styles";

// Used this loader while fetching data from API
const FadeLoader = ({ tip }) => {
  return (
    <StyledFadeLoader>
      <Spin size="large" tip={tip} />
    </StyledFadeLoader>
  );
};

export default FadeLoader;
