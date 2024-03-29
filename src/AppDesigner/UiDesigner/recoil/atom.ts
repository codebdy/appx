import { atomFamily } from "recoil";
import { IAppDeviceConfig, IPage, IPageCategory, IUiFrame } from "~/model";
import { ID } from "~/shared";

export const selectedPageIdState = atomFamily<ID | undefined, string>({
  key: "designer.selectedPageId",
  default: undefined,
})

export const categoriesState = atomFamily<IPageCategory[], string>({
  key: "designer.categories",
  default: [],
})

export const pagesState = atomFamily<IPage[], string>({
  key: "designer.pages",
  default: [],
})

export const pageFramesState = atomFamily<IUiFrame[], string>({
  key: "designer.pageFrames",
  default: [],
})


export const deviceConfigState = atomFamily<IAppDeviceConfig | undefined, string>({
  key: "designer.deviceConfig",
  default: undefined,
})

export const deviceConfigChangedState = atomFamily<boolean, string>({
  key: "designer.deviceConfigChange",
  default: false,
})
