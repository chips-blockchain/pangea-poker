import React from "react";
import { css } from "@emotion/core";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Modal from "./Modal";
import CustomIP from "./CustomIP";
import TableSelect from "./TableSelect";
import { IState } from "../../store/initialState";

// This is the modal that appears at the startup and let's the user to join a table

interface IProps {
  dispatch: Function;
  state: IState;
}

const modalTopTabs = css`
  & > .react-tabs__tab-list {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const StartupModal: React.FunctionComponent<IProps> = ({
  dispatch,
  state
}): React.ReactElement => {
  return (
    <Modal>
      <Tabs
        css={css`
          ${modalTopTabs}
        `}
      >
        <TabList>
          <Tab>Table List</Tab>
          <Tab>Custom IP</Tab>
        </TabList>

        <TabPanel>
          <TableSelect dispatch={dispatch} state={state} />
        </TabPanel>
        <TabPanel>
          <CustomIP />
        </TabPanel>
      </Tabs>
    </Modal>
  );
};

export default StartupModal;
