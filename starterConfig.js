// const starterConfig = {
//   REACT_APP_NAME: "Bitorio",
//   REACT_APP_LOGO: "/Logo/applogo.svg",
//   REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL,
//   REACT_APP_FAVICON: "/Logo/appicon.svg",
// };

// module.exports = starterConfig;



const starterConfig = {
  APP_NAME: "Bitorio",
  APP_LOGO: "/Logo/applogo.svg",
  BASE_URL: import.meta.env.VITE_BASE_URL,
  FAVICON: "/Logo/appicon.svg",
};

export default starterConfig;
