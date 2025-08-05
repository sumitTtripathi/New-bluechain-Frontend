import { Button, Spin } from "antd";
import HighchartsReact from "highcharts-react-official";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BsChevronDown, BsFullscreen } from "react-icons/bs";
import Highcharts from "highcharts/highstock";
import { IoIosTrendingUp } from "react-icons/io";
import { useTheme } from "styled-components";
import KlineChart from "../KlineChart/KlineChart";
import FullKlineChart from "../FullKlineChart/FullKlineChart";
import { CoinPopover } from "../../Screens/Perpetual/Spot.styles";
import IndicatorModal from "./IndicatorModal";

const rowStyle = {
  display: "flex",
  gap: "10px",
  lineHeight: "50px",
};

const Chart = ({
  candleStick,
  candleStickMore,
  isFetching,
  setScrollTime,
  timeZone,
  setTimezone,
  depthOrderBook,
}) => {
  const theme = useTheme();
  const fullscreenRef = useRef();
  const [FullScreenHeight, setFullScreenHeight] = useState(400);
  const [indicators, setIndicators] = useState("");
  const [iframeLoading, setIframeLoading] = useState(false);
  const [candlestickChartView, setCandlestickChartView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const timeResolStyle = {
    height: "24px",
    minWidth: "80px",
    fontSize: "12px",
    lineHeight: "24px",
    color: theme.colors.grey.shade1,
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: theme.colors.grey.semiLight,
    borderRadius: "4px",
    marginBottom: "10px",
    fontWeight: "900",
  };

  const mypopoverContent = (
    <div className="">
      <div className="time-row" style={rowStyle}>
        <span
          className={`${
            timeZone === "1m" ? "popover-active" : ""
          } time-resolution`}
          style={timeResolStyle}
          onClick={() => {
            setTimezone("1m");
          }}
        >
          1m
        </span>
        <span
          className={`${
            timeZone === "3m" ? "popover-active" : ""
          } time-resolution`}
          style={timeResolStyle}
          onClick={() => {
            setTimezone("3m");
          }}
        >
          3m
        </span>
        <span
          className={`${
            timeZone === "5m" ? "popover-active" : ""
          } time-resolution`}
          style={timeResolStyle}
          onClick={() => {
            setTimezone("5m");
          }}
        >
          5m
        </span>
      </div>
      <div className="time-row" style={rowStyle}>
        <span
          className={`${
            timeZone === "15m" ? "popover-active" : ""
          } time-resolution`}
          style={timeResolStyle}
          onClick={() => {
            setTimezone("15m");
          }}
        >
          15m
        </span>
        <span
          className={`${
            timeZone === "30m" ? "popover-active" : ""
          } time-resolution`}
          style={timeResolStyle}
          onClick={() => {
            setTimezone("30m");
          }}
        >
          30m
        </span>
        <span
          className={`${
            timeZone === "1H" ? "popover-active" : ""
          } time-resolution`}
          style={timeResolStyle}
          onClick={() => {
            setTimezone("1H");
          }}
        >
          1h
        </span>
      </div>
      <div className="time-row" style={rowStyle}>
        <span
          className={`${
            timeZone === "4H" ? "popover-active" : ""
          } time-resolution`}
          style={timeResolStyle}
          onClick={() => {
            setTimezone("4H");
          }}
        >
          4h
        </span>
        <span
          className={`${
            timeZone === "1D" ? "popover-active" : ""
          } time-resolution`}
          style={timeResolStyle}
          onClick={() => {
            setTimezone("1D");
          }}
        >
          1d
        </span>
        <span
          className={`${
            timeZone === "2D" ? "popover-active" : ""
          } time-resolution`}
          style={timeResolStyle}
          onClick={() => {
            setTimezone("2D");
          }}
        >
          2d
        </span>
      </div>
      <div className="time-row" style={rowStyle}>
        <span
          className={`${
            timeZone === "1W" ? "popover-active" : ""
          } time-resolution`}
          style={timeResolStyle}
          onClick={() => {
            setTimezone("1W");
          }}
        >
          1w
        </span>
        <span
          className={`${
            timeZone === "1M" ? "popover-active" : ""
          } time-resolution`}
          style={timeResolStyle}
          onClick={() => {
            setTimezone("1M");
          }}
        >
          1M
        </span>
      </div>
    </div>
  );
  const depthChartOptions = useMemo(() => {
    return {
      chart: {
        type: "area",
      },
      credits: {
        enabled: false,
      },
      navigator: {
        enabled: false,
      },
      scrollbar: {
        enabled: false,
      },
      rangeSelector: {
        enabled: false,
      },
      title: null,
      xAxis: {
        minPadding: 0,
        maxPadding: 0,
        title: null,
      },
      yAxis: [
        {
          lineWidth: 1,
          gridLineWidth: 1,
          title: null,
          tickWidth: 1,
          tickLength: 5,
          tickPosition: "inside",
          labels: {
            align: "left",
            x: 8,
          },
        },
        {
          opposite: false,
          linkedTo: 0,
          lineWidth: 1,
          gridLineWidth: 0,
          title: null,
          tickWidth: 1,
          tickLength: 5,
          tickPosition: "inside",
          labels: {
            align: "right",
            x: -8,
          },
        },
      ],
      legend: {
        enabled: false,
      },
      plotOptions: {
        area: {
          fillOpacity: 0.2,
          lineWidth: 1,
          step: "center",
        },
      },
      tooltip: {
        headerFormat:
          '<span style="font-size=10px;">Price: {point.key}</span><br/>',
        valueDecimals: 2,
      },
      series: [
        {
          name: "Bids",
          data: depthOrderBook?.bids,
          color: theme.colors.marketUp,
        },
        {
          name: "Asks",
          data: depthOrderBook?.asks,
          color: theme.colors.marketDown,
        },
      ],
    };
  }, [theme, depthOrderBook]);

  // handling exit full screen
  const exitHandler = useCallback(() => {
    if (
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setFullScreenHeight(400);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("indicator", "hasIndicator");

    window.addEventListener("storage", (e) => {
      if (e.key === "indicator") {
        sessionStorage.clear();
        setIframeLoading(true);
        setIndicators("");
        setTimeout(() => {
          setIframeLoading(false);
        }, 2000);
      }
    });
    return () => {
      window.removeEventListener("storage", () => {});
    };
  }, []);
  useEffect(() => {
    window.addEventListener("fullscreenchange", exitHandler, false);
    return () =>
      window.removeEventListener("fullscreenchange", exitHandler, false);
  }, [exitHandler]);
  return (
    <>
      <p className="title">Chart</p>
      <div ref={fullscreenRef}>
        <div className="chart-settings-container">
          <div className="right">
            <div className="graph-switch-btns">
              <Button
                onClick={() =>
                  !candlestickChartView && setCandlestickChartView(true)
                }
                className={`chart-switch-btn ${
                  candlestickChartView && "active"
                }`}
              >
                Candlesticks
              </Button>
              <Button
                onClick={() =>
                  candlestickChartView && setCandlestickChartView(false)
                }
                className={`chart-switch-btn ${
                  !candlestickChartView && "active"
                }`}
              >
                Depth
              </Button>
            </div>
            <div className="graph-switch-btns">
              <BsFullscreen
                color={theme.colors.black}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (document.fullscreenElement) {
                    // exitFullscreen is only available on the Document object.
                    document.exitFullscreen();
                    setTimeout(() => {
                      setFullScreenHeight(400);
                    }, 200); // seTimeout is used to maintain the chart width
                  } else {
                    fullscreenRef?.current?.requestFullscreen();
                    setFullScreenHeight("91.5vh");
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ height: FullScreenHeight }}>
          {candlestickChartView ? (
            <>
              <div className="my-toolbar my-icon-border">
                <span>Time</span>
                <span
                  onClick={() => {
                    setTimezone("15m");
                  }}
                  className={`${timeZone === "15m" ? "toolbar-active" : ""}`}
                >
                  15m
                </span>
                <span
                  className={`${timeZone === "30m" ? "toolbar-active" : ""}`}
                  onClick={() => {
                    setTimezone("30m");
                  }}
                >
                  30m
                </span>
                <span
                  className={`${timeZone === "1H" ? "toolbar-active" : ""}`}
                  onClick={() => {
                    setTimezone("1H");
                  }}
                >
                  1h
                </span>
                <CoinPopover
                  placement="bottom"
                  trigger="click"
                  content={mypopoverContent}
                  className="time-popover"
                >
                  <span
                  // onClick={() =>{setTimezone("D")}}
                  >
                    4h
                    <BsChevronDown
                      color={theme.colors.black}
                      style={{
                        width: "15px",
                        marginLeft: 6,
                        position: "relative",
                        top: "4px",
                      }}
                    />
                  </span>
                </CoinPopover>
                {FullScreenHeight === 400 && (
                  <span
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    <IoIosTrendingUp />
                  </span>
                )}
              </div>
              {iframeLoading && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spin size="medium" />
                </div>
              )}
              {!iframeLoading && FullScreenHeight === 400 && (
                <div className="tradingview-widget-container">
                  <KlineChart
                    setScrollTime={setScrollTime}
                    isFetching={isFetching}
                    candleStick={candleStick || []}
                    candleStickMore={candleStickMore || []}
                    indicators={indicators}
                  />
                </div>
              )}
              {!iframeLoading && FullScreenHeight !== 400 && (
                <div className="tradingview-widget-container">
                  <FullKlineChart
                    setScrollTime={setScrollTime}
                    isFetching={isFetching}
                    candleStick={candleStick || []}
                    candleStickMore={candleStickMore || []}
                    indicators={indicators}
                  />
                </div>
              )}
            </>
          ) : (
            <HighchartsReact
              containerProps={{ style: { height: "100%" } }}
              highcharts={Highcharts}
              options={depthChartOptions}
              immutable={true}
              constructorType={"stockChart"}
            />
          )}
        </div>
        <IndicatorModal
          setIframeLoading={setIframeLoading}
          setIndicators={setIndicators}
          isModalOpen={isModalOpen}
          handleCancel={() => {
            setIsModalOpen(false);
          }}
        />
      </div>
    </>
  );
};

export default Chart;
