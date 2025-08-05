// import { Button } from "antd";
// import { JustifyBetween, StyledMarketTable } from "../Asset.styles";
// import { useTheme } from "styled-components";
// import { useScrollTop } from "../../../Hooks/useScrollTop";
// import { AiOutlineSearch } from "react-icons/ai";
// import {
//   useGetAccountInfoQuery,
//   useGetCurrencyInfoQuery,
// } from "../../../Services/Transaction";
// import CoinJson from "../../../Constants/Coin.json";
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { Helmet } from "react-helmet";
// import { StyledTableSpan } from "../../../GlobalStyles";
// import { ROUTES } from "../../../Constants/Routes";
// import { StyledSearchInput } from "../../Market/Market.styles";
// import {
//   useGetSearchMarketDataQuery,
//   useIncrementSearchMutation,
// } from "../../../Services/Market";
// import { config } from "../../../config";
// import { useSelector } from "react-redux";

// const Asset = ({ navigate }) => {
//   const theme = useTheme();
//   const { data: currencyInfo } = useGetCurrencyInfoQuery();
//   const token = useSelector((state) => state.global.token);

//   const { data: accountInfo } = useGetAccountInfoQuery(
//     {},
//     {
//       skip: !token,
//     }
//   );
//   const [searchValue, setSearchValue] = useState("");
//   const [incrementSearch] = useIncrementSearchMutation();
//   const { data: searchMarketData } = useGetSearchMarketDataQuery(
//     { search: searchValue, quote_asset: "USDT" },
//     {
//       skip: searchValue?.length <= 0,
//     }
//   );
//   const [availBalTotal, setAvailBalTotal] = useState(0);
//   const [currencyOption, setCurrencyOption] = useState([]);
//   const calculateTotal = useCallback(() => {
//     const total = accountInfo?.data?.reduce(
//       (acc, item) => acc + parseFloat(item.availBal),
//       0
//     );
//     setAvailBalTotal(total);
//   }, [setAvailBalTotal, accountInfo]);

//   useEffect(() => {
//     calculateTotal();
//   }, [accountInfo, calculateTotal]);

//   console.log(accountInfo, "accountInfo---------------");

//   useEffect(() => {
//     const filteredArr = [];
//     currencyInfo?.map((item) => {
//       if (!filteredArr?.includes(item?.ccy)) {
//         filteredArr.push(item?.ccy);
//       }
//       return item?.ccy;
//     });
//     const requiredArr = filteredArr?.map((item) => {
//       return { label: item, value: item };
//     });
//     setCurrencyOption(requiredArr);
//   }, [currencyInfo]);

