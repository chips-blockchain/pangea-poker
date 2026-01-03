import React from "react";
import { sendMessage } from "../../store/actions";
import { IState } from "../../store/initialState";

interface FindTableButtonProps {
  state: IState;
  dispatch: (arg: object) => void;
}

const FindTableButton: React.FC<FindTableButtonProps> = ({ state, dispatch }) => {
  const handleFindTable = () => {
    console.log("[USER ACTION] Finding table...");
    sendMessage({ method: "table_info" }, "player", state, dispatch);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10000,
        textAlign: "center",
        pointerEvents: "auto"
      }}
    >
      <div
        style={{
          background: "var(--color-background)",
          padding: "40px 60px",
          borderRadius: "8px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7)",
          border: "2px solid var(--color-primary)"
        }}
      >
        <div
          style={{
            fontSize: "24px",
            color: "var(--color-text)",
            marginBottom: "20px",
            fontWeight: "bold",
            fontFamily: "var(--font-family-primary)"
          }}
        >
          Ready to Play
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "var(--color-primaryLight)",
            marginBottom: "30px",
            fontFamily: "var(--font-family-secondary)"
          }}
        >
          Your wallet is ready. Find an available table to join.
        </div>
        <button
          onClick={handleFindTable}
          style={{
            background: "var(--color-background)",
            color: "var(--color-text)",
            border: "1px solid var(--color-primary)",
            padding: "12px 40px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "2px",
            cursor: "pointer",
            transition: "all 0.1s ease",
            outline: "none",
            fontFamily: "var(--font-family-secondary)"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = "var(--color-accent)";
            e.currentTarget.style.borderColor = "var(--color-accent)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = "var(--color-text)";
            e.currentTarget.style.borderColor = "var(--color-primary)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.background = "var(--color-accent)";
            e.currentTarget.style.color = "var(--color-background)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.background = "var(--color-background)";
            e.currentTarget.style.color = "var(--color-accent)";
          }}
        >
          Find Table
        </button>
        <div
          style={{
            fontSize: "12px",
            color: "var(--color-accent)",
            marginTop: "15px",
            fontFamily: "var(--font-family-secondary)"
          }}
        >
          Balance: {state.balance?.toFixed(4) || "0.0000"} CHIPS
        </div>
      </div>
    </div>
  );
};

export default FindTableButton;

