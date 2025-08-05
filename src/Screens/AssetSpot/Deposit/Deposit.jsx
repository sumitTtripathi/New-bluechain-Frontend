import { Button, Card, Input, Popover, Select, Steps, Table } from "antd";
import { IconSelect, SelectedToken } from "../Asset.styles";
import { BsStack } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { HistoryContainer } from "../../Spot/Spot.styles";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useTheme } from "styled-components";
import {
  useGenerateDespositAddressMutation,
  useGetCurrencyInfoQuery,
  useGetDepositAddressQuery,
  useGetDepositHistoryQuery,
  useGetAccountInfoQuery,
} from "../../../Services/Transaction";
import { useEffect, useMemo, useState } from "react";
import { useScrollTop } from "../../../Hooks/useScrollTop";
import moment from "moment";
import coinJson from "../../../Constants/Coin.json";
import { depositState } from "../../../Constants/state";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";
const NetworkList = ({
  setCurrentStep,
  setSelectedNetwork,
  selectedNetwork,
  networkList,
  setConfirmed,
  setAwareCheck,
}) => {
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {networkList?.map((item, i) => {
        return (
          <SelectedToken
            key={i}
            active={selectedNetwork?.chain === item?.chain}
            onClick={() => {
              if (item?.canDep) {
                setSelectedNetwork(item);
                setCurrentStep(2);
                setConfirmed(false);
                setAwareCheck(false);
              } else {
                toast.error("Deposit not supported currently");
              }
            }}
          >
            <div className="first-label"> {item?.name} </div>
            <div className="second-label"> {item?.chain} </div>
          </SelectedToken>
        );
      })}
    </div>
  );
};
const Deposit = () => {
  useScrollTop();
  const params = useParams();
  const theme = useTheme();
  const token = useSelector((state) => state.global.token);

  const { data: accountInfo } = useGetAccountInfoQuery(
    {},
    {
      skip: !token,
    }
  );
  const [generateDepositAddress, { isLoading: depositLoading }] =
    useGenerateDespositAddressMutation();
  const { data: depositHistory } = useGetDepositHistoryQuery({
    startDate: "",
    endDate: "",
  });
  const [networkList, setNetworkList] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [balanceInfo, setBalanceInfo] = useState({});
  const [awareCheck, setAwareCheck] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { data: currencyInfo } = useGetCurrencyInfoQuery();

  const [selectedCurrency, setSelectedCurrency] = useState({
    value: params?.id ? params?.id : "",
    label: params?.id ? params?.id : "Select Currency",
  });
  const [currencyOption, setCurrencyOption] = useState([]);
  const { data: generatedDepositAddress } = useGetDepositAddressQuery(
    {
      selectedCurrency: selectedCurrency?.value,
    },
    {
      skip: !selectedCurrency?.value,
    }
  );
  const [generatedAddress, setGeneratedAddress] = useState({});
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const columns = useMemo(() => {
    return [
      {
        title: "Time",
        dataIndex: "ts",
        key: "time",
        render: (item) => {
          return (
            <span>{moment(Number(item)).format("YYYY-MM-DD HH:MM:SS")}</span>
          );
        },
      },
      {
        title: "Currency",
        dataIndex: "ccy",
        key: "coin",
      },
      {
        title: "Amount",
        dataIndex: "amt",
        key: "amount",
      },
      {
        title: "Network",
        dataIndex: "chain",
        key: "network",
      },
      {
        title: "Block Confirmation",
        dataIndex: "actualDepBlkConfirm",
        key: "Block Confirmation",
      },
      {
        title: "Deposit Address",
        dataIndex: "to",
        key: "address",
      },
      {
        title: "Transaction Id",
        dataIndex: "txId",
        key: "txId",
      },
      {
        title: "Deposit Id",
        dataIndex: "depId",
        key: "deposit id",
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        render: (item) => {
          return <span>{depositState[item]}</span>;
        },
      },
    ];
  }, []);

  useEffect(() => {
    if (params?.id) {
      setSelectedCurrency({ value: params?.id, label: params?.id });
    }
  }, [params]);
  useEffect(() => {
    const filteredArr = [];
    currencyInfo?.map((item) => {
      if (!filteredArr?.includes(item?.ccy)) {
        filteredArr.push(item?.ccy);
      }
      return item?.ccy;
    });
    const requiredArr = filteredArr?.map((item) => {
      return { label: item, value: item };
    });
    setCurrencyOption(requiredArr);
  }, [currencyInfo]);

  useEffect(() => {
    setNetworkList(
      currencyInfo?.filter((item) => {
        return selectedCurrency?.value === item?.ccy ? item : "";
      })
    );
  }, [selectedCurrency, currencyInfo]);

  useEffect(() => {
    const availableBal = accountInfo?.data?.filter((item) =>
      String(item?.ccy).toLowerCase() ===
      String(selectedCurrency?.value).toLowerCase()
        ? item
        : ""
    );
    setBalanceInfo(availableBal);
  }, [selectedCurrency, accountInfo]);

  useEffect(() => {
    const resp = generatedDepositAddress?.filter((item) => {
      return selectedNetwork?.chain === item?.chain ? item : "";
    });
    if (resp) setGeneratedAddress(resp[0]);
  }, [selectedNetwork, generatedDepositAddress]);

  const submitNetwork = async () => {
    const resp = generatedDepositAddress?.filter((item) => {
      return selectedNetwork?.chain === item?.chain ? item : "";
    });
    if (!resp[0]?.addr || resp?.length === 0) {
      const response = await generateDepositAddress({
        ccy: selectedCurrency?.value,
        chain: selectedNetwork?.chain,
      });
      if (!response?.error) {
        setGeneratedAddress(response?.data?.data[0]);
        setConfirmed(true);
      } else {
        toast.error(response?.error?.data?.message);
      }
    } else {
      setGeneratedAddress(resp[0]);
      setConfirmed(true);
    }
  };

  return (
    <HistoryContainer>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "20px",
        }}
        className="profile-container"
      >
        <BsStack color={theme?.colors?.blue.dark} />
        <h1 className="theme-text"> Deposit </h1>
      </div>
      <Card
        className="filters"
        // title="Order History"
        style={{
          width: "100%",
        }}
      >
        <div className="step-container">
          <div style={{ flex: 1 }}>
            <div className="action-container">
              <Steps
                direction="vertical"
                current={currentStep}
                items={[
                  {
                    title: (
                      <span className="theme-text">Select Coin / Token</span>
                    ),
                    description: (
                      <div className="single-filter">
                        <IconSelect>
                          {selectedCurrency?.value && (
                            <img
                              style={{ width: "25px" }}
                              src={coinJson[selectedCurrency?.value]}
                            />
                          )}
                          <Select
                            // suffixIcon={<BsStack />}
                            defaultValue={selectedCurrency}
                            bordered={false}
                            onChange={(_, option) => {
                              setSelectedCurrency(option);
                              setConfirmed(false);
                              setCurrentStep(1);
                            }}
                            style={{
                              width: "100%",
                            }}
                            options={currencyOption}
                          />
                        </IconSelect>
                      </div>
                    ),
                  },
                  {
                    title: (
                      <div style={{ width: "100%" }}>
                        <div className="generate-container">
                          <div className="theme-text">
                            Generate Deposit Address
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            Coin Unique Identifier
                            <Popover content="The unique identifier for each coin/token is different and distinctive. Please confirm in the blockchain explorer.">
                              <AiOutlineInfoCircle />
                            </Popover>
                          </div>
                        </div>
                        <div className="flex-box">
                          <span
                            style={{
                              fontSize: "12px",
                              color: theme.colors.grey.semiDark,
                            }}
                          >
                            Select Network{" "}
                          </span>{" "}
                          <AiOutlineInfoCircle
                            color={theme.colors.grey.semiDark}
                          />
                        </div>
                      </div>
                    ),
                    description: (
                      <NetworkList
                        setSelectedNetwork={setSelectedNetwork}
                        setCurrentStep={setCurrentStep}
                        selectedNetwork={selectedNetwork}
                        networkList={networkList}
                        setConfirmed={setConfirmed}
                        setAwareCheck={setAwareCheck}
                      />
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="action-container">
              <div className="single-filter">
                <div style={{ width: "80px" }}>
                  <CircularProgressbar
                    styles={{
                      path: {
                        stroke: theme.colors.blue.shade1,
                      },
                    }}
                    strokeWidth={13}
                    value={100}
                    text={``}
                  />
                </div>
                <div className="" style={{ flex: 1 }}>
                  <div className="coin-row coin-header">
                    <div className="theme-text">Total Assets</div>
                    {/* <div className="theme-text">0 {selectedCurrency?.value}</div> */}
                  </div>
                  <div className="coin-row coin-label">
                    <div>
                      <label htmlFor="available">Available</label>
                    </div>
                    <div>
                      {balanceInfo?.[0]?.availBal} {selectedCurrency?.value}
                    </div>
                  </div>
                  <div className="coin-row coin-label">
                    <div>
                      <label htmlFor="Frozen">Frozen</label>
                    </div>
                    <div>
                      {balanceInfo?.[0]?.frozenBal} {selectedCurrency?.value}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="" style={{ flex: 1, marginTop: "20px" }}>
              <div className="coin-row coin-header">
                <div className="theme-text">Attention</div>
              </div>
              <div className="coin-row coin-label">
                <div>
                  <div>Minimum Deposit</div>
                </div>
                <div>
                  {selectedNetwork?.minDep} {selectedCurrency?.value}
                </div>
              </div>
              <div className="coin-row coin-label">
                <div>
                  <div>Crediting</div>
                </div>
                <div>
                  <span className="scratch-orange">
                    {selectedNetwork?.minDepArrivalConfirm}
                  </span>{" "}
                  <span>Confirmation(s)</span>
                </div>
              </div>
              <div className="coin-row coin-label">
                <div>
                  <div>Withdrawal</div>
                </div>
                <div>
                  <span className="scratch-orange">
                    {selectedNetwork?.minWdUnlockConfirm}
                  </span>{" "}
                  <span>Confirmation(s)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={{ flex: 1 }}>
            <div className="action-container">
              {!confirmed &&
                selectedCurrency?.value &&
                selectedNetwork?.chain && (
                  <>
                    <div className="scratch-box">
                      <div className="scratch-heading">
                        <span className="scratch-orange">
                          {selectedNetwork?.chain}
                        </span>{" "}
                        <span className="theme-text">Risk Reminder</span>
                      </div>
                      <div className="theme-text">
                        * The address is ONLY available for{" "}
                        <span className="scratch-orange">
                          {selectedNetwork?.chain}
                        </span>{" "}
                        deposit. Deposit of other assets will lead to permanent
                        asset loss.
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "5px",
                        }}
                      >
                        <div>
                          <Input
                            id="aware"
                            value={awareCheck}
                            style={{ height: "auto !important" }}
                            onChange={() => {
                              setAwareCheck((prev) => !prev);
                            }}
                            type="checkbox"
                            checked={awareCheck}
                          />
                        </div>
                        <label
                          className="theme-text"
                          style={{ cursor: "pointer" }}
                          htmlFor="aware"
                        >
                          I am aware of the risks and would like to proceed
                        </label>
                      </div>
                    </div>
                    <Button
                      disabled={
                        !selectedNetwork?.chain ||
                        !selectedCurrency?.value ||
                        !awareCheck ||
                        depositLoading
                      }
                      onClick={submitNetwork}
                      className="scratch-btn"
                    >
                      Confirm
                    </Button>
                  </>
                )}
              {generatedAddress?.addr && confirmed && (
                <div className="scratch-decoded">
                  <div className="qr-code">
                    <p style={{ fontSize: "20px", color: theme.colors.black }}>
                      {generatedAddress?.addr}
                    </p>
                    <div style={{ height: "200px", width: "180px" }}>
                      <QRCode value={generatedAddress?.addr} size={180} />
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(generatedAddress?.addr);
                        toast.success("Copied successfully");
                      }}
                      className="scratch-icon"
                    >
                      <IoCopyOutline />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="d-none-container" style={{ flex: 1 }}>
            <div className="action-container"></div>
          </div>
        </div>
      </Card>
      <Card
        className="filters"
        title={null}
        style={{
          marginTop: 20,
          width: "100%",
        }}
      >
        <Table
          className="order-table"
          dataSource={depositHistory?.data?.history || []}
          columns={columns}
        />
      </Card>
    </HistoryContainer>
  );
};

export default Deposit;
