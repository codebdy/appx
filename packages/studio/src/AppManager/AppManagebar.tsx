import { AppstoreOutlined, ImportOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { CreateAppDialog } from "./AppModal/CreateAppDialog";

const AppManagebar = () => {
  const { t } = useTranslation();
  return (
    <div className="app-manage-bar">
      <Input
        className="search hover-float"
        placeholder={t("AppManager.SearchPlaceHolder")}
        suffix={
          <SearchOutlined className="search-icon" />
        }
      />
      <Space className="actions">
        <Button className="hover-float" icon={<ImportOutlined />}>
          {t("AppManager.ImportApp")}
        </Button>
        <CreateAppDialog />
        <Button type="primary" className="hover-float" danger icon={<AppstoreOutlined />}>
          {t("AppManager.AppStore")}
        </Button>
      </Space>
    </div>
  )
}

export default AppManagebar;