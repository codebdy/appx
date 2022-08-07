import React, { Fragment, useMemo } from 'react'
import { Tabs, Badge } from 'antd'
import { model, markRaw } from '@formily/reactive'
import { TabPaneProps, TabsProps } from 'antd/lib/tabs'
import {
  useField,
  ReactFC,
  observer,
  useFieldSchema,
  RecursionField,
} from '@formily/react'
import { Schema, SchemaKey } from '@formily/json-schema'
import cls from 'classnames'
import { usePrefixCls } from '@formily/antd/esm/__builtins__'

export interface ISettingsTab {
  activeKey: string
  setActiveKey(key: string): void
}

export interface ISettingsTabProps extends TabsProps {
  formTab?: ISettingsTab
}

export interface ISettingsTabPaneProps {
  key: string | number,
  tab?: React.ReactNode;
}

type ComposedSettingsTab = React.FC<React.PropsWithChildren<ISettingsTabProps>> & {
  TabPane: React.FC<React.PropsWithChildren<ISettingsTabPaneProps>>
}

const useTabs = () => {
  const tabsField = useField()
  const schema = useFieldSchema()
  const tabs: { name: SchemaKey; props: any; schema: Schema }[] = []
  schema.mapProperties((schema, name) => {
    const field = tabsField.query(tabsField.address.concat(name)).take()
    if (field?.display === 'none' || field?.display === 'hidden') return
    if (schema['x-component']?.indexOf('TabPane') > -1) {
      tabs.push({
        name,
        props: {
          key: schema?.['x-component-props']?.key || name,
          ...schema?.['x-component-props'],
        },
        schema,
      })
    }
  })
  return tabs
}

const SettingsTab: ComposedSettingsTab = observer((props: TabsProps) => {
  const tabs = useTabs()
  const prefixCls = usePrefixCls('settings-tab', props)
  const activeKey = props.activeKey
  //const field = useField()
  //console.log("哈哈", tabs)

  return (
    <Tabs
      {...props}
      className={cls(prefixCls, props.className)}
      activeKey={activeKey}
      onChange={(key) => {
        props.onChange?.(key)
      }}
    >
      {tabs.map(({ props, schema, name }, key) => (
        <RecursionField key={key} schema={schema} name={name} />
      ))}
    </Tabs>
  )
}) as unknown as ComposedSettingsTab

const TabPane: React.FC<ISettingsTabPaneProps> = observer((
  props: {
    key: string | number,
    children: React.ReactNode
  }
) => {

  const field = useField()
  console.log("呵呵呵呵", field.title)
  return <Tabs.TabPane
    key = {field.props?.name}
    {...props}
    tab={field.title}
    forceRender
  >{props.children}</Tabs.TabPane>
})

SettingsTab.TabPane = TabPane

export default SettingsTab