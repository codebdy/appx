import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { Meta, MetaStatus } from "../meta/Meta";
import { metaState, classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState } from "../recoil/atoms";

export const downloadFile = function (filename: string, content: string) {
  // 创建隐藏的可下载链接
  var eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  var blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};


export function useExportJson(appUuid: string) {
  const meta = useRecoilValue(metaState(appUuid));
  const packages = useRecoilValue(packagesState(appUuid))
  const classes = useRecoilValue(classesState(appUuid));
  const relations = useRecoilValue(relationsState(appUuid));
  const diagrams = useRecoilValue(diagramsState(appUuid));
  const x6Nodes = useRecoilValue(x6NodesState(appUuid));
  const x6Edges = useRecoilValue(x6EdgesState(appUuid));

  const doExport = useCallback(() => {
    const content = {
      packages,
      classes,
      relations,
      diagrams,
      x6Nodes,
      x6Edges,
    };

    const data: Meta =
      meta?.status === MetaStatus.META_STATUS_PUBLISHED || !meta
        ? {
          appUuid,
          content,
        }
        : {
          ...meta,
          content,
        };
    downloadFile(appUuid + '.json', JSON.stringify(data, null, 2));
  }, [appUuid, classes, diagrams, meta, packages, relations, x6Edges, x6Nodes]);

  return doExport
}