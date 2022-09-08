import React, { useCallback, useRef, useState } from 'react'
import { createBehavior, createResource } from '@designable/core'
import {
  DnFC,
  useTreeNode,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { createFieldSchema } from "../../common/Field";
import { DialogSchema } from './schema'
import { DialogLocales } from './locales'
import { Button } from 'antd'
import { CloseOutlined, EllipsisOutlined } from '@ant-design/icons'
import { IconView } from '../../../shared/icon/IconView'
import { useParseLangMessage } from '../../../hooks/useParseLangMessage'
import { PopupButton } from '../../common/PopupButton'
import { IDialogProps } from '../Dialog'

export const DialogDesigner: DnFC<IDialogProps> = observer((props) => {
  const { title, icon, children, width = 520, centered, ...other } = props;
  const [visible, setVisiable] = useState(false);
  const ref = useRef<HTMLElement>(null)
  const node = useTreeNode()
  const p = useParseLangMessage();

  const viewTree = document.querySelector(".dn-component-tree");
  const treeRect = viewTree?.getBoundingClientRect();
  const viewPort = document.querySelector(".dn-viewport");
  const viewRect = viewPort?.getBoundingClientRect();

  const handleToggleVisiable = useCallback(() => {
    setVisiable(visible => !visible);
  }, [])

  return (
    <>
      {visible &&
        <>
          <div className='rx-dialog-mask'
            style={{
              left: treeRect?.left,
              top: treeRect?.top,
              height: treeRect?.height,
              width: treeRect.width,
            }}
          >
          </div>
          <div className='rx-dialog-wrap'
            style={{
              left: viewRect?.left,
              top: viewRect?.top,
              height: viewRect?.height,
              width: viewRect.width,
              alignItems: centered ? "center" : "flex-start",
            }}
          >
            <div className='rx-dialog-content' style={{
              width: width,
              background: "#fff",
              marginTop: centered ? undefined : 100,
              maxHeight: viewRect?.height - 200,
            }}>
              <div>
                Title
              </div>
              <div style={{
                flex: 1,
                height: 0,
                overflow: "auto",
              }}>
                哈哈哈<br /><br /><br /><br />
                哈<br /><br /><br /><br /><br /><br />
                哈哈哈<br /><br /><br /><br /><br />
                哈哈哈<br /><br /><br /><br />
                哈<br /><br /><br /><br /><br /><br />
                哈哈哈<br /><br /><br /><br /><br />                哈哈哈<br /><br /><br /><br />
                哈<br /><br /><br /><br /><br /><br />
                哈哈哈<br /><br /><br /><br /><br />                哈哈哈<br /><br /><br /><br />
                哈<br /><br /><br /><br /><br /><br />
                哈哈哈<br /><br /><br /><br /><br />                哈哈哈<br /><br /><br /><br />
                哈<br /><br /><br /><br /><br /><br />
                哈哈哈<br /><br /><br /><br /><br />                哈哈哈<br /><br /><br /><br />
                哈<br /><br /><br /><br /><br /><br />
                哈哈哈<br /><br /><br /><br /><br />
                {children}
              </div>
              <PopupButton
                icon={<CloseOutlined style={{ fontSize: 12 }} />}
                onToggleVisiable={handleToggleVisiable}
              />
            </div>
          </div>
        </>
      }
      <div style={{ position: "relative", display: "inline" }}>
        <Button
          icon={icon && <IconView icon={icon} />}
          {...other}
          ref={ref}
        >
          {
            p(title)
          }
        </Button>

        {
          !visible &&
          <PopupButton
            icon={<EllipsisOutlined style={{ fontSize: 12 }} />}
            style={{
              top: 0,
            }}
            onToggleVisiable={handleToggleVisiable}
          />
        }
      </div>
    </>
  )
})

DialogDesigner.Behavior = createBehavior(
  {
    name: 'Dialog',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Dialog',
    designerProps: {
      droppable: true,
      propsSchema: createFieldSchema(DialogSchema),
    },
    designerLocales: DialogLocales,
  },
)

DialogDesigner.Resource = createResource({
  icon: 'OpenPageButtonSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Dialog',
        'x-component-props': {
          title: "Dialog",
        },
      },
    },
  ],
})
