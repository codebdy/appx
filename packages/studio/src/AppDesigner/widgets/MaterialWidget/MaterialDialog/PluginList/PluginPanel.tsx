import { IPlugin } from "../../../../../plugin-sdk/model"
import React from "react"
import { Collapse, Empty } from "antd";
import { useGetPluginLocalMessage } from "../../../../../plugin-sdk/hooks/useGetPluginLocalMessage";
import cls from "classnames";
const { Panel } = Collapse;

export const PluginPanel = React.forwardRef((
  props: {
    plugin: IPlugin,
    index: number,
    className?: string,
  },
  ref: any,
) => {
  const { plugin, index, className, ...other } = props;
  const { getTitle } = useGetPluginLocalMessage();

  return (
    <div
      className={cls("bottom-border", className, "plugin-pannel")}
      ref={ref}
      {...other}>
      <Collapse ghost bordered={false} expandIconPosition="end">
        <Panel
          key={plugin.id}
          header={
            <div className="plugin-title">{getTitle(plugin)}</div>
          }
        >
          <Empty />
        </Panel>
      </Collapse>
    </div>
  )
})