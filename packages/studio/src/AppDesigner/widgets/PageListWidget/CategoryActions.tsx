import { FolderAddOutlined, DownloadOutlined, ImportOutlined, MoreOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import { getLocalMessage } from "../../../locales/getLocalMessage";
import React, { memo, useCallback, useMemo } from "react"

const CategoryActions = memo((
  props: {
    onVisibleChange: (visible: boolean) => void,
  }
) => {
  const { onVisibleChange } = props;

  const menu = useMemo(() => (
    <Menu
      items={[
        {
          icon: <FolderAddOutlined />,
          label: getLocalMessage("pages.NewPage"),
          key: '0',
          //onClick:
        },
        {
          icon: <DownloadOutlined />,
          label: getLocalMessage("Edit"),
          key: '1',
          //onClick:expotJson
        },
        {
          icon: <ImportOutlined />,
          label: getLocalMessage("Delete"),
          key: '2',
        },
      ]}
    />
  ), []);

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      onVisibleChange={onVisibleChange}
    >
      <Button shape='circle' type="text" size='small' onClick={e => e.stopPropagation()}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})

export default CategoryActions;