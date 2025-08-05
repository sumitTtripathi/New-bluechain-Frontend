import { Button, Modal } from "antd";
import {
  InnerModal,
  ModalHeading,
  OrderDetailContainer,
  SymbolContainer,
} from "../SpotGrid/SpotGridForm.styles";
import coinJson from "../../../../Constants/Coin.json";
import { useCreateBotMutation } from "../../../../Services/Bot";
import { toast } from "react-toastify";
import { transactionApi } from "../../../../Services/Transaction";
import { useDispatch } from "react-redux";
// import { setCreatBotResponse } from "../../../../Services/Auth";
import { BOT } from "../../../../Enums/Enums";
const ConfirmationModal = ({
  isModalOpen,
  handleOk,
  data,
  investCurrency,
  handleCancel,
  handleOpenSuccess,
  form,
  reference,
}) => {
  const dispatch = useDispatch();
  const [baseAsset, quoteAsset] = String(data.instId).split("-");
  const [createBot, { isLoading: createBotLoading }] = useCreateBotMutation();
  const confirmBot = async () => {
    try {
      const response = await createBot(data).unwrap();
      // dispatch(setCreatBotResponse(response));
      toast.success(response?.data?.message);
      handleOpenSuccess();
      form.resetFields();
      dispatch(transactionApi.util.resetApiState());
      reference?.current?.setStartValue("Instant");
      reference?.current?.setStopValue("Instant");
    } catch (err) {
      toast.error(err?.data?.message);
    }
    handleCancel();
  };
  return (
    <Modal
      title={<ModalHeading>Order confirmation</ModalHeading>}
      footer={null}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <InnerModal>
        <SymbolContainer>
          <img className="logo" src={coinJson[baseAsset]} alt="symbol" />
          <div className="logoName">
            {baseAsset}/{quoteAsset}
          </div>
          <div className="selected-option">{BOT[data?.algoOrdType]}</div>
        </SymbolContainer>
        <OrderDetailContainer>
          <div className="row">
            <div className="row-data">
              <div className="label">Lower limit</div>
              <div className="value">
                {data.minPx} {quoteAsset}
              </div>
            </div>
            <div className="row-data">
              <div className="label">Upper limit</div>
              <div className="value">
                {data.maxPx} {quoteAsset}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row-data">
              <div className="label">Quantity</div>
              <div className="value">{data.gridNum}</div>
            </div>
            <div className="row-data">
              <div className="label">Mode</div>
              <div className="value">
                {data.investType === "1" ? "Arithmetic" : "Geometric"}
              </div>
            </div>
          </div>
          {(data?.trailingUpConfig?.stopPx ||
            data?.trailingDownConfig?.stopPx) && (
            <div className="row">
              {data?.trailingUpConfig?.stopPx && (
                <div className="row-data">
                  <div className="label">Trailing up limit</div>
                  <div className="value">
                    {data?.trailingUpConfig?.stopPx} {quoteAsset}
                  </div>
                </div>
              )}
              {data?.trailingDownConfig?.stopPx && (
                <div className="row-data">
                  <div className="label">Trailing down limit</div>
                  <div className="value">
                    {data?.trailingDownConfig?.stopPx} {quoteAsset}
                  </div>
                </div>
              )}
            </div>
          )}
          {(data?.triggerParams?.[0]?.triggerStrategy ||
            data?.triggerParams?.[1]?.triggerStrategy) && (
            <div className="row">
              {data?.triggerParams?.[0]?.triggerStrategy && (
                <div className="row-data">
                  <div className="label">Start condition</div>
                  <div className="value">
                    {data?.triggerParams?.[0]?.triggerStrategy}
                  </div>
                </div>
              )}
              {data?.triggerParams?.[1]?.triggerStrategy && (
                <div className="row-data">
                  <div className="label">Stop condition</div>
                  <div className="value">
                    {data?.triggerParams?.[1]?.triggerStrategy}
                  </div>
                </div>
              )}
            </div>
          )}
          {data?.triggerParams?.[1]?.stopType && (
            <div className="row">
              <div className="row-data">
                <div className="label">Sell all once bot stops</div>
                <div className="value">
                  {data?.triggerParams?.[1]?.stopType === "1" ? "Yes" : "No"}
                </div>
              </div>
            </div>
          )}
        </OrderDetailContainer>
        <div className="row">
          <div>Investment amount</div>
          <div className="investment-container">
            <img className="logo" src={coinJson[quoteAsset]} alt="symbol" />
            <div>
              {data.quoteSz || data.baseSz || data.sz}{" "}
              {investCurrency === "quoteAsset" ? quoteAsset : baseAsset}
            </div>
          </div>
        </div>
        <div className="small-grey">
          Grid trading assets will be segregated from Manual trading account.
          Beware the risks of manual trading positions.
        </div>
        <div className="small-grey">
          If you invest a large amount of fund, beware that when the take profit
          and stop loss are triggered, the order may not be placed due to risk
          control measures.
        </div>
        <div className="btn-row">
          <div className="amount-container">
            <Button
              onClick={() => {
                handleCancel();
              }}
            >
              Cancel
            </Button>
            <Button onClick={confirmBot} loading={createBotLoading}>
              Confirm
            </Button>
          </div>
        </div>
      </InnerModal>
    </Modal>
  );
};

export default ConfirmationModal;
