import { TAB_OPTION } from "../../../Constants/state";
import { useGetMarkPriceQuery } from "../../../Services/Swap";
import { ModalContainer } from "../../../Components/PerpetualTrading/SpotTrading.styles";
import ValueLabel from "../../../Components/ValueLabel/ValueLabel";
import ToolTip from "../ToolTip";
import { SWAP } from "../../../Constants/Messages";
import { CoinPopover } from "../Spot.styles";
import StopOrder from "./StopOrder";

const TPSLAdvanceModal = ({
  lastPrice,
  title,
  isModalOpen,
  setIsModalOpen,
  row,
  quoteAsset,
  baseAsset,
  type,
}) => {
  const { data: markPrice } = useGetMarkPriceQuery({
    instId: row?.instId,
  });

  return (
    <ModalContainer
      title={<div className="t-header">{title}</div>}
      open={isModalOpen}
      footer={false}
      onCancel={() => {
        setIsModalOpen(false);
      }}
    >
      <ValueLabel
        label={`last price (${quoteAsset})`}
        value={`$${lastPrice}`}
      />
      <ValueLabel
        label={`Mark price (${quoteAsset})`}
        value={`$${markPrice?.data?.markPx}`}
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
        <StopOrder
          row={row}
          type={type}
          baseAsset={baseAsset}
          quoteAsset={quoteAsset}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </ModalContainer>
  );
};

export default TPSLAdvanceModal;
