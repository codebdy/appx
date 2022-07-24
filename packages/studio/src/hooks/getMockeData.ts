export function getMockeData<T>(key: string): T | undefined {
  const str = localStorage.getItem(key);
  if (str) {
    return JSON.parse(str);
  }
  return undefined;
}
