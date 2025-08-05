import { Spin } from "antd";
import { StyledLoader } from "./CustomLoader.styles";

// Custom Loader for showing when something is loading
const CustomLoader = ({ tip }) => {
  return (
    <StyledLoader>
      <Spin size="large" tip={tip} />
    </StyledLoader>
  );
};

export default CustomLoader;
