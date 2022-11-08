import React from 'react'
import {
  IResource,
} from '@designable/core'
import { observer } from '@formily/reactive-react'
import { usePrefix, IconWidget, TextWidget } from '@designable/react'
import './styles.less'

export type SourceMapper = (resource: IResource) => React.ReactChild

export interface IResourceNodeWidgetProps {
  source?: IResource
}

export const ResourceNodeWidget: React.FC<IResourceNodeWidgetProps> = observer(
  (props) => {
    const prefix = usePrefix('resource')

    const { node, icon, title, thumb, span } = props.source || {}
    return (
      <div
        className={prefix + '-item'}
        style={{ gridColumnStart: `span ${span || 1}` }}
        key={node.id}
        data-designer-source-id={node.id}
      >
        {thumb && <img className={prefix + '-item-thumb'} src={thumb} />}
        {icon && React.isValidElement(icon) ? (
          <>{icon}</>
        ) : (
          <IconWidget
            className={prefix + '-item-icon'}
            infer={icon}
            style={{ width: 150, height: 40 }}
          />
        )}
        <span className={prefix + '-item-text'}>
          {
            <TextWidget>
              {title || node.children[0]?.getMessage('title')}
            </TextWidget>
          }
        </span>
      </div>
    )
  }
)
