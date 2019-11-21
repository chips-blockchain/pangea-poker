import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import theme from "../../styles/theme";

const { background, primary, primaryLight, text } = theme.moon.colors;

const LogBoxSection = styled.section`
  background: ${background};
  border: 1px solid ${primary};
  bottom: 1.75rem;
  padding: 0.5rem;
  position: absolute;
  overflow: scroll;
  left: 1rem;
  height: 6rem;
  width: 18rem;
`;

const Log = styled.div`
  color: ${primaryLight};
  font-family: "PT Sans", serif;
  /* TODO: Use less heavy font weights */
  font-size: 0.875rem;
  margin: 0.125rem;
`;

export const LogBox = ({ handHistory }) => {
  const logBoxRef = useRef(null);

  useEffect(() => {
    logBoxRef.current.scrollIntoView({ behavior: "smooth" });
  }, [handHistory]);

  return (
    <LogBoxSection>
      <div ref={logBoxRef}></div>
      {handHistory.map((log: string) => {
        return <Log key={handHistory.indexOf(log)}>{log}</Log>;
      })}
    </LogBoxSection>
  );
};
