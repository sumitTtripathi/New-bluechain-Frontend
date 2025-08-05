import React from "react";
import { CardDetail, CardDetailContainer, SpotCard } from "./SelectBot.style";
import { BiChevronRight } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setBotOptions } from "../../Services/Auth";
import { useNavigate } from "react-router";

const SelectBot = ({ url, imgPath, tradeType, desc, item, setActiveTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <SpotCard
      onClick={() => {
        dispatch(setBotOptions(item));
        setActiveTab("2");
        localStorage.setItem("botOption", JSON.stringify(item));
        navigate(url);
      }}
    >
      <CardDetailContainer>
        <div>
          <img src={imgPath} alt="icon" />
        </div>
        <CardDetail>
          <div className="font-bold font-blue">{tradeType}</div>
          <div className="font-grey">{desc}</div>
        </CardDetail>
      </CardDetailContainer>
      <BiChevronRight className="font-blue" fontSize={40} />
    </SpotCard>
  );
};

export default SelectBot;
