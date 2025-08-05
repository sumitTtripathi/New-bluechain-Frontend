import { Button, Card, Form, Input, Select, Steps, Table } from "antd";
import { IconSelect, SelectedToken } from "../Asset.styles";
import { BsChevronRight, BsStack } from "react-icons/bs";
import { useTheme } from "styled-components";
import { HistoryContainer } from "../../Spot/Spot.styles";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  useGetCurrencyInfoQuery,
  useGetAccountInfoQuery,
  useGetWithdrawHistoryQuery,
  useWithdrawMutation,
} from "../../../Services/Transaction";
import BindMobile from "../../../Components/BindMobile/BindMobile";
import WithdrawModal from "./WithdrawModal/WithdrawModal";
import { useEffect, useMemo, useRef, useState } from "react";
import { useScrollTop } from "../../../Hooks/useScrollTop";
import coinJson from "../../../Constants/Coin.json";
import { useGetUserQuery } from "../../../Services/Auth";
import BindTotp from "../../../Components/BindTotp/BindTotp";
import OtpModal from "../../../Components/OtpModal/OtpModal";
import moment from "moment";
import { depositState } from "../../../Constants/state";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
const NetworkList = ({
  setSelectedNetwork,
  selectedNetwork,
  networkList,
  setCurrentStep,
}) => {
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {networkList?.map((item, i) => {
        return (
          <SelectedToken
            key={i}
            active={selectedNetwork?.chain === item?.chain}
            onClick={() => {
              setSelectedNetwork(item);
              setCurrentStep(3);
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
const defaultValues = {
  amount: "",
  address: "",
};

const Withdraw = () => {
  useScrollTop();
  const params = useParams();
  const { data: currencyInfo } = useGetCurrencyInfoQuery();
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
  const { data: withdrawHistory } = useGetWithdrawHistoryQuery({
    startDate: "",
    endDate: "",
  });
  const [withdraw, { isLoading: withdrawLoading }] = useWithdrawMutation();
  const [form] = Form.useForm();
  const bindMobileRef = useRef();
  const bindTotpRef = useRef();
  const otpModalRef = useRef();
  const [balanceInfo, setBalanceInfo] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState({
    value: params?.id ? params?.id : "",
    label: params?.id ? params?.id : "Select Currency",
  });
  const [currencyOption, setCurrencyOption] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [networkList, setNetworkList] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const theme = useTheme();
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
        title: "Withdraw Address",
        dataIndex: "to",
        key: "address",
      },
      {
        title: "Fee",
        dataIndex: "fee",
        key: "txId",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrency]);

  useEffect(() => {
    if (params?.id) {
      setSelectedCurrency({ value: params?.id, label: params?.id });
    }
  }, [params]);

  useEffect(() => {
    const availableBal = accountInfo?.data?.filter((item) =>
      String(item?.ccy).toLowerCase() ===
      String(selectedCurrency?.value).toLowerCase()
        ? item
        : ""
    );
    setBalanceInfo(availableBal);
  }, [selectedCurrency, accountInfo]);
  const handleSubmit = async (values) => {
    try {
      const response = await withdraw({ ...values }).unwrap();
      if (response?.data?.data[0]?.ordId) {
        toast.success("Withdraw is successful.");
      }
    } catch (error) {
      toast.error(error?.data?.message);
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
        <BsStack color={theme.colors.blue.dark} />
        <h1 style={{ color: theme.colors.black }}> Withdraw </h1>
      </div>
      <Card
        className="filters"
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
                            defaultValue={selectedCurrency}
                            bordered={false}
                            onChange={(_, option) => {
                              setSelectedCurrency(option);
                              setCurrentStep(1);
                            }}
                            style={{
                              width: "100%",
                            }}
                            options={currencyOption}
                          />
                        </IconSelect>
                        {/* <div className="transfer-container">
                          <div>Transfer Mode</div>
                          <div className="flexbox">
                            <span
                              className={`${
                                transferMode === "NORMAL"
                                  ? "transfer-active"
                                  : "transfer-type"
                              }`}
                              onClick={() => {
                                setTransferMode("NORMAL");
                              }}
                            >
                              Normal Transfer
                            </span>
                            <span
                              className={`${
                                transferMode === "INTER"
                                  ? "transfer-active"
                                  : "transfer-type"
                              }`}
                              onClick={() => {
                                setTransferMode("INTER");
                              }}
                            >
                              Inter-User Transfer (0 Fee)
                            </span>
                          </div>
                        </div> */}
                      </div>
                    ),
                  },
                  {
                    title: (
                      <div style={{ width: "100%" }}>
                        <div className="generate-container">
                          <div className="theme-text">
                            Fill in Withdrawal Info
                          </div>
                          <div></div>
                          {/* <div>Coin Unique Identifier <AiOutlineInfoCircle />
                      </div>  */}
                        </div>
                        <div className="flex-box">
                          <span
                            style={{
                              fontSize: "12px",
                              color: theme.colors.grey.semiDark,
                            }}
                          >
                            {" "}
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
                        selectedNetwork={selectedNetwork}
                        networkList={networkList}
                        setCurrentStep={setCurrentStep}
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
                <div className="theme-text">Withdrawal limit</div>
              </div>
              <div className="coin-row coin-label">
                <div>
                  <div>24H Withdrawal Amount</div>
                </div>
                <div>
                  {selectedNetwork?.canWithdraw} {selectedCurrency?.value}
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
                  <span className="scratch-orange">
                    {selectedNetwork?.minDep}
                  </span>{" "}
                  {selectedCurrency?.value}
                </div>
              </div>
              <div className=" coin-label">
                <div style={{ textAlign: "left" }}>
                  Arrival time: Normal Transfers are sent via crypto network,
                  and the arrival time depends on the number of confirmations
                  required by the recipient.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={{ flex: 1 }}>
            <div className="action-container">
              {/* step 1  for the withdraw*/}

              {/* <div>Complete Withdraw in 2 steps</div> */}
              {!isValid && (
                <div className="withdraw-step-container step-container">
                  <div
                    className={`${
                      currentStep === 3 ? "step-heading-active" : ""
                    } withdraw-step`}
                  >
                    <div
                      className={`${
                        currentStep === 3 ? "step-heading-active" : ""
                      } step-heading theme-text`}
                    >
                      1
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div className="theme-text">
                        Set Security Authentication
                      </div>
                      <div>
                        <span
                          className="font-blue"
                          onClick={() => {
                            if (user?.user?.phone_number) {
                              otpModalRef?.current?.showModal();
                            } else {
                              bindMobileRef?.current?.showModal();
                            }
                          }}
                        >
                          {" "}
                          {user?.user?.phone_number
                            ? "send OTP"
                            : "Bind Mobile"}
                        </span>{" "}
                        <BindMobile ref={bindMobileRef} />
                        <OtpModal
                          ref={otpModalRef}
                          user={user}
                          setIsValid={setIsValid}
                          setCurrentStep={setCurrentStep}
                        />
                        <span className="theme-text">or</span>{" "}
                        <span
                          onClick={() => {
                            bindTotpRef?.current?.showModal();
                          }}
                          className="font-blue"
                        >
                          {user?.user?.totp_flag
                            ? "ToTP Authenticator"
                            : "Bind ToTP"}
                        </span>
                        <BindTotp ref={bindTotpRef} />
                      </div>
                    </div>
                  </div>
                  <BsChevronRight style={{ height: "auto" }} />
                  <div
                    className={`${
                      currentStep === 4 ? "step-heading-active" : ""
                    } withdraw-step`}
                  >
                    <div className="step-heading theme-text">2</div>
                    <div className="theme-text">Withdraw</div>
                  </div>
                </div>
              )}

              {/* step 2 withdraw */}
              {isValid && (
                <Form
                  onFinish={handleSubmit}
                  initialValues={defaultValues}
                  form={form}
                >
                  <div>
                    <div>
                      <div
                        className="justify-between"
                        style={{ marginBottom: "20px" }}
                      >
                        <div className="theme-text">Withdrawal Address</div>
                        <div className="theme-text">
                          Withdrawal to a decentralized wallet ?
                          <span className="font-blue"> Try ViaWallet</span>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          background: theme.colors.withdrawContainer,
                          border: `1px solid rgba(123, 116, 133, 0.2)`,
                          padding: "8px 10px",
                        }}
                      >
                        <Form.Item
                          name="address"
                          rules={[
                            {
                              required: true,
                              message: "Please fill the address.",
                            },
                            {
                              validator: (_, value) => {
                                if (parseFloat(value) === 0) {
                                  return Promise.reject(
                                    "Address cannot be zero."
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
                            style={{
                              flex: "1",
                              border: "none",
                              padding: "5px",
                              background: theme.colors.withdrawContainer,
                              color: theme.colors.black,
                              outline: "none",
                            }}
                            type="text"
                          />
                        </Form.Item>
                        <img
                          style={{ width: "60px", height: "25px" }}
                          src="/Logo/WalletIcon.svg"
                          alt="address img"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="justify-between">
                        <div className="theme-text">Receive amount</div>
                        <div className="theme-text">
                          Withdrawal Amount: USDT
                        </div>
                      </div>
                      <div className="withdraw-input-container">
                        <div className="withdraw-input">
                          <Form.Item
                            name="amount"
                            rules={[
                              {
                                required: true,
                                message: "Please enter the amount.",
                              },
                              {
                                pattern: /^[+]?\d+(\.\d+)?$/,
                                message: "Please enter a valid amount.",
                              },
                              {
                                validator: (_, value) => {
                                  if (parseFloat(value) === 0) {
                                    return Promise.reject(
                                      "Amount cannot be zero."
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
                              style={{
                                flex: "1",
                                border: "none",
                                padding: "5px",
                                color: theme.colors.black,
                                background: theme.colors.withdrawContainer,
                                outline: "none",
                              }}
                              type="text"
                            />
                          </Form.Item>
                          <div>
                            <span
                              className="side-label"
                              style={{
                                borderRight: `1px solid ${theme.colors.black}`,
                                fontWeight: "bold",
                                paddingRight: "10px",
                                marginRight: "10px",
                                color: theme.colors.black,
                                cursor: "pointer",
                              }}
                            >
                              USDT
                            </span>
                            <span className="font-blue side-label">ALL</span>
                          </div>
                        </div>
                        <div
                          style={{
                            borderTop: "1px dashed grey",
                            color: theme.colors.grey.dark,
                          }}
                        >
                          <div className="gap-20">
                            <div>Max Withdrawal Fee:</div>
                            <div>
                              <span className="font-bold">0.66</span>
                              <span>USDT</span>
                            </div>
                          </div>
                          <div className="gap-20">
                            <div>Min Withdrawal Fee</div>
                            <div>
                              <span className="font-bold">0.66</span>
                              <span>USDT</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="font-blue" style={{ marginTop: "10px" }}>
                        Add Remark
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="Withdraw-btn"
                      disabled={withdrawLoading || user?.user?.acc_freeze}
                    >
                      Withdraw
                    </Button>
                  </div>
                </Form>
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
        title=""
        style={{
          marginTop: 20,
          width: "100%",
        }}
      >
        <Table
          className="order-table"
          dataSource={withdrawHistory?.data?.history || []}
          columns={columns}
        />
      </Card>
      <WithdrawModal
        isModalOpen={isModalOpen}
        handleOk={() => {}}
        handleCancel={() => setIsModalOpen(false)}
      />
    </HistoryContainer>
  );
};

export default Withdraw;
