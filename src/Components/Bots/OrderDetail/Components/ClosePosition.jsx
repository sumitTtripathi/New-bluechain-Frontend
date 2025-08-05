import { Button, Dropdown, Input, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetHighLowPriceQuery } from "../../../../Services/Swap";
import styled from "styled-components";
import { OrderOption, amountPercentOption } from "../../../../Constants/state";
import { useCancelBotMutation } from "../../../../Services/Bot";

const StyledButton = styled(Button)`
  background: ${(props) => props.theme.colors.white} !important;
  color: ${(props) => props.theme.colors.black} !important;
`;

const ClosePosition = ({ row, baseAsset, quoteAsset }) => {
  const [price, setPrice] = useState("");
  const [priceType, setPriceType] = useState("LIMIT");
  const [hasChangedPrice, setHasChangedPrice] = useState(false);
  const { data: coinPairCurrentPrice } = useGetHighLowPriceQuery({
    id: baseAsset,
    filter: quoteAsset,
  });
  const [amount, setAmount] = useState("");
  const [cancelBot, { isLoading: isLoadingPartial }] = useCancelBotMutation();

  const closeOrder = async (data) => {
    let amountValue = amount;
    if (String(amount)?.includes("%")) {
      const [amountNum] = String(amount).split("%");
      amountValue = parseInt(
        parseFloat(row?.pos) * (parseFloat(amountNum) / 100)
      );
    }
    if (amountValue <= 0) {
      toast.error("Amount is less than minimum amount");
      return;
    }
    const formData = {
      px: price === "MARKET" ? "-1" : String(price),
      sz: String(amountValue),
      mktClose: amount === "100%" || Number(amount) === Number(row?.pos),
      algoId: row?.algoId,
    };
    const response = await cancelBot(formData).unwrap();
    return response;
  };

  useEffect(() => {
    if (priceType === "LIMIT" && !hasChangedPrice) {
      setPrice(coinPairCurrentPrice?.price);
    } else if (priceType === "MARKET") {
      setPrice("MARKET");
    }
  }, [priceType, coinPairCurrentPrice, hasChangedPrice]);

  const closeAll = async (data) => {
    const formData = {
      mktClose: true,
      algoId: row?.algoId,
    };
    const response = await cancelBot(formData).unwrap();
    return response;
  };
  return (
    <div className="value-info self-bottom">
      <Dropdown
        menu={{
          onClick: ({ item }) => {
            setPriceType(item?.props?.value);
            setHasChangedPrice(false);
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
            setHasChangedPrice(true);
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
            if (parseFloat(e.target.value) > parseFloat(row?.pos)) {
              toast.error("Amount is exceeding the available position size.");
              setAmount("");
              return;
            }
            setAmount(e.target.value ? parseInt(e.target.value) : "");
          }}
        />
      </Dropdown>
      <StyledButton
        loading={isLoadingPartial}
        onClick={async () => {
          try {
            await closeOrder(row);
            toast.success("Position closed");
            setAmount("");
          } catch (error) {
            toast.error(error?.data?.message);
          }
        }}
      >
        Close
      </StyledButton>
      <Popconfirm
        title="Sure to cancel?"
        disabled={isLoadingPartial}
        onConfirm={async () => {
          try {
            await closeAll(row);
            toast.success("Position closed.");
            setAmount("");
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

export default ClosePosition;
