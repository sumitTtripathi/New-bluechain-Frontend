import styled, { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

// Global styled-components configuration
export const GlobalStyleConfig = {
  shouldForwardProp: (prop) => {
    const invalidProps = [
      'currentTheme',
      'location',
      'theme',
      'currentTheme',
      'currentTheme',
      'currentTheme',
      'currentTheme'
    ];
    return isPropValid(prop) && !invalidProps.includes(prop);
  }
};

// Helper component for wrapping styled-components
export const StyledWrapper = ({ children }) => (
  <StyleSheetManager shouldForwardProp={GlobalStyleConfig.shouldForwardProp}>
    {children}
  </StyleSheetManager>
);
