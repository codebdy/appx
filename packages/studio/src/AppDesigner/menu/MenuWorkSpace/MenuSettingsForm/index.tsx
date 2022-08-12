import { Form, Input, Select, TreeSelect } from 'antd';
import IconInput from '../../../../shared/icon/IconInput';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { navigationSelectedIdState } from '../../atoms';
import { useRecoilValue } from 'recoil';
import { useMenuNode } from '../../hooks/useMenuNode';
import { useSetMeta } from '../../hooks/useSetMeta';
import { useDesingerKey } from '../../../context';
import { MenuItemType } from '../../models/IMenuNode';
const { Option } = Select;
const { TreeNode } = TreeSelect;

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
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      ...node.meta
    })
  }, [form, node.meta])

  const handleChange = useCallback((form) => {
    setMeta(node.meta.uuid, { ...node.meta, ...form });
  }, [node.meta, setMeta])

  return (
    <div style={{ padding: "16px" }}>
      <Form
        name="menu-item-settings"
        form={form}
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
        {
          node.meta?.type === MenuItemType.Item &&
          <Form.Item
            label={t("Menu.Page")}
            name="page"
          >
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              placeholder={t("Menu.PleaseSelectPage")}
              allowClear
              treeDefaultExpandAll
            >
              <TreeNode value="parent 1" title="parent 1">
                <TreeNode value="parent 1-0" title="parent 1-0">
                  <TreeNode value="leaf1" title="leaf1" />
                  <TreeNode value="leaf2" title="leaf2" />
                </TreeNode>
                <TreeNode value="parent 1-1" title="parent 1-1">
                  <TreeNode value="leaf3" title={<b style={{ color: '#08c' }}>leaf3</b>} />
                </TreeNode>
              </TreeNode>
            </TreeSelect>
          </Form.Item>
        }
        {

          node.meta?.type === MenuItemType.Link &&
          <Form.Item
            label={t("Menu.Link")}
            name="link"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
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