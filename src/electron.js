#!/usr/bin/env node

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:1234"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));

  // Disalbe window resizing
  mainWindow.setResizable(false);
}

// Docker script will be here
// const execSync = require("child_process").execSync;
// // import { execSync } from 'child_process';  // replace ^ if using ES modules
// execSync("docker run -d -ti norbertdragan/pangea-poker", {
//   encoding: "utf-8"
// });

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
