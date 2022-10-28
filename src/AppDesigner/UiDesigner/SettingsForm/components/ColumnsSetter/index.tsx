import React from 'react'
import { useField, Field, observer } from '@formily/react'
import { NumberPicker } from '@formily/antd'
import { FoldItem, InputItems } from '@designable/react-settings-form'
import cls from 'classnames'
import "./style.less"

export interface IColumnsSetterProps {
  className?: string
  style?: React.CSSProperties
}


export const ColumnsSetter: React.FC<IColumnsSetterProps> = observer(
  (props) => {
    const field = useField()

    return (
      <FoldItem
        label={field.title}
        className={cls(props.className)}
        style={props.style}
      >
        <FoldItem.Base>
          <Field
            name="columns"
            basePath={field.address.parent()}
            component={[
              NumberPicker,
              { style: { width: '100%' }},
            ]}
          />
        </FoldItem.Base>
        <FoldItem.Extra>
          <InputItems>
            <InputItems.Item title={<div className='columns-input-title'>xs</div>} width="50%">
              <Field
                name="xs"
                basePath={field.address.parent()}
                component={[NumberPicker]}
              />
            </InputItems.Item>
            <InputItems.Item title={<div className='columns-input-title'>sm</div>} width="50%">
              <Field
                name="sm"
                basePath={field.address.parent()}
                component={[NumberPicker]}
              />
            </InputItems.Item>
            <InputItems.Item title={<div className='columns-input-title'>md</div>} width="50%">
              <Field
                name="md"
                basePath={field.address.parent()}
                component={[NumberPicker]}
              />
            </InputItems.Item>
            <InputItems.Item title={<div className='columns-input-title'>lg</div>} width="50%">
              <Field
                name="lg"
                basePath={field.address.parent()}
                component={[NumberPicker]}
              />
            </InputItems.Item>
            <InputItems.Item title={<div className='columns-input-title'>xl</div>} width="50%">
              <Field
                name="xl"
                basePath={field.address.parent()}
                component={[NumberPicker]}
              />
            </InputItems.Item>
            <InputItems.Item title={<div className='columns-input-title'>xxl</div>} width="50%">
              <Field
                name="xxl"
                basePath={field.address.parent()}
                component={[NumberPicker]}
              />
            </InputItems.Item>
          </InputItems>
        </FoldItem.Extra>
      </FoldItem>
    )
  }
)
