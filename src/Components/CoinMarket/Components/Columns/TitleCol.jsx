import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { RiStarSFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../../../Services/Auth";
import { toast } from "react-toastify";
import { useTheme } from "styled-components";

const TitleCol = ({ row, favTokens, setFavToken }) => {
  const token = useSelector((state) => state.global.token);
  const theme = useTheme();

  const { data: user } = useGetUserQuery(
    {},
    {
      skip: !token,
    }
  );
  const hasFavourite = favTokens?.data?.filter((data) => {
    return String(data?.symbol).toLowerCase() ===
      String(row?.symbol).toLowerCase()
      ? data
      : "";
  });
  const handleFavourite = async (e) => {
    e.stopPropagation();
    if (user?.user?.email) {
      try {
        const data = {
          base_asset: row?.symbol?.split("/")?.[0],
          quote_asset: row?.symbol?.split("/")?.[1],
          email: user?.user?.email,
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
      color="lightgrey"
    />
  );
};
export default TitleCol;
