import { memo } from "react";
import { useNavigate } from "react-router";
import { StyledMenuFilters } from "../../Screens/SpotStrategy/Spot.styles";

const TradeType = ({ keyValue, filterTrade }) => {
  const navigate = useNavigate();

  const items = (filterTabItems) => {
    return filterTabItems?.map((item) => {
      return {
        label: (
          <span
            onClick={() => {
              sessionStorage.setItem("tradeType", item.label);
              navigate(item?.key);
            }}
            className="menu-item"
          >
            {item?.label}
          </span>
        ),
        key: item?.key,
      };
    });
  };
  return (
    <>
      <StyledMenuFilters
        defaultSelectedKeys={keyValue}
        mode="horizontal"
        items={items(filterTrade)}
      />
    </>
  );
};

export default memo(TradeType);
