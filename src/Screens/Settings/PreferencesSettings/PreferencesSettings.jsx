import { Select, Switch } from "antd";
import { PreferenceSettingsContainer } from "../Settings.styles";
import { useContext } from "react";
import { ThemeContext } from "../../../App";
import { setThemeValue } from "../../../Services/Auth";
import { useDispatch } from "react-redux";

const PreferenceSettings = () => {
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);
  return (
    <PreferenceSettingsContainer>
      <div className="settings-main">
        <p className="title">Preferences Settings</p>
        <div className="settings">
          <div className="single-setting">
            <div className="label-container">
              <img src="/Logo/Icons/currency.svg" />
              <label>Currency</label>
            </div>
            <Select
              defaultValue="USD"
              options={[
                {
                  value: "usd",
                  label: "USD",
                },
              ]}
            />
          </div>
          <div className="single-setting">
            <div className="label-container">
              <img src="/Logo/Icons/language.svg" />
              <label>Language</label>
            </div>
            <Select
              defaultValue="English"
              options={[
                {
                  value: "english",
                  label: "English",
                },
              ]}
            />
          </div>
          <div className="single-setting">
            <div className="label-container">
              <img src="/Logo/Icons/theme.svg" />
              <label>Dark Mode</label>
            </div>
            <Switch
              onChange={() => {
                if (themeContext?.currentTheme === "light") {
                  themeContext?.setCurrentTheme("dark");
                  localStorage.setItem("theme", "dark");
                  dispatch(setThemeValue("dark"));
                } else {
                  themeContext?.setCurrentTheme("light");
                  localStorage.setItem("theme", "light");
                  dispatch(setThemeValue("light"));
                }
              }}
              checked={themeContext?.currentTheme === "light"}
            />
          </div>
        </div>
      </div>
    </PreferenceSettingsContainer>
  );
};

export default PreferenceSettings;
