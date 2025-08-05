import { useEffect, useState } from "react";
import { TabContainer } from "../SpotTrading.styles";
import { Checkbox, Divider, Form, Input } from "antd";
import { toast } from "react-toastify";
import {
  useGetAccountInfoQuery,
  usePlaceAdvancedOrderMutation,
} from "../../../Services/Transaction";
import VarianceDropDown from "../AdvancedMarketOrders/VarianceDropDown";
import { setSelectedTab, useGetUserQuery } from "../../../Services/Auth";
import BuyButton from "../Component/BuyButton";
import SellButton from "../Component/SellButton";
import { useGetHighLowPriceQuery } from "../../../Services/Market";
import { getDecimalFromLength } from "../../../Utils/common";
import { SWAP_FEE, tradeType } from "../../../Constants/state";
import MaxAvailable from "../../MaxAvailable/MaxAvailable";
import ValueLabel from "../TPSL/ValueLabel";
import { useGetContractValueQuery } from "../../../Services/Swap";
import { useDispatch, useSelector } from "react-redux";

const defaultValues = {
  stopPrice: "",
  price: "",
  type: "",
  amount: "",
  orderType: "",
};

const TrailStop = ({ baseAsset, quoteAsset, leverageMode, leverage }) => {
  const dispatch = useDispatch();
  const [buyVarianceValue, setBuyVarianceValue] = useState("percentage");
  const [sellVarianceValue, setSellVarianceValue] = useState("percentage");
  const { data: hlCoinPriceData } = useGetHighLowPriceQuery({
    filter: quoteAsset,
    id: baseAsset,
  });
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const { data: ctVal } = useGetContractValueQuery({
    instId: `${baseAsset}${quoteAsset}`,
  });
  const [buyActivationCheck, setBuyActivationCheck] = useState(false);
  const [sellActivationCheck, setSellActivationCheck] = useState(false);
  const [maxBuyValue, setMaxBuyValue] = useState("");
  const [maxSellValue, setMaxSellValue] = useState("");
  const [placeAdvancedOrder, { isLoading: isPlacingOrder }] =
    usePlaceAdvancedOrderMutation();
  const token = useSelector((state) => state.global.token);
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
  const [form] = Form.useForm();
  const [side, setSide] = useState("");
  const [sellForm] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      setSide("buy");
      const formObj = {
        instId: `${baseAsset}${quoteAsset}${tradeType?.swap}`,
        side: "buy",
        tdMode: String(leverageMode).toLowerCase(),
        ordType: "move_order_stop",
        posSide: "long",
        sz: String(values.amount),
        callbackRatio: String(
          buyVarianceValue === "percentage" ? Number(values.price) / 100 : ""
        ),
        callbackSpread: String(
          buyVarianceValue === "percentage" ? "" : values.price
        ),
        activePx: buyActivationCheck ? values.activePx : "",
      };
      const response = await placeAdvancedOrder({ ...formObj }).unwrap();
      if (response?.data) {
        toast.success("Order is placed.");
      }
      form.resetFields();
    } catch (error) {
      toast.error(error?.data?.message);
      form.resetFields();
    }
  };

  useEffect(() => {
    const availableBal = accountInfo?.data?.filter((item) =>
      item.ccy === quoteAsset ? item : ""
    );
    const contValue =
      (Number(availableBal?.[0]?.availEq) * Number(leverage)) /
      Number(hlCoinPriceData?.price);
    setMaxBuyValue(contValue);
    setMaxSellValue(contValue);
  }, [leverage, hlCoinPriceData, accountInfo]);
  useEffect(() => {
    dispatch(setSelectedTab("trail"));
  }, []);
  useEffect(() => {
    setMinPrice(
      Number(
        Number(hlCoinPriceData?.price) -
          Number(hlCoinPriceData?.price) * Number(SWAP_FEE?.maker)
      ).toFixed(2)
    );
    setMaxPrice(
      Number(
        Number(hlCoinPriceData?.price) * Number(SWAP_FEE?.maker) +
          Number(hlCoinPriceData?.price)
      ).toFixed(2)
    );
  }, [hlCoinPriceData]);
  const handleSellSubmit = async (values) => {
    try {
      setSide("sell");
      const formObj = {
        instId: `${baseAsset}${quoteAsset}${tradeType?.swap}`,
        side: "sell",
        tdMode: String(leverageMode).toLowerCase(),
        ordType: "move_order_stop",
        posSide: "short",
        sz: String(values.amount),
        callbackRatio: String(
          sellVarianceValue === "percentage" ? Number(values.price) / 100 : ""
        ),
        callbackSpread: String(
          sellVarianceValue === "percentage" ? "" : values.price
        ),
        activePx: sellActivationCheck ? values.activePx : "",
      };
      const response = await placeAdvancedOrder({ ...formObj }).unwrap();
      if (response?.data) {
        toast.success("Order is placed.");
      }
      sellForm.resetFields();
    } catch (error) {
      toast.error(error?.data?.message);
      sellForm.resetFields();
    }
  };
  return (
    <TabContainer>
      <Form
        onFinish={handleSubmit}
        initialValues={defaultValues}
        form={form}
        className="left"
      >
        <VarianceDropDown
          varianceValue={buyVarianceValue}
          setVarianceValue={setBuyVarianceValue}
        />
        <Form.Item
          name="price"
          rules={[
            { required: true, message: "Please enter the value." },
            {
              pattern: /^[+]?\d+(\.\d+)?$/,
              message: "Please enter a valid number.",
            },
            {
              validator: (_, value) => {
                if (parseFloat(value) === 0) {
                  return Promise.reject("Value cannot be zero.");
                } else if (
                  (parseFloat(value) < 0 || parseFloat(value) > 100) &&
                  buyVarianceValue === "percentage"
                ) {
                  return Promise.reject("Invalid Value.");
                } else if (
                  (Number(value) < Number(hlCoinPriceData?.price) / 100 ||
                    Number(value) > Number(hlCoinPriceData?.price)) &&
                  buyVarianceValue === "cont"
                ) {
                  return Promise.reject(
                    `The variance range is ${hlCoinPriceData?.price / 100} - ${
                      hlCoinPriceData?.price
                    }`
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
          validateTrigger="onChange"
        >
          <Input
            autocomplete="off"
            className="input"
            suffix={
              <>
                <span className="label">
                  {buyVarianceValue === "percentage" ? "%" : quoteAsset}
                </span>
              </>
            }
            prefix={
              <>
                <span className="label">Trail Variance</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <Form.Item
          name="amount"
          rules={[
            { required: true, message: "Please enter the value." },
            {
              pattern: /^[+]?\d+(\.\d+)?$/,
              message: "Please enter a valid number.",
            },
            // {
            //   validator: (_, value) => {
            //     const availableBal = accountInfo?.data?.filter((item) =>
            //       item.ccy === quoteAsset ? item : ""
            //     );
            //     if (parseFloat(value) === 0) {
            //       return Promise.reject("Value cannot be zero.");
            //     } else if (
            //       !availableBal?.[0]?.availBal ||
            //       availableBal?.[0]?.availBal < value
            //     ) {
            //       return Promise.reject("Insufficient Balance.");
            //     }
            //     return Promise.resolve();
            //   },
            // },
          ]}
          validateTrigger="onChange"
        >
          <Input
            autocomplete="off"
            className="input"
            placeholder={`Single contract value ${ctVal?.ctVal} ${baseAsset}`}
            suffix={
              <>
                <span className="label">Cont</span>
              </>
            }
            prefix={
              <>
                <span className="label">Amount</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <MaxAvailable
          balance={accountInfo?.data?.filter(
            (item) => item?.ccy === quoteAsset
          )}
          asset={quoteAsset}
          sideText={"Max buy"}
          sideTextValue={maxBuyValue}
          sideAsset={"Cont"}
        />
        <Divider style={{ margin: "10px 0" }} />
        <div className="checkbox-container">
          <Checkbox
            className="label"
            checked={buyActivationCheck}
            onClick={() => {
              setBuyActivationCheck((prevState) => !prevState);
            }}
          >
            Activation Price
          </Checkbox>
        </div>
        {buyActivationCheck && (
          <>
            <Form.Item
              name="activePx"
              rules={[
                { required: true, message: "Please enter the value." },
                {
                  pattern: /^[+]?\d+(\.\d+)?$/,
                  message: "Please enter a valid number.",
                },
                {
                  validator: (_, value) => {
                    const decimalArr = String(hlCoinPriceData?.price)?.split(
                      "."
                    );
                    const decimalValue = decimalArr[1]?.length;
                    if (parseFloat(value) === 0) {
                      return Promise.reject("Value cannot be zero.");
                    } else if (
                      decimalValue &&
                      value < getDecimalFromLength(decimalValue)
                    ) {
                      return Promise.reject(
                        `Value must be greater than 0 equal to ${getDecimalFromLength(
                          decimalValue
                        )}.`
                      );
                    } else if (!decimalValue && value < 1) {
                      return Promise.reject(
                        `Value must be greater than equal to 1.`
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              validateTrigger="onChange"
            >
              <Input
                autocomplete="off"
                className="input"
                suffix={
                  <>
                    <span className="label">{quoteAsset}</span>
                  </>
                }
              />
            </Form.Item>
          </>
        )}
        <BuyButton user={user} isPlacingOrder={isPlacingOrder} side={side} />
        <ValueLabel value={maxPrice} label="Max Price :" />
      </Form>
      <Form
        onFinish={handleSellSubmit}
        initialValues={defaultValues}
        form={sellForm}
        className="left"
      >
        <VarianceDropDown
          varianceValue={sellVarianceValue}
          setVarianceValue={setSellVarianceValue}
        />
        <Form.Item
          name="price"
          rules={[
            { required: true, message: "Please enter the value." },
            {
              pattern: /^[+]?\d+(\.\d+)?$/,
              message: "Please enter a valid number.",
            },
            {
              validator: (_, value) => {
                if (parseFloat(value) === 0) {
                  return Promise.reject("Value cannot be zero.");
                } else if (
                  (parseFloat(value) < 0 || parseFloat(value) > 100) &&
                  sellVarianceValue === "percentage"
                ) {
                  return Promise.reject("Invalid Value.");
                } else if (
                  (Number(value) < Number(hlCoinPriceData?.price) / 100 ||
                    Number(value) > Number(hlCoinPriceData?.price)) &&
                  buyVarianceValue === "cont"
                ) {
                  return Promise.reject(
                    `The variance range is ${hlCoinPriceData?.price / 100} - ${
                      hlCoinPriceData?.price
                    }`
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
          validateTrigger="onChange"
        >
          <Input
            autocomplete="off"
            suffix={
              <>
                <span className="label">
                  {sellVarianceValue === "percentage" ? "%" : quoteAsset}
                </span>
              </>
            }
            className="input"
            prefix={
              <>
                <span className="label">Trail Variance</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <Form.Item
          name="amount"
          rules={[
            { required: true, message: "Please enter the value." },
            {
              pattern: /^[+]?\d+(\.\d+)?$/,
              message: "Please enter a valid number.",
            },
          ]}
          validateTrigger="onChange"
        >
          <Input
            autocomplete="off"
            className="input"
            placeholder={`Single contract value ${ctVal?.ctVal} ${baseAsset}`}
            suffix={
              <>
                <span className="label">Cont</span>
              </>
            }
            prefix={
              <>
                <span className="label">Amount</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <MaxAvailable
          balance={accountInfo?.data?.filter(
            (item) => item?.ccy === quoteAsset
          )}
          asset={quoteAsset}
          sideText={"Max buy"}
          sideTextValue={maxSellValue}
          sideAsset={"Cont"}
        />
        <Divider style={{ margin: "10px 0" }} />
        <div className="checkbox-container">
          <Checkbox
            className="label"
            checked={sellActivationCheck}
            onClick={() => {
              setSellActivationCheck((prevState) => !prevState);
            }}
          >
            Activation Price
          </Checkbox>
        </div>
        {sellActivationCheck && (
          <>
            <Form.Item
              name="activePx"
              rules={[
                { required: true, message: "Please enter the value." },
                {
                  pattern: /^[+]?\d+(\.\d+)?$/,
                  message: "Please enter a valid number.",
                },
                {
                  validator: (_, value) => {
                    const decimalArr = String(hlCoinPriceData?.price)?.split(
                      "."
                    );
                    const decimalValue = decimalArr[1]?.length;
                    if (parseFloat(value) === 0) {
                      return Promise.reject("Value cannot be zero.");
                    } else if (
                      decimalValue &&
                      value < getDecimalFromLength(decimalValue)
                    ) {
                      return Promise.reject(
                        `Value must be greater than equal to ${getDecimalFromLength(
                          decimalValue
                        )}.`
                      );
                    } else if (!decimalValue && value < 1) {
                      return Promise.reject(
                        `Value must be greater than equal to 1.`
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              validateTrigger="onChange"
            >
              <Input
                autocomplete="off"
                className="input"
                suffix={
                  <>
                    <span className="label">{quoteAsset}</span>
                  </>
                }
              />
            </Form.Item>
          </>
        )}
        <SellButton user={user} isPlacingOrder={isPlacingOrder} side={side} />
        <ValueLabel value={minPrice} label="Min Price :" />
      </Form>
    </TabContainer>
  );
};

export default TrailStop;
