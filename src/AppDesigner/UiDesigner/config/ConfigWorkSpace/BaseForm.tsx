import { Form, Select } from 'antd';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useShowError } from '~/hooks/useShowError';
import { useQueryPageFrames } from '../../../FrameDesigner/hooks/useQueryPageFrames';
import { useAppParams, useAppViewKey } from '@rxdrag/plugin-sdk/contexts/appRoot';
import { deviceConfigChangedState, deviceConfigState } from '../../recoil/atom';
import { PageSelect } from '../../SettingsForm/components/PageSelect';
import "./style.less"
import { useParseLangMessage } from '@rxdrag/plugin-sdk/hooks/useParseLangMessage';
const { Option } = Select

export const BaseLangForm = memo(() => {
  const { t } = useTranslation();
  const key = useAppViewKey();
  const [config, setConfig] = useRecoilState(deviceConfigState(key));
  const setChanged = useSetRecoilState(deviceConfigChangedState(key));
  const { deviceConfig } = useAppParams()
  const [form] = Form.useForm();
  const p = useParseLangMessage();
  const { pageFrames, loading, error } = useQueryPageFrames();
  useShowError(error);

  useEffect(() => {
    setConfig(deviceConfig);
    form.resetFields();
    form.setFieldsValue({
      entryId: deviceConfig?.schemaJson?.entryUuid,
      pageFrameId: deviceConfig?.schemaJson?.pageFrameUuid,
    });
  }, [deviceConfig, form, setConfig])

  useEffect(() => {
    form.setFieldsValue({ entryId: config?.schemaJson?.entryUuid });
  }, [config, form])

  const handleValuesChange = useCallback((changeValues, formValues) => {
    setConfig(config => ({ ...config, schemaJson: { ...config?.schemaJson || {}, ...formValues } }));
    setChanged(true);
  }, [setChanged, setConfig]);

  return (
    <Form
      name="baseconfig"
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 12,
      }}
      autoComplete="off"
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label={t("Designer.PageFrame")}
        name="pageFrameId"
      >
        <Select
          allowClear loading={loading}
          placeholder={t("Designer.PleasePageFrame")}
        >
          {
            pageFrames?.map(frame => {
              return (
                <Option value={frame.id}>{p(frame.title)}</Option>
              )
            })
          }
        </Select>
      </Form.Item>
      <Form.Item
        label={t("Designer.EntryPage")}
        name="entryId"
      >
        <PageSelect />
      </Form.Item>
    </Form>
  );
});
