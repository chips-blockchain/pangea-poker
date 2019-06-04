import React from "react";
import ReactDOM from "react-dom";
import Table from "./components/Table";
import "normalize.css";
class App extends React.Component {
  render() {
    return <Table />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
