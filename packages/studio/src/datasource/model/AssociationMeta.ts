import { EntityMeta } from "./EntityMeta";


export interface AssociationMeta {
  name: string;
  label?: string;
  tyeEntity: EntityMeta;
}
