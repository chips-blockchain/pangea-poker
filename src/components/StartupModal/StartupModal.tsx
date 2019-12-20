import { css } from "@emotion/core";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Modal from "./Modal";
import CustomIP from "./CustomIP";
import TableSelect from "./TableSelect";
import theme from "../../styles/theme";

// This is the modal that appears at the startup and let's the user to join a table

const tabsStyle = css`
  .react-tabs {
    -webkit-tap-highlight-color: transparent;
  }

  .react-tabs__tab-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0 0 10px;
    padding: 0;
  }

  .react-tabs__tab {
    display: inline-block;
    border-top: 2px solid transparent;
    position: relative;
    list-style: none;
    padding: 6px 12px;
    cursor: pointer;
  }

  .react-tabs__tab:hover:not(.react-tabs__tab--selected) {
    color: ${theme.moon.colors.accent};
  }

  .react-tabs__tab--selected {
    border-top: 2px solid ${theme.moon.colors.primaryLight};
    background: linear-gradient(
      180deg,
      rgba(109, 171, 171, 0.2) 0%,
      rgba(109, 171, 171, 0) 100%
    );
  }

  .react-tabs__tab--disabled {
    color: GrayText;
    cursor: default;
  }

  .react-tabs__tab:focus {
    box-shadow: 0 0 5px ${theme.moon.colors.primaryLight};
    border-color: ${theme.moon.colors.primaryLight};
    outline: none;
  }

  .react-tabs__tab:focus:after {
    content: "";
    position: absolute;
    height: 2px;
    left: -4px;
    right: -4px;
    bottom: -2px;
    background: ${theme.moon.colors.primary};
  }

  .react-tabs__tab-panel {
    display: none;
  }

  .react-tabs__tab-panel--selected {
    display: block;
  }
`;

const StartupModal = ({ dispatch, state }) => {
  return (
    <Modal>
      {/* TabsWrapper */}
      <Tabs css={tabsStyle}>
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
