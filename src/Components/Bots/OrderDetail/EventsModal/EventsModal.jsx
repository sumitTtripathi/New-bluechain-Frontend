import React from "react";
import { StyledEventsModal } from "./EventsModal.styles";

function EventsModal({ isEventsModalOpen, setIsEventsModalOpen }) {
  const handleCancel = () => {
    setIsEventsModalOpen(false);
  };
  return (
    <StyledEventsModal
      title="Events History"
      open={isEventsModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="image">
        <img src="/NoResults.svg" />
      </div>
    </StyledEventsModal>
  );
}

export default EventsModal;
