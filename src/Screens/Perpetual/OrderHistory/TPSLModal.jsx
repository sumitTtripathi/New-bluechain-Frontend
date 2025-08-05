import {
  LogoInfo,
  ModalContainer,
} from "../../../Components/AdvancedTradeHeader/AdvancedTradeHeader.style";
import ValueLabel from "../../../Components/ValueLabel/ValueLabel";
import coinJson from "../../../Constants/Coin.json";
const TPSLModal = ({ title, isModalOpen, setIsModalOpen, data }) => {
  const [baseSymbol, quoteSymbol] = String(data?.instId).split("-");
  return (
    <ModalContainer
      title={<div className="t-header">{title}</div>}
      open={isModalOpen}
      footer={false}
      onCancel={() => {
        setIsModalOpen(false);
      }}
    >
      <div className="body-container">
        <LogoInfo>
          <img src={coinJson[baseSymbol]} />
          <div>
            {baseSymbol}-{quoteSymbol} Perp
          </div>
        </LogoInfo>
        <div style={{ marginTop: "10px" }}>
          <ValueLabel
            label={"TP Price"}
            value={data?.tpTriggerPx ? `$ ${data?.tpTriggerPx}` : "$ --"}
          />
          <ValueLabel
            label={"TP order price"}
            value={
              Number(data?.tpOrdPx) === -1 ? "MARKET" : `$ ${data?.tpOrdPx}`
            }
          />
          <ValueLabel
            label={"SL price"}
            value={data?.slTriggerPx ? `$ ${data?.slTriggerPx}` : "$ --"}
          />
          <ValueLabel
            label={"SL order price"}
            value={
              Number(data?.slOrdPx) === -1 ? "MARKET" : `$ ${data?.slOrdPx}`
            }
          />
        </div>
      </div>
    </ModalContainer>
  );
};

export default TPSLModal;
