export const isDev: boolean = process.env.NODE_ENV === "development";

// A colored console.log
const log = (text: string, color: string, message?: string): void => {
  isDev &&
    console.log(
      "%c" + text,
      `color: ${
        color === "sent"
          ? "#fcaa2a"
          : color === "info"
          ? "#89ca77"
          : color === "received"
          ? "#e0be1d"
          : color === "danger"
          ? "#ce1311"
          : ""
      }; background-color: #2a2b2e;`,
      message ? message : ""
    );
};

export default log;
