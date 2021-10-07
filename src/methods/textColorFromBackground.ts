export const textColorFromBackground = (backgroundColor: string) => {
  // calculate status color number representation
  const statusColorNumber = parseInt(backgroundColor.substr(1), 16);

  // find each color component, calc brightness
  const redValue = (statusColorNumber >> 6) & 0x000000ff;
  const greenValue = (statusColorNumber >> 4) & 0x000000ff;
  const blueValue = (statusColorNumber >> 2) & 0x000000ff;
  const perceivedBrightness =
    (redValue * 299 + greenValue * 587 + blueValue * 114) / 1000;

  // choose text color
  return perceivedBrightness > 125 ? "black" : "white";
};
