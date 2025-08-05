import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  FlexColumn,
  FlexRow,
  StyledSpotGridForm,
  TextBlack,
} from "./MoonGridForm.styles";
import { isNaN } from "lodash";
import FormInput from "../Common/FormInput";
import { StyledSlider } from "../../../Spot/SpotTrading/SpotTrading.styles";
import MaxSell from "../../../../Components/MaxSell/MaxSell";
import { Form } from "antd";
import ActionButton from "../../../../Components/ActionButton/ActionButton";
import { useTheme } from "styled-components";
import { marks, validInput } from "../../../../Constants/state";
import { useForm } from "antd/es/form/Form";
import { useGetAccountInfoQuery } from "../../../../Services/Transaction";
import { useSelector } from "react-redux";
import { MESSAGES } from "../../../../Constants/Messages";
import { convertIntoDecimal } from "../../../../Utils/common";
import ValueLabel from "../../../../Components/ValueLabel/ValueLabel";
import { useGetAIParamQuery } from "../../../../Services/Bot";
import { BOT } from "../../../../Enums/Enums";
import { useGetUserQuery } from "../../../../Services/Auth";
const SuccessModal = React.lazy(() => import("../Common/SuccessModal"));
const ConfirmationModal = React.lazy(() =>
  import("../Common/ConfirmationModal")
);

const INITIAL_VALUES = {
  investment_amount: "",
};
const MoonGridForm = forwardRef(({ baseAsset, quoteAsset }, ref) => {
  const [spotForm] = useForm();
  const [adjustForm, setAdjustForm] = useState(false);
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slider, setSlider] = useState("");
  const { data: aiParamData } = useGetAIParamQuery({
    instId: `${baseAsset?.toUpperCase()}-${quoteAsset?.toUpperCase()}`,
    algoOrdType: BOT.MOON_GRID,
  });
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const token = useSelector((state) => state.global.token);
  const [balanceInfo, setBalanceInfo] = useState({});
  const { data: accountInfo } = useGetAccountInfoQuery(
    {},
    {
      skip: !token,
    }
  );
  const { data: user } = useGetUserQuery(
    {},
    {
      skip: !token,
    }
  );
  const [formObject, setFormObject] = useState({});
  useImperativeHandle(
    ref,
    () => {
      return {
        adjustForm,
        setAdjustForm,
      };
    },
    []
  );

  const formFields = {
    gridNum: aiParamData?.result?.data?.[0]?.gridNum,
    minPx: aiParamData?.result?.data?.[0]?.minPx,
    maxPx: aiParamData?.result?.data?.[0]?.maxPx,
    runType: "2", // here 1: Arithmetic, 2: Geometric
  };
  useEffect(() => {
    const coinBal = accountInfo?.data?.filter((item) =>
      item?.ccy === quoteAsset ? item : ""
    );
    setBalanceInfo(coinBal);
  }, [accountInfo, quoteAsset]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleOpenSuccess = () => {
    setSuccessModalOpen(true);
  };
  const handleCancelSuccess = () => {
    setSuccessModalOpen(false);
  };
  const onSubmit = async (values) => {
    let formObj = {};
    formObj = {
      instId: `${baseAsset}${quoteAsset}`,
      algoOrdType: BOT.MOON_GRID,
      quoteSz: String(values.investment_amount),
      ...formFields,
    };
    setFormObject(formObj);
    handleOpen();
  };

  const onSliderChange = (value) => {
    const availableBal = accountInfo?.data?.filter((item) =>
      item.ccy === quoteAsset ? item : ""
    );
    setSlider(value);
    if (availableBal?.[0]?.availBal) {
      spotForm.setFieldsValue({
        investment_amount: convertIntoDecimal(
          availableBal[0].availBal * (value / 100)
        ),
      });
    }
  };

  const handleChange = (e) => {
    const availableBal = accountInfo?.data?.filter((item) =>
      item.ccy === quoteAsset ? item : ""
    );
    const [key] = Object.keys(e);
    if (key === "investment_amount") {
      const value = convertIntoDecimal(
        (parseFloat(e["investment_amount"]) /
          parseFloat(availableBal?.[0]?.availBal)) *
          100
      );
      setSlider(isNaN(value) ? "0" : value);
    }
  };
  return (
    <StyledSpotGridForm>
      <Form
        form={spotForm}
        onValuesChange={handleChange}
        initialValues={INITIAL_VALUES}
        onFinish={onSubmit}
      >
        <div>
          <ValueLabel
            label={"Backtested annual yield"}
            value={`${Number(
              aiParamData?.result?.data?.[0]?.annualizedRate * 100
            ).toFixed(2)}%`}
          />
          <ValueLabel
            label={`Price range(${quoteAsset})`}
            value={`${aiParamData?.result?.data?.[0]?.minPx} - ${aiParamData?.result?.data?.[0]?.maxPx}`}
          />
          <ValueLabel
            label={`Grid quantity`}
            value={`${aiParamData?.result?.data?.[0]?.gridNum}`}
          />
        </div>
        <FlexColumn>
          <FlexRow>
            <TextBlack>3. Investment amount</TextBlack>
          </FlexRow>
          <FormInput
            name="investment_amount"
            prefix="Investment Amount"
            asset={quoteAsset}
            rules={[
              ...validInput(true),
              {
                validator: (_, value) => {
                  if (parseFloat(value) === 0) {
                    return Promise.reject(MESSAGES.VALIDATE_ZERO);
                  }
                  return Promise.resolve();
                },
              },
            ]}
          />
        </FlexColumn>
        <StyledSlider
          up={true}
          trackStyle={{ background: theme.colors.marketUp }}
          className="slider"
          railStyle={{ background: theme.colors.grey.sliderTrack }}
          marks={marks}
          step={1}
          value={slider}
          onChange={onSliderChange}
        />
        <MaxSell balance={balanceInfo} asset={quoteAsset} />
        <ActionButton
          user={user}
          isPlacingOrder={false}
          handleOpen={handleOpen}
          buttonLabel="Create"
          htmlType="submit"
        />
        <ConfirmationModal
          handleOk={() => {}}
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
          handleOpenSuccess={handleOpenSuccess}
          data={formObject}
          investCurrency={"quoteAsset"}
          setData={setFormObject}
          form={spotForm}
        />
        <SuccessModal
          handleOk={() => {}}
          handleCancel={handleCancelSuccess}
          isModalOpen={successModalOpen}
        />
      </Form>
    </StyledSpotGridForm>
  );
});
MoonGridForm.displayName = "MoonGridForm";

export default MoonGridForm;
