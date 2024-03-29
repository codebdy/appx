import { Form, Select } from 'antd';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useShowError } from '~/AppDesigner/hooks/useShowError';
import { useQueryPageFrames } from '../../../FrameDesigner/hooks/useQueryPageFrames';
import { useDesignerParams, useDesignerViewKey } from '~/plugin-sdk/contexts/desinger';
import { deviceConfigChangedState, deviceConfigState } from '../../recoil/atom';
import { PageSelect } from '../../SettingsForm/components/PageSelect';
import "./style.less"
import { useParseLangMessage } from '@rxdrag/plugin-sdk/hooks/useParseLangMessage';
const { Option } = Select

export const BaseConfigForm = memo(() => {
  const { t } = useTranslation();
  const key = useDesignerViewKey();
  const [config, setConfig] = useRecoilState(deviceConfigState(key));
  const setChanged = useSetRecoilState(deviceConfigChangedState(key));
  const { deviceConfig } = useDesignerParams()
  const [form] = Form.useForm();
  const p = useParseLangMessage();
  const { pageFrames, loading, error } = useQueryPageFrames();
  useShowError(error);

  useEffect(() => {
    setConfig(deviceConfig);
    form.resetFields();
    form.setFieldsValue({
      entryUuid: deviceConfig?.schemaJson?.entryUuid,
      pageFrameUuid: deviceConfig?.schemaJson?.pageFrameUuid,
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
        name="pageFrameUuid"
      >
        <Select
          allowClear loading={loading}
          placeholder={t("Designer.PleasePageFrame")}
        >
          {
            pageFrames?.map(frame => {
              return (
                <Option value={frame.uuid}>{p(frame.title)}</Option>
              )
            })
          }
        </Select>
      </Form.Item>
      <Form.Item
        label={t("Designer.EntryPage")}
        name="entryUuid"
      >
        <PageSelect />
      </Form.Item>
    </Form>
  );
});
