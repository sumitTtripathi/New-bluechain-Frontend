import { Button, Modal } from "antd";
import { InnerModal } from "./ManualTrading.style";
import { ROUTES } from "../../Constants/Routes";
import { useNavigate } from "react-router";
const SuccessModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const navigate = useNavigate();
  return (
    <Modal
      title={""}
      footer={null}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <InnerModal>
        <img src="/Logo/Icons/SuccessModal.svg" alt="symbol" />
        <div className="center bold">Bot Created</div>
        <div className="center grey">
          Experience 24/7 smart Trading with Bitorio Bot
        </div>

        <Button
          className="success-btn"
          onClick={() => {
            navigate(`${ROUTES.ORDER_DETAIL}/sdjksfh`);
          }}
        >
          View Details
        </Button>
        <Button onClick={handleCancel} className="success-btn cancel-btn">
          Cancel
        </Button>
      </InnerModal>
    </Modal>
  );
};

export default SuccessModal;
