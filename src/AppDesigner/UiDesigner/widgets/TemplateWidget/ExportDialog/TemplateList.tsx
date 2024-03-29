import { Avatar, Checkbox, List } from "antd";
import React from "react";
import { memo } from "react"
import { ITemplateInfo } from "~/model";
import { useParseLangMessage } from "~/plugin-sdk";
import { ID } from "~/shared";

export const TemplateList = memo((
  props: {
    templates: ITemplateInfo[],
    selectedIds: ID[],
    onSelectChange: (id: ID, checked?: boolean) => void,
  }
) => {
  const { selectedIds, templates, onSelectChange } = props;
  const p = useParseLangMessage();

  return (
    <div className="template-list-container">
      <List
        itemLayout="horizontal"
        dataSource={templates}
        renderItem={item => (
          <List.Item
            actions={[
              <Checkbox
                checked={!!selectedIds?.find(id => id === item.id)}
                onChange={(e) => {
                  onSelectChange(item.id, e.target.checked)
                }}
              />
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar shape="square" size={32} src={item.imageUrl} />}
              title={p(item.name)}
            />
          </List.Item>
        )}
      />
    </div>
  )
})