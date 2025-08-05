import { Button, Dropdown, Input, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OrderOption, amountPercentOption } from "../../../Constants/state";
import lodash from "lodash";
import {
  useClosePositionMutation,
  usePlaceOrderMutation,
} from "../../../Services/Transaction";
import { evaluateValue, isValidAmount } from "../../../Utils/common";
import { useSelector } from "react-redux";
import {
  useGetContractValueQuery,
  useGetHighLowPriceQuery,
} from "../../../Services/Swap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background: ${(props) => props.theme.colors.white} !important;
  color: ${(props) => props.theme.colors.black} !important;
`;

const FormComponent = ({ row, leverageMode }) => {
  const [baseSymbol, quoteSymbol] = String(row?.instId).split("-");
  const [price, setPrice] = useState("");
  const perpAmountDropdown = useSelector(
    (state) => state.global.perpAmountDropdown
  );
  const { data: ctVal } = useGetContractValueQuery({
    instId: row?.instId,
  });
  const { data: coinPairCurrentPrice } = useGetHighLowPriceQuery({
    id: baseSymbol,
    filter: quoteSymbol,
  });

  const [amount, setAmount] = useState("");
  useEffect(() => {
    setPrice(row?.last);
  }, [row]);
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();
  const [closePosition, { isLoading: isCloseLoading }] =
    useClosePositionMutation();

  const closeOrder = async (data) => {
    if (!lodash?.isNaN(Number(price)) && price <= 0) {
      toast.error("Please enter valid Price");
      return;
    }
    let newAmount = "";
    let percentAmount = "";
    if (String(amount)?.includes("%")) {
      newAmount = String(amount)?.split("%")?.[0];
      const isValidQuantity = isValidAmount(newAmount, row?.availPos);
      if (!isValidQuantity?.isValid) {
        toast.error("Amount is lower than minimum amount.");
        return;
      } else {
        percentAmount = isValidQuantity?.value;
      }
    }
    if (!String(amount)?.includes("%") && amount <= 0) {
      toast.error("Please enter valid Amount");
      return;
    }

    const eVal = evaluateValue(
      amount,
      ctVal?.ctVal,
      String(perpAmountDropdown?.label).toLowerCase(),
      coinPairCurrentPrice?.price
    );
    if (eVal <= 0) {
      toast.error("Amount is lower than minimum amount.");
      return;
    }
    const formData = {
      instId: data?.instId,
      ordType: price === "MARKET" ? String(price).toLowerCase() : "limit",
      instType: "SWAP",
      side: data?.posSide === "long" ? "sell" : "buy",
      posSide: data?.posSide,
      px: price === "MARKET" ? String(row?.last) : price,
      reduceOnly: data?.posSide === "long" ? "true" : "false",
      sz: !String(amount)?.includes("%") ? String(eVal) : String(percentAmount),
      tdMode: String(row?.mgnMode).toLowerCase(),
    };
    await placeOrder(formData).unwrap();
  };
  const closeAll = async (data) => {
    const formData = {
      instId: data?.instId,
      mgnMode: data?.mgnMode,
      posSide: data?.posSide,
    };
    await closePosition(formData).unwrap();
  };
  return (
    <div className="value-info self-bottom">
      <Dropdown
        menu={{
          onClick: ({ item }) => {
            if (item?.props?.value === "LIMIT") {
              setPrice(row?.last);
            } else {
              setPrice("MARKET");
            }
          },
          items: OrderOption,
        }}
      >
        <Input
          autocomplete="off"
          name="price"
          placeholder="price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </Dropdown>
      <Dropdown
        menu={{
          onClick: ({ item }) => {
            setAmount(item?.props?.value);
          },
          items: amountPercentOption,
        }}
      >
        <Input
          autocomplete="off"
          name="amount"
          placeholder="amount"
          value={amount}
          onChange={(e) => {
            if (
              (perpAmountDropdown?.label === "Cont" &&
                !String(amount)?.includes("%") &&
                e.target.value > row?.availPos) ||
              (perpAmountDropdown?.label === "Crypto" &&
                !String(amount)?.includes("%") &&
                Number(row?.availPos) * Number(ctVal?.ctVal) <
                  e.target.value) ||
              (perpAmountDropdown?.label === "USD" &&
                !String(amount)?.includes("%") &&
                (Number(ctVal?.ctVal) * Number(row?.availPos)) /
                  Number(coinPairCurrentPrice?.price) <
                  e.target.value)
            ) {
              toast.error("Amount is exceeding the available position size.");
              setAmount("");
              return;
            }
            setAmount(e.target.value);
          }}
        />
      </Dropdown>
      <StyledButton
        onClick={async () => {
          try {
            if (
              perpAmountDropdown?.label === "Cont" &&
              !String(amount)?.includes("%") &&
              Number(amount) > Number(row?.availPos)
            ) {
              toast.error("Amount exceeds the position size");
              return;
            }
            await closeOrder(row);
          } catch (error) {
            toast.error(error?.data?.message);
          }
        }}
        disabled={isPlacingOrder}
      >
        Close
      </StyledButton>
      <Popconfirm
        title="Sure to cancel?"
        disabled={isCloseLoading}
        onConfirm={async () => {
          try {
            await closeAll(row);
            toast.success("Position closed.");
          } catch (error) {
            toast.error(error?.data?.message);
          }
        }}
      >
        <a className="close-btn">Close all</a>
      </Popconfirm>
    </div>
  );
};

export default FormComponent;
