import { atomFamily } from "recoil";
import { AttributeMeta } from "../../ModelBoard/meta/AttributeMeta";
import { ClassMeta } from "../../ModelBoard/meta/ClassMeta";
import { MethodMeta } from "../../ModelBoard/meta/MethodMeta";
import { PackageMeta } from "../../ModelBoard/meta/PackageMeta";

export interface AssociationMeta {
  name: string;
  label?: string;
  tyeEntity: EntityMeta,
}

export interface EntityMeta {
  uuid: string;
  name: string;
  label?: string;
  attributes: AttributeMeta[];
  methods: MethodMeta[];
  associations: AssociationMeta[];
}

export const packagesState = atomFamily<PackageMeta[], string>({
  key: "designer.packages",
  default: [],
})

export const classesState = atomFamily<ClassMeta[], string>({
  key: "designer.classes",
  default: [],
})

export const entitiesState = atomFamily<EntityMeta[], string>({
  key: "designer.entities",
  default: [],
})