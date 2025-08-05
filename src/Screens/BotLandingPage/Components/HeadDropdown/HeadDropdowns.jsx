/* eslint-disable */

// import logo from "./logo.svg";
// import "./App.css";
import "antd/dist/reset.css";
const HeadDropdowns = ({ menu, setOpen }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        textAlign: "center",
      }}
    >
      {menu?.map((item) => {
        return (
          <div style={{ cursor: "pointer" }}>
            {item?.icon}
            <span
              onClick={() => {
                setOpen(false);
              }}
            >
              {item?.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default HeadDropdowns;
