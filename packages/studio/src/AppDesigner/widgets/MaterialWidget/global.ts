import { observable } from "@formily/reactive"
import { allMaterials } from "./mock"
import { MaterialModule } from "./model"

export interface MaterialStore {
  modules: MaterialModule[]
}

export const materialStore:MaterialStore = observable.shallow({
  modules: allMaterials,
})

