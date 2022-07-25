import { FolderAddOutlined, DownloadOutlined, ImportOutlined, MoreOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { getLocalMessage } from "../../locales/getLocalMessage";
import { useSelectedAppId } from "../hooks/useSelectedAppId";
import { useCreateNewPackage } from './../hooks/useCreateNewPackage';
import { useSetRecoilState } from 'recoil';
import { packagesState } from "../recoil/atoms";

const PackageAction = memo(() => {
  const appId = useSelectedAppId()
  const setPackages = useSetRecoilState(packagesState(appId))
  const createNewPackage = useCreateNewPackage(appId)
  const handleAddPackage = useCallback(
    () => {
      setPackages(packages=>[...packages, createNewPackage()])
    },
    [],
  )

  const menu = useMemo(() => (
    <Menu
      items={[
        {
          icon: <FolderAddOutlined />,
          label: getLocalMessage("model.AddPackage"),
          key: '0',
          onClick: handleAddPackage
        },
        {
          icon: <DownloadOutlined />,
          label: getLocalMessage("model.ExportModel"),
          key: '1',
        },
        {
          icon: <ImportOutlined />,
          label: getLocalMessage("model.ImportModel"),
          key: '2',
        },
      ]}
    />
  ), []);

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button className='no-border' shape='circle' size='small' onClick={e => e.stopPropagation()}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})

export default PackageAction;