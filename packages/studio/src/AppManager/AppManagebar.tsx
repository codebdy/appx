import { AppstoreOutlined, ImportOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import CreateDialog from "./CreateDialog";

const AppManagebar = () => {
  const { t } = useTranslation();
  return (
    <div className="app-manage-bar">
      <Input
        className="search hover-float"
        placeholder={t("appManager.SearchPlaceHolder")}
        suffix={
          <SearchOutlined className="search-icon" />
        }
      />
      <Space className="actions">
        <Button className="hover-float" icon={<ImportOutlined />}>
          {t("appManager.ImportApp")}
        </Button>
        <CreateDialog />
        <Button type="primary" className="hover-float" danger icon={<AppstoreOutlined />}>
          {t("appManager.AppStore")}
        </Button>
      </Space>
    </div>
  )
}

export default AppManagebar;