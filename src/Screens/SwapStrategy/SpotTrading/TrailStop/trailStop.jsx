import { TabContainer } from "../SpotTrading.styles";
import { Checkbox, Divider, Form, Input } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAccountInfoQuery,
  usePlaceAdvancedOrderMutation,
} from "../../../../Services/Transaction";
import MaxSell from "../../MaxSell";
import VarianceDropDown from "../AdvancedMarketOrders/VarianceDropDown";
import { useGetUserQuery } from "../../../../Services/Auth";
import BuyButton from "../Component/BuyButton";
import SellButton from "../Component/SellButton";
import { useGetHighLowPriceQuery } from "../../../../Services/Market";
import { getDecimalFromLength } from "../../../../Utils/common";
import { useSelector } from "react-redux";

const defaultValues = {
  stopPrice: "",
  price: "",
  type: "",
  amount: "",
  orderType: "",
};

const TrailStop = ({ baseAsset, quoteAsset }) => {
  const [buyVarianceValue, setBuyVarianceValue] = useState("ratio");
  const [sellVarianceValue, setSellVarianceValue] = useState("ratio");
  const { data: hlCoinPriceData } = useGetHighLowPriceQuery({
    filter: quoteAsset,
    id: baseAsset,
  });
  const [buyActivationCheck, setBuyActivationCheck] = useState(false);
  const [sellActivationCheck, setSellActivationCheck] = useState(false);
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
        instId: `${baseAsset}${quoteAsset}`,
        side: "buy",
        tdMode: "cash",
        ordType: "move_order_stop",
        posSide: "net",
        sz: String(values.amount),
        callbackRatio: String(
          buyVarianceValue === "ratio" ? Number(values.price) / 100 : ""
        ),
        callbackSpread: String(
          buyVarianceValue === "ratio" ? "" : values.price
        ),
        activePx: buyActivationCheck ? values.activePx : "",
      };
      const response = await placeAdvancedOrder({ ...formObj }).unwrap();
      if (response?.data?.data[0]?.algoId) {
        toast.success("Order is placed.");
      }
      form.resetFields();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleSellSubmit = async (values) => {
    try {
      setSide("sell");
      const formObj = {
        instId: `${baseAsset}${quoteAsset}`,
        side: "sell",
        tdMode: "cash",
        ordType: "move_order_stop",
        posSide: "net",
        sz: String(values.amount),
        callbackRatio: String(
          sellVarianceValue === "ratio" ? Number(values.price) / 100 : ""
        ),
        callbackSpread: String(
          sellVarianceValue === "ratio" ? "" : values.price
        ),
        activePx: sellActivationCheck ? values.activePx : "",
      };
      const response = await placeAdvancedOrder({ ...formObj }).unwrap();
      if (response?.data?.data[0]?.algoId) {
        toast.success("Order is placed.");
      }
      form.resetFields();
    } catch (error) {
      toast.error(error?.data?.message);
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
                  buyVarianceValue === "ratio"
                ) {
                  return Promise.reject("Invalid Value.");
                } else if (
                  (Number(value) < Number(hlCoinPriceData?.price) / 100 ||
                    Number(value) > Number(hlCoinPriceData?.price)) &&
                  buyVarianceValue === "var"
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
                  {buyVarianceValue === "ratio" ? "%" : quoteAsset}
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
            {
              validator: (_, value) => {
                const availableBal = accountInfo?.data?.filter((item) =>
                  item.ccy === quoteAsset ? item : ""
                );
                if (parseFloat(value) === 0) {
                  return Promise.reject("Value cannot be zero.");
                } else if (
                  !availableBal?.[0]?.availBal ||
                  availableBal?.[0]?.availBal < value
                ) {
                  return Promise.reject("Insufficient Balance.");
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
            placeholder=""
            suffix={
              <>
                <span className="label">{baseAsset}</span>
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
        <MaxSell
          balance={accountInfo?.data?.filter(
            (item) => item?.ccy === quoteAsset
          )}
          asset={quoteAsset}
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
        <BuyButton user={user} isPlacingOrder={isPlacingOrder} side={side} />
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
                  sellVarianceValue === "ratio"
                ) {
                  return Promise.reject("Invalid Value.");
                } else if (
                  (Number(value) < Number(hlCoinPriceData?.price) / 100 ||
                    Number(value) > Number(hlCoinPriceData?.price)) &&
                  buyVarianceValue === "var"
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
                  {sellVarianceValue === "ratio" ? "%" : quoteAsset}
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
            {
              validator: (_, value) => {
                const availableBal = accountInfo?.data?.filter((item) =>
                  item.ccy === baseAsset ? item : ""
                );
                if (parseFloat(value) === 0) {
                  return Promise.reject("Value cannot be zero.");
                } else if (
                  !availableBal?.[0]?.availBal ||
                  availableBal?.[0]?.availBal < value
                ) {
                  return Promise.reject("Insufficient Balance.");
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
            placeholder=""
            suffix={
              <>
                <span className="label">{baseAsset}</span>
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

        <MaxSell
          balance={accountInfo?.data?.filter((item) => item?.ccy === baseAsset)}
          asset={baseAsset}
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
      </Form>
    </TabContainer>
  );
};

export default TrailStop;
