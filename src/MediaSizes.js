export const sizeNumbers = {
  mobileXS: 320,
  mobileS: 380,
  mobileSMT: 393,
  mobileMS: 425,
  mobileMSN: 435,
  mobileM: 480,
  mobileSM: 575, // small
  mobileL: 600,
  tabletS: 650,
  tabletMS: 700,
  tabletM: 767, // medium
  tabletL: 900,
  laptopS: 996, // large
  laptopM: 1024,
  laptopL: 1200, // extra large
  desktopS: 1300,
  customDesktopS: 1320,
  desktop: 1400, // extra extra large
  desktopL: 1600,
};

export const size = {
  mobileXS: `${sizeNumbers.mobileXS}px`,
  mobileS: `${sizeNumbers.mobileS}px`,
  mobileSMT: `${sizeNumbers.mobileSMT}px`,
  mobileM: `${sizeNumbers.mobileM}px`,
  mobileMS: `${sizeNumbers.mobileMS}px`,
  mobileMSN: `${sizeNumbers.mobileMSN}px`,
  mobileSM: `${sizeNumbers.mobileSM}px`,
  mobileL: `${sizeNumbers.mobileL}px`,
  tabletS: `${sizeNumbers.tabletS}px`,
  tabletMS: `${sizeNumbers.tabletMS}px`,
  tabletM: `${sizeNumbers.tabletM}px`,
  tabletL: `${sizeNumbers.tabletL}px`,
  laptopS: `${sizeNumbers.laptopS}px`,
  laptopM: `${sizeNumbers.laptopM}px`,
  laptopL: `${sizeNumbers.laptopL}px`,
  desktopS: `${sizeNumbers.desktopS}px`,
  customDesktopS: `${sizeNumbers.customDesktopS}px`,
  desktop: `${sizeNumbers.desktop}px`,
  desktopL: `${sizeNumbers.desktopL}px`,
};

export const deviceQuery = {
  mobileXS: `(max-width: ${size.mobileXS})`,
  mobileS: `(max-width: ${size.mobileS})`,
  mobileSMT: `(max-width: ${size.mobileSMT})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileMS: `(max-width: ${size.mobileMS})`,
  mobileMSN: `(max-width: ${size.mobileMSN})`,
  mobileSM: `(max-width: ${size.mobileSM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tabletS: `(max-width: ${size.tabletS})`,
  tabletMS: `(max-width: ${size.tabletMS})`,
  tabletM: `(max-width: ${size.tabletM})`,
  tabletL: `(max-width: ${size.tabletL})`,
  laptopS: `(max-width: ${size.laptopS})`,
  laptopM: `(max-width: ${size.laptopM})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktopS: `(max-width: ${size.desktopS})`,
  customDesktopS: `(max-width: ${size.customDesktopS})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktopL})`,
};
