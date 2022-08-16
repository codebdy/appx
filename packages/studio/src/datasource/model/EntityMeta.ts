import { AttributeMeta } from "../../ModelBoard/meta/AttributeMeta";
import { MethodMeta } from "../../ModelBoard/meta/MethodMeta";
import { AssociationMeta } from "./AssociationMeta";


export interface EntityMeta {
  uuid: string;
  name: string;
  label?: string;
  packageUuid: string;
  attributes: AttributeMeta[];
  methods: MethodMeta[];
  associations: AssociationMeta[];
}
