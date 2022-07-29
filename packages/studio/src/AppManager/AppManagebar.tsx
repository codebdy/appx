import { AppstoreOutlined, ImportOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React from "react";
import { TextWidget } from "../AppDesigner/widgets";
import CreateDialog from "./CreateDialog";
import { getLocalMessage } from "../locales/getLocalMessage";

const AppManagebar = () => {
  return (
    <div className="app-manage-bar">
      <Input
        className="search hover-float"
        placeholder={getLocalMessage("appManager.SearchPlaceHolder")}
        suffix={
          <SearchOutlined className="search-icon" />
        }
      />
      <Space className="actions">
        <Button className="hover-float" icon={<ImportOutlined />}>
          <TextWidget>appManager.ImportApp</TextWidget>
        </Button>
        <CreateDialog />
        <Button type="primary" className="hover-float" danger icon={<AppstoreOutlined />}>
        <TextWidget>appManager.AppStore</TextWidget>
        </Button>
      </Space>
    </div>
  )
}

export default AppManagebar;