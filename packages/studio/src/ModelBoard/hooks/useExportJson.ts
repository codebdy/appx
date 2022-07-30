import { useCallback } from "react";
import { Meta } from "../meta/Meta";
import { useGetMeta } from "./useGetMeta";

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
  const getMeta = useGetMeta(appUuid)
  const doExport = useCallback(() => {

    const data: Meta =getMeta();
    downloadFile(appUuid + '.json', JSON.stringify(data, null, 2));
  }, [appUuid, getMeta]);

  return doExport
}