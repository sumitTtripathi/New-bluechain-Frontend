import { useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { AppRoutes } from "./Rotes/AppRoutes";
import { ROUTES } from "./Constants/Routes";
import { theme } from "./Theme";
import { ThemeProvider } from "styled-components";
import { createContext, useEffect, useMemo, useState } from "react";
import { CookiesProvider } from "react-cookie";
import { StyledToastContainer } from "./GlobalStyles";
import "react-toastify/dist/ReactToastify.css";
import { setThemeValue, setToken } from "./Services/Auth";
import { useDispatch } from "react-redux";
import CustomRedirect from "./Components/CustomRedirect/CustomRedirect";
import { DefaultSymbol } from "./Constants/state";
import Footer from "./Components/Footer/Footer";
export const ThemeContext = createContext();

function App() {
  const [cookies, setCookie] = useState(localStorage.getItem("theme"));
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setThemeValue(cookies));
  }, [cookies, dispatch]);

  useEffect(() => {
    if (!cookies) {
      localStorage.setItem("theme", "dark");
      dispatch(setThemeValue("dark"));
      setCookie("dark");
    }
    if (localStorage.getItem("token")) {
      dispatch(setToken({ token: JSON.parse(localStorage.getItem("token")) }));
    }
  }, [dispatch]);

  const themeContextValue = useMemo(
    () => ({ currentTheme, setCurrentTheme }),
    [currentTheme, setCurrentTheme]
  );
  return (
    <CookiesProvider>
      <ThemeContext.Provider value={themeContextValue}>
       
        <ThemeProvider
          theme={currentTheme === "light" ? theme.light : theme.dark}
        >
          <div
            className="App"
            style={{
              background:
                currentTheme === "light"
                  ? theme.light.colors.white
                  : theme.dark.colors.white,
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CustomRedirect
              path={[ROUTES.SPOT]}
              redirectUrl={`${ROUTES.SPOT}/${DefaultSymbol}`}
            />
            {/* Toaster Component */}
            <StyledToastContainer />
            <Navbar />
            {/* Routes of app*/}
            <AppRoutes style={{ flex: "1" }} />

            {!(
              location.pathname?.split("/")?.[1] ===
                ROUTES.LOGIN?.split("/")?.[1] ||
              location.pathname?.split("/")?.[1] ===
                ROUTES.SIGNUP?.split("/")?.[1] ||
              location.pathname?.split("/")?.[1] ===
                ROUTES.RESETPASSWORD?.split("/")?.[1]
            ) && <Footer />}
          </div>
        </ThemeProvider>
      </ThemeContext.Provider>
    </CookiesProvider>
  );
}

export default App;