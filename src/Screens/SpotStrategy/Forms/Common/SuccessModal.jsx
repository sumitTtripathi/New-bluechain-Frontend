import { Button, Modal } from "antd";
import { InnerModal } from "../SpotGrid/SpotGridForm.styles";
const SuccessModal = ({ isModalOpen, handleOk, handleCancel }) => {
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

        <Button onClick={handleCancel} className="success-btn cancel-btn">
          Okay
        </Button>
      </InnerModal>
    </Modal>
  );
};

export default SuccessModal;
