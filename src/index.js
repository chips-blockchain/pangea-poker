import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import { Global, css } from "@emotion/core";
import Main from "./components/Table";
import "normalize.css";
import NoticiaBold from "./fonts/NoticiaText-Bold.ttf";
import PTSansBold from "./fonts/PT_Sans-Web-Bold.ttf";
import PTSansRegular from "./fonts/PTSans-Regular.ttf";

Sentry.init({
  dsn: "https://294dbaf87a92469398cac4a9ba3c1106@sentry.io/1841547"
});

const App = () => {
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
          @font-face {
            font-family: "PT Sans";
            font-style: bold;
            font-weight: 400;
            font-display: swap;
            src: local("PT Sans Regular"), local("PTSans-Regular"),
              url(${PTSansRegular}) format("woff2");
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
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
