import { Form, Input, Select } from 'antd';
import IconInput from '../../../../shared/icon/IconInput';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { navigationSelectedIdState } from '../../atoms';
import { useRecoilValue } from 'recoil';
import { useMenuNode } from '../../hooks/useMenuNode';
import { useSetMeta } from '../../hooks/useSetMeta';
import { useDesingerKey } from '../../../context';
import { MenuItemType } from '../../models/IMenuNode';
const { Option } = Select;

const children: React.ReactNode[] = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const handleAuthPointsChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const MenuSettingsForm = memo(() => {
  const { t } = useTranslation();
  const key = useDesingerKey();
  const selectedId = useRecoilValue(navigationSelectedIdState(key));
  const node = useMenuNode(selectedId);
  const setMeta = useSetMeta();

  const handleChange = useCallback((form) => {
    setMeta(node.id, { ...node.meta, ...form });
  }, [node.id, node.meta, setMeta])

  return (
    <div style={{ padding: "16px" }}>
      <Form
        name="menu-item-settings"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        labelAlign="left"
        initialValues={{
          title: node.meta?.title,
          icon: node.meta?.icon
        }}
        onValuesChange={handleChange}
        autoComplete="off"
      >
        {
          node.meta?.type !== MenuItemType.Divider ?
            <>
              <Form.Item
                label={t("Menu.Title")}
                name="title"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={t("Icon")}
                name="icon"
              >
                <IconInput />
              </Form.Item>
            </>
            : <div>{t("Menu.Divider")}</div>
        }
        <Form.Item
          label={t("AuthPoints")}
          name="authPoints"
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
            onChange={handleAuthPointsChange}
          >
            {children}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
});

export default MenuSettingsForm;