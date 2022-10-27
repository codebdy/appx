import { Form, Input, message, Modal, Select } from "antd";
import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next";
import { useEdittingAppId } from "~/AppDesigner/hooks/useEdittingAppUuid";
import { useShowError } from "~/AppDesigner/hooks/useShowError";
import { useQueryVersions } from "~/enthooks/hooks/useQueryVersions";
import { useAppParams, useParseLangMessage } from "~/plugin-sdk";
import { useExportApp } from "~/enthooks/hooks/useExportApp";
import { ID } from "~/shared";
const { Option } = Select;

export const downloadFile = function (url: string, filename: string) {
  // 创建隐藏的可下载链接
  var eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  eleLink.href = url;
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};


export const ExportDialog = memo((
  props: {
    open?: boolean,
    onOpenChange?: (open?: boolean) => void
  }
) => {
  const { open, onOpenChange } = props;
  const appId = useEdittingAppId();
  const { app } = useAppParams();
  const { t } = useTranslation();
  const p = useParseLangMessage();
  const [form] = Form.useForm<{ snapshotId?: ID }>();
  const { snapshots, error: queryError } = useQueryVersions(appId, appId)

  const [exportApp, { loading, error }] = useExportApp({
    onCompleted: (data) => {
      onOpenChange(false);
      message.success(t("Designer.ExportSuccess"));
      if (data?.exportApp) {
        downloadFile(data?.exportApp, (p(app.title) || ("app" + appId)) + ".zip")
      }

      form.resetFields()
    }
  });

  useShowError(error || queryError)

  const handleOk = useCallback(() => {
    form.validateFields().then((values: { snapshotId?: ID }) => {
      exportApp(values?.snapshotId)
    })

  }, [onOpenChange, appId])

  const handleCancel = useCallback(() => {
    form.resetFields();
    onOpenChange(false);
  }, [onOpenChange, form])

  const handleValueChange = useCallback((changeValues) => {
    if (changeValues?.snapshotId) {
      form.setFieldValue("description", snapshots?.find(snapshot => snapshot.id === changeValues?.snapshotId)?.description)
    }
  }, [form, snapshots])
  return (
    <Modal
      title={t("Designer.Export")}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        loading: loading
      }}
    >
      <Form
        name="makeVersion"
        labelWrap
        initialValues={{ title: "", description: "" }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        form={form}
        autoComplete="off"
        onValuesChange={handleValueChange}
      >
        <Form.Item
          label={t("Designer.VersionNumber")}
          name="snapshotId"
          rules={[{ required: true, message: t("Required") }]}
        >
          <Select >
            {
              snapshots?.map(snapshot => {
                return (
                  <Option key={snapshot.id} value={snapshot.id}>{p(snapshot.version)}</Option>
                )
              })
            }
          </Select>
        </Form.Item>
        <Form.Item
          label={t("Description")}
          name="description"
        >
          <Input.TextArea disabled />
        </Form.Item>
      </Form>
    </Modal>
  )
})