import { IPlugin } from "../../../../../plugin-sdk/model"
import React from "react"
import { Collapse } from "antd";
import { useGetPluginLocalMessage } from "../../../../../plugin-sdk/hooks/useGetPluginLocalMessage";
const { Panel } = Collapse;

export const PluginPanel = React.forwardRef((
  props: {
    plugin: IPlugin,
  },
  ref: any,
) => {
  const { plugin, ...other } = props;
  const { getTitle } = useGetPluginLocalMessage();

  return (
    <div ref={ref} {...other}>
      <Collapse ghost bordered={false}>
        <Panel
          key={plugin.id}
          header={getTitle(plugin)
          }
        >
        </Panel>
      </Collapse>
    </div>
  )
})