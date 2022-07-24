import { getMockeData } from "./getMockeData";

export function mockQueryRequest<T>(key: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const data = getMockeData<T>(key)
    setTimeout(() => {
      if (data) {
        resolve(data)
      } else {
        resolve(undefined)
      }
    }, 500)
  })
}