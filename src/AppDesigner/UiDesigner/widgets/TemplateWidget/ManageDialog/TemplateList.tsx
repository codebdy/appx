import { Avatar, List } from "antd";
import React from "react";
import { memo } from "react"
import { ITemplateInfo } from "~/model";
import { useParseLangMessage } from "~/plugin-sdk";

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
          actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
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