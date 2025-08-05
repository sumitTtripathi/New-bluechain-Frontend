// const { useEffect } = require("react");

// // Hook for scrolling to top
// export const useScrollTop = () => {
//   useEffect(() => {
//     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//   }, []);
// };



import { useEffect } from "react";

// Hook for scrolling to top
export const useScrollTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
};
