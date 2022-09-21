import { observable } from "@formily/reactive"
import { MaterialTab } from "./model"

export interface MaterialStore {
  predefinedTab?: MaterialTab,
  tabs: MaterialTab[],
  debugTab?: MaterialTab,
}

export const materialStore2: MaterialStore = observable.shallow({
  tabs: [],
})

