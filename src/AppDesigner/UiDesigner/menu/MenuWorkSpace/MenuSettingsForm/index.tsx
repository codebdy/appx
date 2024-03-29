import { Form, Input, Select } from 'antd';
import IconInput from '~/shared/icon/IconInput';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { navigationSelectedIdState } from '../../atoms';
import { useRecoilValue } from 'recoil';
import { useMenuNode } from '../../hooks/useMenuNode';
import { useSetMeta } from '../../hooks/useSetMeta';
import { useDesignerViewKey } from '~/plugin-sdk/contexts/desinger';
import { MenuItemType } from '@rxdrag/plugin-sdk/model/IMenuNode';
import { useGetPage } from '../../../hooks/useGetPage';
import { MultiLangInput } from '~/plugins/inputs/components/pc/MultiLangInput/view';
import { PageSelect } from '../../../SettingsForm/components/PageSelect';

const { Option } = Select;

const children: React.ReactNode[] = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const MenuSettingsForm = memo((
  props: {
  }
) => {
  const getPge = useGetPage();
  const { t } = useTranslation();
  const key = useDesignerViewKey();
  const selectedId = useRecoilValue(navigationSelectedIdState(key));
  const node = useMenuNode(selectedId);
  const setMeta = useSetMeta();
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      uuid: node.meta?.uuid,
      type: node.meta?.type,
      title: node.meta?.title,
      icon: node.meta?.icon,
      badge: node.meta?.badge,
      link: node.meta?.link,
      "route.pageUuid": node.meta?.route?.pageUuid,
      "route.payload": node.meta?.route?.payload,
    })
  }, [form, node.meta])

  const predetailForm = useCallback((form: any, key: string) => {
    const path = "route." + key;
    if (form[path]) {
      const value = form[path]
      delete form[path];
      form.route = { ...form.route, [key]: value }
    }
  }, [])

  const handleChange = useCallback((form) => {
    let title = node.meta.title;
    if (form["route.pageUuid"]) {
      title = getPge(form["route.pageUuid"])?.title;
    }
    predetailForm(form, "pageUuid");
    predetailForm(form, "payload");
    setMeta(node.meta.uuid, { ...node.meta, title, ...form });
  }, [getPge, node.meta, predetailForm, setMeta])

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
                <MultiLangInput title={t("Menu.Title")} />
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
          <>
            <Form.Item
              label={t("Menu.Page")}
              name="route.pageUuid"
            >
              <PageSelect />
            </Form.Item>
            <Form.Item
              label={t("Menu.RouteParams")}
              name="route.payload"
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </>
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
      </Form>
    </div>
  );
});

export default MenuSettingsForm;