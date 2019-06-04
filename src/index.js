import React from "react";
import ReactDOM from "react-dom";
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>Hello!</h2>
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
