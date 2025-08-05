import { useNavigate, useParams } from "react-router";
import { useGetCoinDetailsDataQuery } from "../../Services/Market";
import { StyledAboutCoinPopover } from "./AboutCoinPopover.styles";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { Button, Dropdown } from "antd";
import { ROUTES } from "../../Constants/Routes";
import { useCallback } from "react";
import { convertToMillionFormat } from "../../Common/Common";
import moment from "moment";
const AboutCoinPopover = () => {
  const { id } = useParams();
  const { data: coinDetails } = useGetCoinDetailsDataQuery(id?.toUpperCase());
  const navigate = useNavigate();
  const getExplorerItems = useCallback(() => {
    return coinDetails?.data?.data?.explorer?.map((item, i) => {
      return {
        key: i,
        label: (
          <a target="_blank" rel="noopener noreferrer" href={item}>
            {item}
          </a>
        ),
      };
    });
  }, [coinDetails]);
  return (
    <StyledAboutCoinPopover>
      <div className="coin-name">
        <img src={coinDetails?.data?.data?.logo} alt="coin-logo" />
        <span>{coinDetails?.data?.data?.name}</span>
      </div>
      <p className="desc">{coinDetails?.data?.data?.description || "null"}</p>
      <div className="basic-info-details">
        <p className="title">Basic Info</p>
        <div className="details-container">
          <div className="details">
            <p className="label">Date of Issue</p>
            <p className="value">
              {moment(coinDetails?.data?.data?.date_launched)?.format(
                "MMMM Do YYYY, h:mm:ss a"
              ) || "null"}
            </p>
          </div>

          <div className="details">
            <p className="label">Total Market Cap(USD)</p>
            <p className="value">
              {coinDetails?.data?.cl?.market_cap
                ? convertToMillionFormat(coinDetails?.data?.cl?.market_cap)
                : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="basic-info-details">
        <p className="title">Links</p>
        <div className="links-container">
          <a href={coinDetails?.data?.data?.website?.[0]}>
            {coinDetails?.data?.data?.name}{" "}
            <FaExternalLinkAlt size={12} className="link-icon" />
          </a>
          <Dropdown
            menu={{
              items: getExplorerItems()?.length > 0 ? getExplorerItems() : [],
            }}
            placement="bottom"
          >
            <Button>
              Block Explorer <BiChevronDown />
            </Button>
          </Dropdown>

          <a
            target="_blank"
            rel="noreferrer"
            href={coinDetails?.data?.data?.whitepaper?.[0]}
          >
            Whitepaper <FaExternalLinkAlt size={12} className="link-icon" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={coinDetails?.data?.data?.source_code?.[0]}
          >
            Source Code <FaExternalLinkAlt size={12} className="link-icon" />
          </a>
        </div>
      </div>
      <Button
        onClick={() => navigate(`${ROUTES.COINDETAILS.replace(":id", id)}`)}
        className="button"
      >
        View more
      </Button>
    </StyledAboutCoinPopover>
  );
};

export default AboutCoinPopover;
