import { ActionType, IAppxAction } from "../../../../shared/action/model";
import React, { useCallback } from "react";
import { memo } from "react";
import { Form } from "antd";
import { OpenPagePanel } from "./OpenPagePanel";

const pannels = {
  [ActionType.OpenPage]: OpenPagePanel
}

export const ActionPropertyBox = memo((
  props: {
    action?: IAppxAction,
    onChange?: (action?: IAppxAction) => void,
  }
) => {
  const { action, onChange } = props;
  const [form] = Form.useForm();

  const handleChange = useCallback((fromValues) => {

  }, [])

  const ActionPannel = pannels[action.actionType]


  return (
    <Form
      name="action-property-form"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      onChange={handleChange}
    >
      {
        ActionPannel &&
        <ActionPannel />
      }

    </Form>
  )
})