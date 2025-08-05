import Slider from "react-slick";
import styled from "styled-components";

const StyledSlider = styled(Slider)`
  .slick-dots { 
    bottom : -40px;
  }
  .slick-slide > div {
    margin: 0 10px;
  }
  .slick-list {
    margin: 0 -10px;
  }
      .slick-dots li {
    width: 30px;
    button {
      width: 30px;
      height: 6px;
      padding: 0;
      background: white;
      border-radius: 4px;
      &::before {
        display: none;
      }
    }
    &.slick-active {
    button {
      background: ${(props) => props.theme.colors.blue.dark};
    }
  }
  }
`;

// Custom carousel with custom settings acceptings and render function that returns jsx
const CustomCarousel = ({ style, settings, render }) => {
  return (
    <div style={style}>
      <StyledSlider {...settings}>{render()}</StyledSlider>
    </div>
  );
};

export default CustomCarousel;
