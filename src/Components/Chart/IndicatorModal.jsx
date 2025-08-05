import { Input, Modal } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { IndicatorContainer } from "../../Screens/Perpetual/Spot.styles";
import { useState } from "react";
import { indicatorsList } from "../../Constants/state";

const IndicatorModal = ({
  isModalOpen,
  handleCancel,
  setIndicators,
  setIframeLoading,
}) => {
  const [filter, setFilter] = useState(indicatorsList);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sessionStorage.setItem("indicator", "hasIndicator");
      setIframeLoading(true);
      setIndicators(String(e.target.value).toUpperCase());
      setTimeout(() => {
        setIframeLoading(false);
      }, 2000);
      handleCancel();
    }
  };
  return (
    <Modal
      // title="Indicators"
      style={{ position: "relative", top: "300px" }}
      footer={null}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={handleCancel}
    >
      <IndicatorContainer>
        <h2 className="indi-heading">Indicators</h2>
        <div className="search-container">
          <div className="input-container">
            <Input
              autocomplete="off"
              className="market-input"
              onChange={(e) => {
                e.preventDefault();
                const filteredList = indicatorsList?.filter((item) =>
                  item?.includes(String(e.target.value).toUpperCase())
                );
                setFilter(filteredList);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search"
              prefix={<AiOutlineSearch />}
            />
          </div>
          {/* <AiOutlineSearch fontSize={18} />
          <div className="search-text">
            Search
          </div> */}
        </div>
        <div className="content-list">
          <div className="script-text">Script Name</div>
          {filter?.map((data, i) => (
            <div
              className="indi-list"
              key={i}
              onClick={() => {
                sessionStorage.setItem("indicator", "hasIndicator");
                setIframeLoading(true);
                setIndicators(data);
                setTimeout(() => {
                  setIframeLoading(false);
                }, 2000);
                handleCancel();
              }}
            >
              {data}
            </div>
          ))}
        </div>
      </IndicatorContainer>
    </Modal>
  );
};

export default IndicatorModal;
