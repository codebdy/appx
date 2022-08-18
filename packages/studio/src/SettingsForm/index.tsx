import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { Form } from '@formily/antd'
import { observer } from '@formily/react'
import { requestIdle, cancelIdle } from '@designable/shared'
import {
  usePrefix,
  useSelected,
  useOperation,
  useCurrentNode,
  useWorkbench,
  IconWidget,
  NodePathWidget,
} from '@designable/react'
import { SettingsFormContext } from '@designable/react-settings-form/lib//shared/context'
import { useLocales, useSnapshot } from '@designable/react-settings-form/lib//effects'
import { Empty, Tooltip } from 'antd'
import cls from 'classnames'
import './styles.less'
import { ISettingFormProps } from './types'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { SchemaField } from './SchemaField'
import "./locales"

const GlobalState = {
  idleRequest: null,
}

export const SettingsForm: React.FC<ISettingFormProps> = observer(
  (props) => {
    const workbench = useWorkbench()
    const currentWorkspace =
      workbench?.activeWorkspace || workbench?.currentWorkspace
    const currentWorkspaceId = currentWorkspace?.id
    const operation = useOperation(currentWorkspaceId)
    const node = useCurrentNode(currentWorkspaceId)
    const selected = useSelected(currentWorkspaceId)
    const prefix = usePrefix('settings-form')
    const schema = node?.designerProps?.propsSchema
    const isEmpty = !(
      node &&
      node.designerProps?.propsSchema &&
      selected.length === 1
    )
    const form = useMemo(() => {
      return createForm({
        initialValues: node?.designerProps?.defaultProps,
        values: node?.props,
        effects(form) {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useLocales(node)
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useSnapshot(operation)
          props.effects?.(form)
        },
      })
    }, [node, operation, props])

    const render = () => {
      if (!isEmpty) {
        return (
          <div
            className={cls(prefix, props.className)}
            style={props.style}
            key={node.id}
          >
            <SettingsFormContext.Provider value={props}>
              <Form
                form={form}
                colon={false}
                labelWidth={120}
                labelAlign="left"
                wrapperAlign="right"
                feedbackLayout="none"
                tooltipLayout="text"
              >
                <SchemaField
                  schema={schema}
                  components={props.components}
                  scope={{ $node: node, ...props.scope }}
                />
              </Form>
            </SettingsFormContext.Provider>
          </div>
        )
      }
      return (
        <div className={prefix + '-empty'}>
          <Empty />
        </div>
      )
    }

    return (
      <IconWidget.Provider tooltip>
        <div className={prefix + '-wrapper'}>
          {!isEmpty &&
            <div
              className='node-path-area'
            >
              <NodePathWidget workspaceId={currentWorkspaceId} />
              <Tooltip placement="left" title={node.getMessage("description")}>
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
          }
          <div className={prefix + '-content'}>{render()}</div>
        </div>
      </IconWidget.Provider>
    )
  },
  {
    scheduler: (update) => {
      cancelIdle(GlobalState.idleRequest)
      GlobalState.idleRequest = requestIdle(update, {
        timeout: 500,
      })
    },
  }
)
