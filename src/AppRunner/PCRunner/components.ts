import { convertMaterialsToComponents } from "../../AppDesigner/widgets/MaterialWidget/model";
import { materialStore } from "../../shared/global";

export const components = {
  ...convertMaterialsToComponents(materialStore.modules)
}