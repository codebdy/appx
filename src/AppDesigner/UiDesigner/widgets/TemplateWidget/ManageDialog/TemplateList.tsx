import { List } from "antd";
import React from "react";
import { memo } from "react"
import { ITemplateInfo } from "~/model";
import { useParseLangMessage } from "~/plugin-sdk";
import { DeleteTemplateButton } from "./DeleteTemplateButton";
import { EditTemplateDialog } from "./EditTemplateDialog";

export const TemplateList = memo((
  props: {
    templates?: ITemplateInfo[]
  }
) => {
  const { templates } = props;
  const p = useParseLangMessage();

  return (
    <List
      itemLayout="horizontal"
      dataSource={templates}
      renderItem={item => (
        <List.Item
          actions={[<EditTemplateDialog/>, <DeleteTemplateButton />]}
        >
          <List.Item.Meta
            //avatar={<Avatar shape="square" size={64} src={item.imageUrl} />}
            title={p(item.name)}
          />
        </List.Item>
      )}
    />
  )
})