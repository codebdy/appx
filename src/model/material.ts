import { Device, IMaterialTab } from "@rxdrag/appx-plugin-sdk";
import { ID } from "~/shared";

export interface IMaterialConfigInput {
  id?: ID;
  appUuid?: string,
  device?: Device,
  schemaJson?: {
    tabs: IMaterialTab[],
  },
}

export interface IMaterialConfig {
  id: ID;
  appUuid: string,
  schemaJson?: {
    tabs: IMaterialTab[],
  },
}