export function digitsToDateTime(year, month, date, hour, minute) {
  return `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(
    2,
    '0',
  )} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export function coordinatesStringToArray(coordinates) {
  return [
    parseFloat(coordinates.split(',')[0]),
    parseFloat(coordinates.split(',')[1]),
  ];
}