//   useScrollTop();
//   const columns = useMemo(() => {
//     return [
//       {
//         title: "Coin",
//         dataIndex: "value",
//         render: (item) => {
//           return (
//             <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
//               <img
//                 style={{ height: "30px" }}
//                 src={CoinJson[item]}
//                 alt="crypto-icon"
//               />
//               <StyledTableSpan>{item}</StyledTableSpan>
//             </div>
//           );
//         },
//       },
//       {
//         title: "Available",
//         align: "center",
//         dataIndex: "value",
//         render: (item) => {
//           const availableBal = accountInfo?.data?.filter((data) =>
//             data.ccy === item ? data : ""
//           );
//           return <span>{availableBal?.[0]?.availBal || "0"}</span>;
//         },
//       },
//       {
//         title: "Frozen",
//         align: "center",
//         dataIndex: "value",
//         render: (item) => {
//           const availableBal = accountInfo?.data?.filter((data) =>
//             data?.ccy === item ? data : ""
//           );
//           return <span>{availableBal?.[0]?.frozenBal || "0"}</span>;
//         },
//       },
//       {
//         title: "Operation",
//         align: "center",
//         dataIndex: "value",
//         render: (item) => {
//           return (
//             <span>
//               <span
//                 onClick={() => {
//                   navigate(`${ROUTES.WITHDRAW}/${item}`);
//                 }}
//                 className="text-blue mr-5"
//               >
//                 Withdraw
//               </span>{" "}
//               <span
//                 onClick={() => {
//                   navigate(`${ROUTES.DEPOSIT}/${item}`);
//                 }}
//                 className="text-blue"
//               >
//                 Deposit
//               </span>
//             </span>
//           );
//         },
//       },
//     ];
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [accountInfo]);
//   return (
//     <div className="settings-main">
//       <Helmet>
//         <title>{config?.APP_NAME}</title>
//       </Helmet>
//       <div className="settings-change-container asset-tab">
//         <JustifyBetween>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "3px",
//               alignItems: "start",
//             }}
//           >
//             <div style={{ color: theme.colors.black }}>Est. Assets</div>
//             <div>
//               <p className="last-change-date">
//                 <span style={{ color: theme.colors.black }}>
//                   {availBalTotal || 0}{" "}
//                 </span>
//                 <img src="/Logo/Icons/tild.svg" alt="" />{" "}
//                 <span style={{ color: theme.colors.black }}>USD</span>
//               </p>
//             </div>
//           </div>
//           <JustifyBetween>
//             <Button
//               onClick={() => {
//                 navigate(`${ROUTES.DEPOSIT}`);
//               }}
//               className="spot-deposit-btn"
//             >
//               <img src="/Logo/Icons/deposit.svg" alt="" />
//               <span className="deposit-btn-span">Deposit</span>
//             </Button>
//             <Button
//               onClick={() => {
//                 navigate(`${ROUTES.WITHDRAW}`);
//               }}
//               className="spot-withdraw-btn"
//             >
//               <img src="/Logo/Icons/withdrawal.svg" alt="" />
//               <span className="withdraw-btn-span">Withdrawal</span>
//             </Button>
//           </JustifyBetween>
//         </JustifyBetween>
//       </div>
//       <div className="settings-change-container asset-tab">
//         <StyledSearchInput
//           size="large"
//           placeholder="Search by coin/ token"
//           className="market-input"
//           showSearch
//           prefixIcon={<AiOutlineSearch />}
//           onChange={async (value) => {
//             await incrementSearch(value).unwrap();
//             navigate(`${ROUTES.COINDETAILS?.replace(":id", value)}`);
//           }}
//           onSearch={(value) => setSearchValue(value?.toLowerCase())}
//           options={searchMarketData}
//         />
//         <StyledMarketTable
//           pagination={false}
//           columns={columns}
//           dataSource={currencyOption}
//         />
//       </div>
//     </div>
//   );
// };

// export default Asset;


import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "antd";
import { JustifyBetween, StyledMarketTable } from "../Asset.styles";
import { useTheme } from "styled-components";
import { useScrollTop } from "../../../Hooks/useScrollTop";
import { AiOutlineSearch } from "react-icons/ai";
import {
  useGetAccountInfoQuery,
} from "../../../Services/Transaction";
import CoinJson from "../../../Constants/Coin.json";
import { Helmet } from "react-helmet";
import { StyledTableSpan } from "../../../GlobalStyles";
import { ROUTES } from "../../../Constants/Routes";
import { StyledSearchInput } from "../../Market/Market.styles";
import {
  useGetSearchMarketDataQuery,
  useIncrementSearchMutation,
} from "../../../Services/Market";
import { config } from "../../../config";
import { useSelector } from "react-redux";

