import React from "react";
import ReactDOM from "react-dom";
import { Global, css } from "@emotion/core";
import Main from "./components/Table";
import "normalize.css";
import NoticiaBold from "./fonts/NoticiaText-Bold.ttf";
import PTSansBold from "./fonts/PT_Sans-Web-Bold.ttf";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Global
          styles={css`
            @font-face {
              font-family: "Noticia Text";
              font-style: bold;
              font-weight: 700;
              font-display: swap;
              src: local("Noticia Text Bold"), local("NoticiaText-Bold"),
                url(${NoticiaBold}) format("woff2");
            }
            @font-face {
              font-family: "PT Sans";
              font-style: bold;
              font-weight: 700;
              font-display: swap;
              src: local("PT Sans Bold"), local("PT_Sans-Web-Bold"),
                url(${PTSansBold}) format("woff2");
            }
            * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              font-family: "Noticia Text";
            }
          `}
        />
        <Main />
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
