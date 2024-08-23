export function convertToRowValue<T>(value: T[], columns = 2): T[][] {
  const final = [];
  for (let i = 0; i < value.length; i += columns) {
    final.push(value.slice(i,  i + columns));
  }
  return final;
}
