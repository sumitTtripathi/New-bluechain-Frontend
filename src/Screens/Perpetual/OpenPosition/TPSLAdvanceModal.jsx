/* eslint-disable */
import { TAB_OPTION } from "../../../Constants/state";
import { useGetMarkPriceQuery } from "../../../Services/Swap";
import {
  ModalContainer,
  StyledInputSelect,
} from "../../../Components/PerpetualTrading/SpotTrading.styles";
import ValueLabel from "../../../Components/ValueLabel/ValueLabel";
import ToolTip from "../ToolTip";
import { SWAP } from "../../../Constants/Messages";
import { CoinPopover, SpotTradingTab } from "../Spot.styles";
import PartialPosition from "./PartialPosition";
import EntirePosition from "./EntirePosition";

const TPSLAdvanceModal = ({
  lastPrice,
  title,
  isModalOpen,
  setIsModalOpen,
  row,
  quoteAsset,
  baseAsset,
}) => {
  const { data: markPrice } = useGetMarkPriceQuery({
    instId: row?.instId,
  });

  const TABITEMS = () => {
    return [
      {
        key: "1",
        label: "Partial position",
        children: (
          <PartialPosition
            row={row}
            baseAsset={baseAsset}
            setIsModalOpen={setIsModalOpen}
            quoteAsset={quoteAsset}
          />
        ),
      },
      {
        key: "2",
        label: "Entire position",
        children: (
          <EntirePosition
            row={row}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
            setIsModalOpen={setIsModalOpen}
          />
        ),
      },
    ];
  };

  return (
    <ModalContainer
      title={<div className="t-header">{title}</div>}
      open={isModalOpen}
      footer={false}
      // onOk={() => {
      //   setIsModalOpen(false);
      // }}
      // okText={"Confirm"}
      onCancel={() => {
        setIsModalOpen(false);
      }}
    >
      <ValueLabel
        label={`Entry price (${quoteAsset})`}
        value={`$${row?.avgPx}`}
      />
      <ValueLabel
        label={`last price (${quoteAsset})`}
        value={`$${lastPrice}`}
      />
      <ValueLabel
        label={`Mark price (${quoteAsset})`}
        value={`$${markPrice?.data?.markPx}`}
      />
      <ValueLabel
        label={`Est. liquidation price (${quoteAsset})`}
        value={`$${Number(row?.liqPx).toFixed(2)}`}
      />

      <div className="question-img-container">
        <CoinPopover
          placement="bottom"
          trigger="click"
          content={
            <ToolTip heading={TAB_OPTION["limit"]} content={SWAP["limit"]} />
          }
        >
          <img className="question" src="/Logo/Icons/questionMark.svg" alt="" />
        </CoinPopover>
        <SpotTradingTab defaultActiveKey="1" items={TABITEMS()} />
      </div>
    </ModalContainer>
  );
};

export default TPSLAdvanceModal;
