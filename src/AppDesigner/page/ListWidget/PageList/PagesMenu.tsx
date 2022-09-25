import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Modal, Space } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '../../../../common/SvgIcon';
import CreateCategoryDialog from './CreateCategoryModel';
import CreatePageModal from './CreatePageModal';

export const PagesMenu = memo(() => {
  const [createPageOpen, setCreatePageOpen] = useState(false);
  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const { t } = useTranslation();
  const menu = useMemo(() => (
    <Menu
      items={[
        {
          label: (
            <div style={{ paddingLeft: 8 }}>
              {t("Pages.NewCategory")}
            </div>
          ),
          key: '0',
          icon: <SvgIcon>
            <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
              <path fill="currentColor" d="M13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" />
            </svg>
          </SvgIcon>,
          onClick: () => setCreateCategoryOpen(true)
        },
        {
          label: (
            <div style={{ paddingLeft: 8 }}>
              {t("Pages.NewPage")}
            </div>
          ),
          key: '1',
          icon: <SvgIcon>
            <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
              <path fill="currentColor" d="M13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H14L20 8V13.09C19.67 13.04 19.34 13 19 13S18.33 13.04 18 13.09V9H13V4H6V20H13.09C13.21 20.72 13.46 21.39 13.81 22M23 18H20V15H18V18H15V20H18V23H20V20H23V18Z" />
            </svg>
          </SvgIcon>,
          onClick: () => setCreatePageOpen(true),
        },
      ]}
    />
  ), []);

  const handleCreatePageClose = useCallback(() => {
    setCreatePageOpen(false);
  }, [])

  const handleCreateCateroryClose = useCallback(() => {
    setCreateCategoryOpen(false);
  }, [])

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button type="text" shape='circle' size='small' icon={<MoreOutlined />} />
      </Dropdown>
      <CreatePageModal isModalVisible={createPageOpen} onClose={handleCreatePageClose} />
      <CreateCategoryDialog open={createCategoryOpen} onClose={handleCreateCateroryClose} />
    </>
  )
});
