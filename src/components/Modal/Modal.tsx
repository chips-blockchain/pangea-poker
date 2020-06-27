import React from "react";
import ReactModal from "react-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { modalStyle, tabsStyle } from "./assets/style";

interface IProps {
  children?: React.ReactNode;
  contentLabel: string;
  id: string;
  isOpen: boolean;
  tabs?: { content: React.ReactNode; title: string; name: string }[];
  onRequestClose: () => void;
}
const isTest = process.env.NODE_ENV === "test";
!isTest && ReactModal.setAppElement("#root");

const Modal: React.FunctionComponent<IProps> = ({
  children,
  contentLabel,
  id,
  isOpen,
  onRequestClose,
  tabs
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      style={modalStyle}
      contentLabel={contentLabel}
      id={id}
      onRequestClose={onRequestClose}
      ariaHideApp={isTest ? false : true}
    >
      {tabs && (
        <Tabs css={tabsStyle}>
          <TabList>
            {tabs.map(tab => {
              return <Tab key={tab.name}>{tab.name}</Tab>;
            })}
          </TabList>
          {tabs.map(tab => {
            return (
              <TabPanel key={tab.name}>
                <h2>{tab.title}</h2>
                {tab.content}
              </TabPanel>
            );
          })}
        </Tabs>
      )}
      {children}
    </ReactModal>
  );
};

export default Modal;
