import { Form, message, Modal, Select } from "antd";
import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next";
import { useEdittingAppId } from "~/hooks/useEdittingAppUuid";
import { useShowError } from "~/hooks/useShowError";
import { useCreateVersion } from "~/enthooks/hooks/useCreateVersion";
import { useQueryVersions } from "~/enthooks/hooks/useQueryVersions";
import { useParseLangMessage } from "~/plugin-sdk";
const { Option } = Select;

export const ExportDialog = memo((
  props: {
    open?: boolean,
    onOpenChange?: (open?: boolean) => void
  }
) => {
  const { open, onOpenChange } = props;
  const appId = useEdittingAppId();
  const { t } = useTranslation();
  const p = useParseLangMessage();
  const [form] = Form.useForm<{ version?: string }>();
  const { snapshots, error: queryError } = useQueryVersions(appId, appId)
  const [create, { loading, error }] = useCreateVersion({
    onCompleted: () => {
      onOpenChange(false);
      message.success(t("OperateSuccess"))
    }
  });

  useShowError(error || queryError)

  const handleOk = useCallback(() => {
    form.validateFields().then((values: { version?: string }) => {

    })

  }, [onOpenChange, appId])

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange])
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
      >
        <Form.Item
          label={t("Designer.VersionNumber")}
          name="version"
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
      </Form>
    </Modal>
  )
})