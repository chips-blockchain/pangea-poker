import React from "react";
import ReactModal from "react-modal";

const Modal: React.FunctionComponent = ({ children }) => {
  return (
    <ReactModal
      isOpen={true}
      style={{
        content: {
          backgroundColor: "var(--background)",
          border: 0,
          color: "var(--text)",
          left: "50%",
          opacity: 1,
          padding: "2rem 2rem",
          textAlign: "center",
          top: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "17rem",
          minHeight: "22.5rem",
          zIndex: 1000
        },
        overlay: {
          backgroundColor: "#0000007F",
          position: "absolute",
          height: "37.5rem",
          width: "50rem"
        }
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
