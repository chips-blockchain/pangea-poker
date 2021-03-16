const chooseGameOption = (
  option: string,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "chooseGameOption",
    payload: option
  });
};

export default chooseGameOption;
