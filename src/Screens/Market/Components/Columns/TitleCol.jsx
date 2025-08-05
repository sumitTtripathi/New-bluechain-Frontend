import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { RiStarSFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useTheme } from "styled-components";
import { useGetUserQuery } from "../../../../Services/Auth";
import { useSelector } from "react-redux";

const TitleCol = ({ item, row, favTokens, setFavToken }) => {
  const theme = useTheme();
  const token = useSelector((state) => state.global.token);
  const { data: user } = useGetUserQuery(
    {},
    {
      skip: !token,
    }
  );
  const hasFavourite = favTokens?.data?.filter((data) => {
    return String(data?.symbol).toLowerCase() ===
      String(`${row?.symbol}/USDT`).toLowerCase()
      ? data
      : "";
  });
  const handleFavourite = async (e) => {
    e.stopPropagation();
    if (user?.user?.email) {
      try {
        const data = {
          base_asset: row?.symbol?.split("/")?.[0],
          quote_asset: "USDT",
          email: user.user.email,
        };
        const response = await setFavToken(data).unwrap();
        toast.success(response?.message);
      } catch (err) {
        toast.error(err?.data?.message);
      }
    } else {
      toast.error("Please Login");
    }
  };
  return hasFavourite?.length > 0 ? (
    <AiTwotoneStar
      onClick={handleFavourite}
      style={{ cursor: "pointer" }}
      size={16}
      color={theme.colors.aiStar}
    />
  ) : (
    <RiStarSFill
      onClick={handleFavourite}
      style={{ cursor: "pointer" }}
      size={16}
      color="#3D3D3D"
    />
  );
};

export default TitleCol;
