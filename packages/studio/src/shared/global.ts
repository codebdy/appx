import { observable } from "@formily/reactive"
import { allMaterials } from "../AppDesigner/widgets/MaterialWidget/mock"
import { MaterialModule } from "../AppDesigner/widgets/MaterialWidget/model"

export interface MaterialStore {
  modules: MaterialModule[]
}

export const materialStore:MaterialStore = observable.shallow({
  modules: allMaterials,
})

