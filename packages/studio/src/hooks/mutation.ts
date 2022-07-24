import { createId, ID } from '../shared';

export function mockCreateRequest<T1, T2>(key: string, obj: T1): Promise<T2> {
  return new Promise((resolve, reject) => {
    const str = localStorage.getItem(key)
    const t = setTimeout(() => {
      if (!(obj as any).id) {
        (obj as any).id = createId();
      }

      if (str) {
        const newData = [...JSON.parse(str), obj];
        localStorage.setItem(key, JSON.stringify(newData))
      } else {
        const newData = [obj];
        localStorage.setItem(key, JSON.stringify(newData))
      }
      resolve(obj as any)
    }, 500)
  })
}

export function mockRemoveRequest<T>(key: string, id: ID): Promise<T> {
  return new Promise((resolve, reject) => {
    const str = localStorage.getItem(key)
    setTimeout(() => {
      if (str) {
        const data: any[] = JSON.parse(str);
        const removedData = data.find(obj => obj.id === id)
        localStorage.setItem(key, JSON.stringify(data.filter(obj => obj.id !== id)))
        resolve(removedData)
      } else {
        resolve(undefined)
      }
    }, 500)
  })
}