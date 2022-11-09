import { observer } from "@formily/reactive-react"
import { Button, Form, Modal } from "antd"
import React, { useCallback, useMemo, useState } from "react"
import { IconWidget } from "../IconWidget"
import {
  useTree,
  useSelected
} from '@designable/react'
import { useTranslation } from "react-i18next"
import { useUpsertTemplate } from "../../hooks/useUpsertTemplate"
import { useDesignerParams } from "~/plugin-sdk"
import { useShowError } from "~/AppDesigner/hooks/useShowError"
import { CategoryType, TemplateType } from "~/model"
import { transForm } from "./transform"
import { SaveTemplateForm } from "./SaveTemplateForm"

export const SaveTemplateWidget = observer((
  props: {
    templateType: TemplateType
  }
) => {
  const { templateType } = props;
  const [open, setOpen] = useState(false);
  const { app, device } = useDesignerParams();
  const selected = useSelected();
  const { t } = useTranslation();
  const tree = useTree()
  const [form] = Form.useForm()

  const elements = useMemo(() => {
    return selected?.map(id => transForm(tree.findById(id)))
  }, [selected, tree])

  const [upsert, { error, loading }] = useUpsertTemplate({
    onCompleted: () => {
      form.resetFields();
      setOpen(false);
    }
  });

  useShowError(error)

  const handleShowModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    form.validateFields().then((values: any) => {
      upsert({
        ...values,
        templateType: templateType,
        categoryType: CategoryType.Local,
        device,
        app: {
          sync: {
            id: app.id
          }
        },
        schemaJson: {
          elements
        }
      })
    })

  }, [upsert, templateType, elements]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setOpen(false);
  }, [form]);

  const disabled = useMemo(() => {
    if (selected?.length !== 1) {
      return true;
    }
    for (const id of selected) {
      const node = tree.findById(id);
      if (node?.isRoot) {
        return true
      }
      if (!node?.allowDelete()) {
        return true
      }

      if (!node?.allowClone()) {
        return true
      }
    }

    return false
  }, [selected, tree])

  return (
    <>
      <Button.Group size="small" style={{ marginRight: 20 }}>
        <Button
          size="small"
          disabled={disabled}
          onClick={handleShowModal}
        >
          <IconWidget infer={
            <svg viewBox="0 0 1052 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M980.89528438 220.78016375L772.66858531 48.57737469a40.22138625 40.22138625 0 0 0-5.31326062-3.77241563A88.35953062 88.35953062 0 0 0 722.40513594 32a80.81470031 80.81470031 0 0 0-45.05645344 13.76134594c-34.74872719 22.79388937-39.90259031 59.77418625-42.13416 75.60770437l-0.42506063 3.08169094a46.96922719 46.96922719 0 0 0-0.63759093 7.38543281v7.49169844C342.18817813 172.74828406 222.85233594 403.34381188 222.85233594 621.7719725a445.35753844 445.35753844 0 0 0 16.63050656 120.29222906c5.31326062 19.28713781 24.2816025 36.60836812 41.44343625 32.5171575 10.62652219 0 22.20943125-24.91919438 27.52269188-44.20633125 34.05800344-121.35488156 187.45184812-249.72326719 325.6497675-265.66305094v1.54084594c0 39.95572313 14.02700906 69.55058625 41.86849687 87.88133719a79.11445688 79.11445688 0 0 0 96.6482175-4.51627219l207.58910813-171.67146281a102.28027406 102.28027406 0 0 0 0.63759093-157.48505719z m-24.97232626 85.59663469a10.62652219 10.62652219 0 0 1-1.70024437 1.59397875L712.09740969 494.25370812a48.45694031 48.45694031 0 0 1-0.95638688-11.90170499V428.31613906a50.36971406 50.36971406 0 0 0-45.69404437-51.16670344C510.19349094 365.72592406 342.66637156 501.37347781 276.41000656 649.66659313c-9.82953281-189.20522438 142.23599719-444.93247688 388.45251281-441.47885813 25.92871406 0.37192781 46.22537063-24.01593937 46.22537063-51.21983625v-51.53863125a69.07239281 69.07239281 0 0 1 2.76289594-13.23002062l241.11578437 198.9284925a10.62652219 10.62652219 0 0 1 1.00951969 15.24905906z" ></path><path d="M192.40734969 34.76289594C104.04781906 34.76289594 32 98.36262969 32 184.33119312v651.83086125c0 85.96856344 71.99468719 155.83794562 160.4604825 155.83794563h665.64534c88.51892813 0 160.51361531-69.86938219 160.51361531-155.83794563V546.85499187h-73.64179781V855.55545688c0 38.52114281-27.20389594 64.76865188-66.84082312 64.76865187H172.58888656c-39.63692719 0-66.84082313-26.30064188-66.84082406-64.76865188V170.88864313C105.7480625 132.47376594 132.95195938 106.38565438 172.58888656 106.38565438h272.41089188L444.84038094 34.76289594H192.40734969z" ></path></svg>
          } />
        </Button>
      </Button.Group>
      <Modal
        title={t("Designer.SaveAsTemplate")}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
        okButtonProps={{
          loading: loading
        }}
      >
        <SaveTemplateForm form={form} />
      </Modal>
    </>
  )
})