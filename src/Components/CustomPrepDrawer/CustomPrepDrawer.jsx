import React from "react";
// import { useGetAccountLevelQuery } from "../../Services/Transaction";
import { StyledCustomPrepDrawer } from "./CustomPrepDrawer.styles";
import DrawerCard from "./DrawerCard";
import { RxCross2 } from "react-icons/rx";
import InnerAccountDrawer from "./Components/InnerAccountDrawer/InnerAccountDrawer";
import { setChildrenDrawer, setParentDrawer } from "../../Services/Auth";
import { useDispatch, useSelector } from "react-redux";
import { BiChevronLeft } from "react-icons/bi";

function CustomPrepDrawer() {
  const parentDrawer = useSelector((state) => state.global.parentDrawer);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setParentDrawer(false));
  };
  const showChildrenDrawer = () => {
    dispatch(setChildrenDrawer(true));
  };

  const simpleData = {
    img: "/Perp/Simple.svg",
    title: "Simple",
    subtitle: "Spot traders",
  };
  const singleMarginData = {
    img: "/Perp/Single.svg",
    title: "Single-currency margin",
    subtitle: "Non-professional traders",
  };
  const multiMarginData = {
    img: "/Perp/Multi.svg",
    title: "Multi-currency margin",
    subtitle: "Professional and API traders",
  };
  return (
    <StyledCustomPrepDrawer
      getContainer={(triggerNode) => triggerNode}
      closable={false}
      onClose={onClose}
      open={parentDrawer}
    >
      <div className="header-btn">
        <h2
          type="primary"
          className="account-btn"
          onClick={showChildrenDrawer}
          style={{ cursor: "pointer" }}
        >
          <BiChevronLeft />
          Select account mode
        </h2>
        <RxCross2 onClick={onClose} className="cursor" />
      </div>

      <div className="drawer-container">
        <DrawerCard data={simpleData} type={1} />
        <DrawerCard data={singleMarginData} type={2} />
        <DrawerCard data={multiMarginData} type={3} />
      </div>

      <InnerAccountDrawer />
    </StyledCustomPrepDrawer>
  );
}

export default CustomPrepDrawer;
