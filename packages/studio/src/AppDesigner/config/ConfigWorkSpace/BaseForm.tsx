import { Form } from 'antd';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useAppParams, useAppViewKey } from '../../../shared/AppRoot/context';
import { deviceConfigChangedState, deviceConfigState } from '../../recoil/atom';
import { PageSelect } from '../../SettingsForm/components/PageSelect';
import "./style.less"

export const BaseLangForm = memo(() => {
  const { t } = useTranslation();
  const key = useAppViewKey();
  const [config, setConfig] = useRecoilState(deviceConfigState(key));
  const setChanged = useSetRecoilState(deviceConfigChangedState(key));
  const { deviceConfig } = useAppParams()
  const [form] = Form.useForm();

  useEffect(()=>{
    setConfig(deviceConfig);
    form.resetFields();
    form.setFieldsValue({entryUuid: deviceConfig?.schemaJson?.entryUuid});
  }, [deviceConfig, form, setConfig])

  useEffect(()=>{
    form.setFieldsValue({entryUuid: config?.schemaJson?.entryUuid});
  }, [config, form])

  const handleValuesChange = useCallback((changeValues, formValues)=>{
    setConfig(config=>({...config, schemaJson:{...config?.schemaJson||{}, ...formValues}}));
    setChanged(true);
  }, [setChanged, setConfig]);

  return (
    <Form
      name="baseconfig"
      form = {form}
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
        label={t("Designer.EntryPage")}
        name="entryUuid"
      >
        <PageSelect />
      </Form.Item>
    </Form>
  );
});
