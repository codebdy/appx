import { ClassMeta } from "./ClassMeta";
import { DiagramMeta } from "./DiagramMeta";

export enum PackageStatus{
  EDITING = 'EDITING',
  SYNCED = 'SYNCED'
}

/**
 * 包的元数据
 */
export interface PackageMeta{
  /**
   * ID，主键
   */
  id?: number;

  /**
   * 唯一标识
   */
  uuid: string;

  name: string;

}