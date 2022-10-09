import { Form, Modal, Select } from "antd"
import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { PackageMeta, PackageStereoType } from "../../meta/PackageMeta"
import { MultiLangInput } from "../../../plugins/inputs/components/pc/MultiLangInput/view"

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
  const { t } = useTranslation();
  return (
    <Modal
      title={t("AppUml.PackageInfo")}
      open={open}
      width={580}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={onClose}
      onOk={() => onConfirm(pkg)}
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
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ title: "", description: "" }}
        form={form}
        autoComplete="off"
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
          <Select>
            <Option value={PackageStereoType.Normal}>{t("AppUml.NormPackage")}</Option>
            <Option value={PackageStereoType.ThirdParty}>{t("AppUml.ThirdPartyPackage")}</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
})