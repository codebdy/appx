export enum PackageStatus{
  EDITING = 'EDITING',
  SYNCED = 'SYNCED'
}

/**
 * 包的元数据
 */
export interface PackageMeta{
  uuid: string;
  name: string;
  system?: boolean;
  sharable?: boolean;
  appUuid: string;
}