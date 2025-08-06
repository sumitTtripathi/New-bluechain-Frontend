import styled from 'styled-components';

// Wrapper component to handle styled-components prop filtering
export const withStyledProps = (Component) => {
  return styled(Component).withConfig({
    shouldForwardProp: (prop) => 
      !['currentTheme', 'location', 'currenttheme'].includes(prop),
  })``;
};

// Helper function to create styled components with proper prop filtering
export const createStyledComponent = (tag, styles) => {
  return styled(tag).withConfig({
    shouldForwardProp: (prop) => 
      !['currentTheme', 'location', 'currenttheme'].includes(prop),
  })(styles);
};

// Utility function to filter props for styled components
export const filterStyledProps = (props) => {
  const { currentTheme, location, currenttheme, ...filteredProps } = props;
  return filteredProps;
};
