import { Button } from "antd";
import React, { useRef, useState } from "react";
import ButtonsHead from "../Common/ButtonsHead";
import { StyledOrderBots } from "./OrderBots.styles";
import { useNavigate } from "react-router";

import {
  useAmendGridBotMutation,
  useInstantOrderPlaceMutation,
} from "../../../Services/Bot";

import { OngoingBots } from "./Tabs/OngoingBots/OngoingBots";
import { BotHistory } from "./Tabs/BotHistory/BotHistory";

function OrderBots() {
  const [selectedFilter, setSelectedFilter] = useState("Ongoing");
  const [selectedAlgoOrder, setSelectedAlgoOrder] = useState("grid");

  const [amendGridBot] = useAmendGridBotMutation();
  const [instantOrderPlace] = useInstantOrderPlaceMutation();

  const onStartClick = async (row) => {
    try {
      const data = {
        algoId: row.algoId,
      };

      const response = await instantOrderPlace(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledOrderBots>
      <div className="filter-btn">
        <Button
          className={selectedFilter === "Ongoing" ? "active" : ""}
          size="medium"
          onClick={() => setSelectedFilter("Ongoing")}
        >
          Ongoing
        </Button>
        <Button
          className={selectedFilter === "History" ? "active" : ""}
          size="medium"
          onClick={() => setSelectedFilter("History")}
        >
          History
        </Button>
      </div>

      {selectedFilter === "Ongoing" ? (
        <OngoingBots
          selectedAlgoOrder={selectedAlgoOrder}
          setSelectedAlgoOrder={setSelectedAlgoOrder}
          setSelectedFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
        />
      ) : (
        <BotHistory
          setSelectedFilter={setSelectedFilter}
          selectedAlgoOrder={selectedAlgoOrder}
          setSelectedAlgoOrder={setSelectedAlgoOrder}
          selectedFilter={selectedFilter}
        />
      )}
    </StyledOrderBots>
  );
}

export default OrderBots;
