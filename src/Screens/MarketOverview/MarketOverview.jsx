import { useNavigate } from "react-router";
import {
  StyledMarketOverviewContainer,
  StyledProgressBar,
} from "./MarketOverview.styles";
import { AiOutlineLeft } from "react-icons/ai";
import Card from "./Card/Card";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { useTheme } from "styled-components";
import { StyledGraphSelect } from "../../GlobalStyles";
import { useMemo, useState } from "react";
import { useScrollTop } from "../../Hooks/useScrollTop";
import {
  useGetMarketOverviewCardsQuery,
  useGetPriceDistributionChartDataQuery,
} from "../../Services/Market";
import FadeLoader from "../../Components/FadeLoader/FadeLoader";
import { Helmet } from "react-helmet";
import { useGetOrderDistributionChartQuery } from "../../Services/Transaction";
import { config } from "../../config";

const MarketOverview = () => {
  useScrollTop();

  const navigate = useNavigate();
  const theme = useTheme();
  const { data: marketOverviewCardsData, isLoading: marketOverviewLoading } =
    useGetMarketOverviewCardsQuery();

  const [chartFilters, setChartFilters] = useState({
    priceChangeDistribution: "12H",
    orderDistribution: "6H",
  });
  const {
    data: orderDistributionData,
    isLoading: orderDistributionDataLoading,
  } = useGetOrderDistributionChartQuery(chartFilters?.orderDistribution);
  const {
    data: priceChangeDistributionData,
    isLoading: getPriceDistributionChartLoading,
  } = useGetPriceDistributionChartDataQuery(
    chartFilters?.priceChangeDistribution
  );

  // Bar Chart configuration
  const barChartOptions = useMemo(() => {
    return {
      credits: {
        enabled: false,
      },
      chart: {
        type: "column",
      },
      title: null,
      subtitle: null,
      legend: {
        enabled: true,
      },
      xAxis: {
        visible: true,
        categories: [
          ...Object.keys(
            priceChangeDistributionData?.data.positiveRangeCount || {}
          ),
          ...Object.keys(
            priceChangeDistributionData?.data.negativeRangeCount || {}
          ),
        ],
        crosshair: true,
      },
      yAxis: { visible: false },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        column: {
          // zones: [
          //   {
          //     value: 10, // Values up to 100 (not including) ...
          //     color: theme.colors.marketUp, // ... have the color marketUp.
          //   },
          //   {
          //     color: theme.colors.marketDown, // Values from 100(including) and up have the color marketDown
          //   },
          // ],
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: "Price Change Distribution",
          data: [
            ...Object.values(
              priceChangeDistributionData?.data.positiveRangeCount || {}
            ).map((item) => item?.value),
            ...Object.values(
              priceChangeDistributionData?.data?.negativeRangeCount || {}
            ).map((item) => item?.value),
          ],
          zoneAxis: "x",
          zones: [
            {
              value: 5,
              color: theme.colors.marketUp, // Color for values less than or equal to 0
            },
            {
              color: theme.colors.marketDown, // Color for values greater than 0
            },
          ],
        },
      ],
    };
  }, [theme, priceChangeDistributionData]);

  const marketChartOptions = useMemo(() => {
    return {
      credits: {
        enabled: false,
      },
      chart: {
        type: "spline",
      },
      title: null,
      subtitle: null,
      tooltip: {
        shared: true,
        headerFormat:
          '<span style="font-size:12px"><b>{point.key}</b></span><br>',
      },
      legend: { enabled: true, symbolRadius: 4 },
      xAxis: {
        gridLineColor: "red",
        tickLength: 0,
      },
      plotOptions: {
        series: {
          xAxis: 0,
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
          pointStart: 2012,
          className: "my-spline",
        },
      },
      series: [
        {
          name: "Ocean transport",
          data: [13234, 12729, 11533, 17798, 10398, 12811, 15483, 16196, 16214],
        },
        {
          name: "Households",
          data: [6685, 6535, 6389, 6384, 6251, 5725, 5631, 5047, 5039],
        },
        {
          name: "Agriculture and hunting",
          data: [4752, 4820, 4877, 4925, 5006, 4976, 4946, 4911, 4913],
        },
        {
          name: "Air transport",
          data: [3164, 3541, 3898, 4115, 3388, 3569, 3887, 4593, 1550],
        },
        {
          name: "Construction",
          data: [2019, 2189, 2150, 2217, 2175, 2257, 2344, 2176, 2186],
        },
      ],
    };
  }, []);

  const pieChartOptions = useMemo(() => {
    return {
      credits: { enabled: false },
      tooltip: { enabled: true },
      chart: {
        plotBorderWidth: null,
        plotShadow: false,
        spacingRight: 0,
        type: "pie",
      },
      title: null,
      legend: {
        enabled: true,
        symbolRadius: 4,
        floating: true,
        verticalAlign: "bottom",
        x: -10,
        y: -20,
      },
      plotOptions: {
        pie: {
          size: "70%",
          allowPointSelect: false,
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
          colors: [theme.colors.marketUp, theme.colors.marketDown],
        },
      },
      series: [
        {
          name: "Composition",
          colorByPoint: true,
          innerSize: "70%",
          data: [
            { y: orderDistributionData?.data?.buy, name: "Buy" },
            {
              y: orderDistributionData?.data?.sell,
              name: "Sell",
            },
          ],
        },
      ],
    };
  }, [theme, orderDistributionData]);
  return (
    <StyledMarketOverviewContainer>
      {(marketOverviewLoading ||
        orderDistributionDataLoading ||
        getPriceDistributionChartLoading) && <FadeLoader />}
      <div onClick={() => navigate(-1)} className="back-btn">
        <AiOutlineLeft />
        <span>Back to Market</span>
      </div>
      <Helmet>
        <title>{config?.APP_NAME}</title>
      </Helmet>
      <div className="cards-container">
        <Card
          title="Top Gainers"
          data={marketOverviewCardsData?.data?.topGainers}
        />
        <Card
          title="Top Losers"
          data={marketOverviewCardsData?.data?.topLosers}
        />
        <Card title="Value Leaders" data={marketOverviewCardsData?.data?.vl} />
        <Card title="Market Cap" data={marketOverviewCardsData?.data?.mc} />
        <Card title="Top Searches" data={marketOverviewCardsData?.data?.ts} />
      </div>
      <div className="row-container grid">
        <div>
          <p className="chart-title-margin">Order Distribution</p>
          <div className="pie-chart">
            <div>
              <HighchartsReact
                highcharts={Highcharts}
                options={pieChartOptions}
              />
              <StyledGraphSelect
                top="30px"
                left="24px"
                position="absolute"
                style={{
                  width: 120,
                }}
                defaultValue={chartFilters?.orderDistribution}
                onChange={(e) =>
                  setChartFilters((prev) => {
                    return {
                      ...prev,
                      orderDistribution: e,
                    };
                  })
                }
                options={[
                  {
                    value: "6H",
                    label: "6H",
                  },
                  {
                    value: "12H",
                    label: "12H",
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="chart-title-margin">Price Change Distribution</p>
          <div className="pie-chart bar">
            <HighchartsReact
              highcharts={Highcharts}
              options={barChartOptions}
            />
            <StyledProgressBar
              percent={
                (priceChangeDistributionData?.data?.up /
                  (priceChangeDistributionData?.data?.up +
                    priceChangeDistributionData?.data?.down)) *
                100
              }
              trailColor={theme.colors.marketDown}
              strokeColor={theme.colors.marketUp}
            />
            <div className="price-up-down-container">
              <div>
                <span className="value">
                  {priceChangeDistributionData?.data?.up}
                </span>
                <span className="label">Price up</span>
              </div>
              <div>
                <span className="value">
                  {priceChangeDistributionData?.data?.down}
                </span>
                <span className="label">Price down</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row-container">
        <div className="title-container">
          <span className="chart-title">Historical Market Value</span>
          <StyledGraphSelect
            defaultValue="6H"
            style={{
              width: 120,
            }}
            options={[
              {
                value: "6h",
                label: "6H",
              },
              {
                value: "12h",
                label: "12H",
              },
            ]}
          />
        </div>
        <div className="chart-container">
          <HighchartsReact
            highcharts={Highcharts}
            options={marketChartOptions}
            className="chart"
          />
        </div>
      </div>
    </StyledMarketOverviewContainer>
  );
};

export default MarketOverview;