const Asset = ({ navigate }) => {
  const theme = useTheme();
  const token = useSelector((state) => state.global.token);

  // 1) Fetch balances
  const { data: accountInfo } = useGetAccountInfoQuery(
    {},
    { skip: !token }
  );

  // 2) Compute total USD estimate (summing free balances as-is)
  const [availBalTotal, setAvailBalTotal] = useState(0);
  const calculateTotal = useCallback(() => {
    const total = accountInfo?.data?.reduce(
      (acc, item) => acc + parseFloat(item.free),
      0
    );
    setAvailBalTotal(total);
  }, [accountInfo]);
  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  // 3) Search box state & mutations
  const [searchValue, setSearchValue] = useState("");
  const [incrementSearch] = useIncrementSearchMutation();
  const { data: searchMarketData } = useGetSearchMarketDataQuery(
    { search: searchValue, quote_asset: "USDT" },
    { skip: searchValue.length === 0 }
  );

  // 4) Scroll to top on mount
  useScrollTop();

  // 5) Build table rows from API data
  const rows = useMemo(() => {
    return (
      accountInfo?.data.map((item) => ({
        key: item?.asset,
        asset: item?.asset,
        free: item?.free,
        locked: item?.locked,
      })) || []
    );
  }, [accountInfo]);

  // 6) Table columns
  const columns = useMemo(
    () => [
      {
        title: "Coin",
        dataIndex: "asset",
        key: "asset",
        render: (asset) => (
          <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
            <img
              src={CoinJson[asset]}
              alt={`${asset} icon`}
              style={{ height: 30 }}
            />
            <StyledTableSpan>{asset}</StyledTableSpan>
          </div>
        ),
      },
      {
        title: "Available",
        dataIndex: "free",
        key: "free",
        align: "center",
        render: (free) => <span>{free || "0"}</span>,
      },
      {
        title: "Frozen",
        dataIndex: "locked",
        key: "locked",
        align: "center" ,
        render: (locked) => <span>{locked || "0"}</span>,
      },
      {
        title: "Operation",
        key: "operation",
        align: "center",
        render: (record) => (
          <span>
            <span
              className="text-blue mr-5"
              onClick={() =>
                navigate(`${ROUTES.WITHDRAW}/${record.asset}`)
              }
            >
              Withdraw
            </span>
            <span
              className="text-blue"
              onClick={() =>
                navigate(`${ROUTES.DEPOSIT}/${record.asset}`)
              }
            >
              Deposit
            </span>
          </span>
        ),
      },
    ],
    [navigate]
  );

  return (
    <div className="settings-main">
      <Helmet>
        <title>{config.APP_NAME}</title>
      </Helmet>

      {/* Est. Assets Header */}
      <div className="settings-change-container asset-tab">
        <JustifyBetween>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ color: theme.colors.black }}>Est. Assets</div>
            <p className="last-change-date">
              <span style={{ color: theme.colors.black }}>
                {availBalTotal?.toFixed(2)}{" "}
              </span>
              <img src="/Logo/Icons/tild.svg" alt="~" />{" "}
              <span style={{ color: theme.colors.black }}>USD</span>
            </p>
          </div>

          <JustifyBetween>
            <Button
              onClick={() => navigate(ROUTES.DEPOSIT)}
              className="spot-deposit-btn"
            >
              <img src="/Logo/Icons/deposit.svg" alt="Deposit" />
              <span className="deposit-btn-span">Deposit</span>
            </Button>
            <Button
              onClick={() => navigate(ROUTES.WITHDRAW)}
              className="spot-withdraw-btn"
            >
              <img src="/Logo/Icons/withdrawal.svg" alt="Withdraw" />
              <span className="withdraw-btn-span">Withdrawal</span>
            </Button>
          </JustifyBetween>
        </JustifyBetween>
      </div>

      {/* Search + Balances Table */}
      <div className="settings-change-container asset-tab">
        <StyledSearchInput
          size="large"
          placeholder="Search by coin/token"
          showSearch
          prefixIcon={<AiOutlineSearch />}
          onChange={async (value) => {
            await incrementSearch(value).unwrap();
            navigate(ROUTES.COINDETAILS.replace(":id", value));
          }}
          onSearch={(value) => setSearchValue(value.toLowerCase())}
          options={searchMarketData}
        />

        <StyledMarketTable
          pagination={false}
          columns={columns}
          dataSource={rows}
        />
      </div>
    </div>
  );
};

export default Asset;
