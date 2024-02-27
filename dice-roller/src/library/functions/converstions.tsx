export const radiansToDegrees = (radians: number) => {
  return (radians * Math.PI) / 180;
};
export const degreesToRadians = (degrees: number) => {
  const convertedNum = degrees * 0.0174533;
  return +convertedNum.toFixed(2);
};
export const hexColorConverter = (hexCodeWithHashtag: string) => {
  const stringArray = hexCodeWithHashtag.split("");
  const numberValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (stringArray[0] === "#" && stringArray.length === 7) {
    stringArray.splice(0, 1);
    let runningSum = 0;
    const finalRGBValues = [];

    for (let index = 0; index < stringArray.length; index++) {
      let convertedHexValue = 0;
      const value = stringArray[index];

      if (numberValues.includes(+value)) {
        convertedHexValue = +value;
      } else {
        switch (value.toUpperCase()) {
          case "A":
            convertedHexValue = 10;
            break;
          case "B":
            convertedHexValue = 11;
            break;
          case "C":
            convertedHexValue = 12;
            break;
          case "D":
            convertedHexValue = 13;
            break;
          case "E":
            convertedHexValue = 14;
            break;
          case "F":
            convertedHexValue = 15;
            break;
        }
      }

      if ((index + 1) % 2 === 0) {
        runningSum = runningSum + convertedHexValue * 16;
        finalRGBValues[(index + 1) / 2 - 1] = runningSum;
        runningSum = 0;
      } else if ((index + 1) % 2 !== 0) {
        runningSum = convertedHexValue;
      }
    }
    return finalRGBValues;
  }
};
