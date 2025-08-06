// Helper function to filter props for styled-components
export const shouldForwardProp = (prop) => {
  // List of props that should NOT be forwarded to DOM
  const invalidProps = [
    'currentTheme',
    'location',
    'currentTheme',
    'theme',
    'currentTheme',
    'currentTheme',
    'currentTheme',
    'currentTheme'
  ];
  return !invalidProps.includes(prop);
};

// Alternative: Use transient props with $ prefix
export const transientProp = (prop) => `$${prop}`;
