export function mapIDArrayToEnum(idArray: number[]) {
  return idArray.map((id) => {
    return { id };
  });
}

export function coordinatesStringToArray(coordinates) {
  return [
    parseFloat(coordinates.split(',')[0]),
    parseFloat(coordinates.split(',')[1]),
  ];
}
