import { Modal } from "antd";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import styled from "styled-components";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
export const StyledTermsandConditionModal = styled(Modal)`
  .react-pdf__Page {
    width: 100% !important;
    min-width: auto !important;
  }
  .react-pdf__Page__canvas {
    width: 100% !important;
  }
`;
const TermsandCondtionModal = ({ isModalOpen, handleCancel, handleOk }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handlePrevPage = () => {
    if (pageNumber === 1) {
      setPageNumber(1);
    } else {
      setPageNumber((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber === numPages) {
      setPageNumber(numPages);
    } else {
      setPageNumber((prev) => prev + 1);
    }
  };

  return (
    <StyledTermsandConditionModal
      title=""
      footer={null}
      open={isModalOpen}
      onOk={handleOk}
      style={{ maxWidth: "650px", width: "100%" }}
      onCancel={handleCancel}
    >
      <div>
        <Document file="/terms.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <VscChevronLeft
            style={{ cursor: "pointer" }}
            onClick={handlePrevPage}
          />
          Page {pageNumber} of {numPages}
          <VscChevronRight
            style={{ cursor: "pointer" }}
            onClick={handleNextPage}
          />
        </p>
      </div>
    </StyledTermsandConditionModal>
  );
};

export default TermsandCondtionModal;
