import React, { useEffect, useRef } from "react";
import { LogBoxSection, Log } from "./assets/style";

interface ILog {
  action: string;
  timeStamp: string;
}

interface IProps {
  handHistory: ILog[];
}

export const LogBox: React.FunctionComponent<IProps> = ({ handHistory }) => {
  const logRef = useRef(null);

  useEffect(() => {
    handHistory.length > 0 && logRef.current.scrollIntoView();
  }, [handHistory]);

  return (
    <LogBoxSection>
      {handHistory.map(({ action, timeStamp }: ILog) => {
        return (
          <div ref={logRef} key={action + timeStamp}>
            <Log>{action}</Log>
          </div>
        );
      })}
    </LogBoxSection>
  );
};
