import moonBg from "../images/background-moon.jpg";
import moonBg2x from "../images/background-moon@2x.jpg";
import tableDefault from "../images/table-default.png";
import tableDefault2x from "../images/table-default@2x.png";

const theme = {
  moon: {
    colors: {
      accent: "#FCAA2A",
      background: "#121318",
      danger: "#CE1311",
      primary: "#4D8484",
      primaryLight: "#6DABAB",
      text: "#ffffff"
    },
    background: { regular: moonBg, retina: moonBg2x },
    table: { regular: tableDefault, retina: tableDefault2x }
  }
};

export default theme;
