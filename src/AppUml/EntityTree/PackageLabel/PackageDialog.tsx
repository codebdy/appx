import { Form, Modal, Select } from "antd"
import React, { memo, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { PackageMeta, PackageStereoType } from "../../meta/PackageMeta"
import { MultiLangInput } from "../../../plugins/inputs/components/pc/MultiLangInput/view"
import MonacoEditor from "react-monaco-editor"

const { Option } = Select;

export const PackageDialog = memo((
  props: {
    open?: boolean,
    pkg: PackageMeta,
    onClose: () => void,
    onConfirm: (pkg: PackageMeta) => void,
  }
) => {
  const { open, pkg, onClose, onConfirm } = props;
  const [form] = Form.useForm<PackageMeta>();
  const [stereoType, setStereoType] = useState(PackageStereoType.Normal);
  useEffect(() => {
    form.setFieldsValue(pkg)
    setStereoType(pkg.stereoType)
  }, [form, pkg])
  const { t } = useTranslation();

  const handleConfirm = useCallback(() => {
    form.validateFields().then(changeValues => {
      onConfirm({ ...pkg, ...changeValues })
    })
  }, [onConfirm, form])

  const hanleValuesChange = useCallback((values: PackageMeta) => {
    values.stereoType && setStereoType(values.stereoType)
  }, [])

  const handleEditorDidMount = useCallback((monaco: any) => {
    // monaco.languages?.json.jsonDefaults.setDiagnosticsOptions({
    //   validate: true,
    // });
  }, [])

  return (
    <Modal
      title={t("AppUml.PackageInfo")}
      open={open}
      width={580}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={onClose}
      onOk={handleConfirm}
      wrapProps={
        {
          onClick: (e) => {
            e.stopPropagation()
          },
        }
      }
    >
      <Form
        name="editProcess"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        labelWrap
        initialValues={{ title: "", description: "" }}
        form={form}
        autoComplete="off"
        onValuesChange={hanleValuesChange}
      >
        <Form.Item
          label={t("Name")}
          name="name"
          rules={[{ required: true, message: t("Required") }]}
        >
          <MultiLangInput inline title={t("Name")} />
        </Form.Item>

        < Form.Item
          label={t("AppUml.StereoType")}
          name="stereoType"
        >
          <Select defaultValue={PackageStereoType.Normal}>
            <Option value={PackageStereoType.Normal}>{t("AppUml.NormPackage")}</Option>
            <Option value={PackageStereoType.ThirdParty}>{t("AppUml.ThirdPartyPackage")}</Option>
          </Select>
        </Form.Item>
        {
          stereoType === PackageStereoType.ThirdParty &&
          <Form.Item
            label={t("AppUml.Token script")}
            name="tokenScript"
          >
            <MonacoEditor
              language="javascript"
              options={{
                selectOnLineNumbers: true
              }}
              theme={'vs-dark'}
              editorDidMount={handleEditorDidMount}
              height="300px"
            />
          </Form.Item>
        }

      </Form>
    </Modal>
  )
})