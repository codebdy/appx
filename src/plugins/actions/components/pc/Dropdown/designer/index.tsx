import React, { useMemo, useRef, useState } from 'react'
import {
  DnFC,
  TreeNodeWidget,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { IDropdownProps } from '../view'
import { useFindNode } from '@rxdrag/plugin-sdk'
import { IPopupPanelProps } from '../view/PopupPanel'
import { PopupPanelDesigner } from './PopupPanelDesigner'
import { DropdownDesignerContext } from './context'
import { ButtonProps } from '../view/Button'
import ButtonDesigner from './ButtonDesigner'
import { Dropdown } from 'antd'

const ComponentDesigner: DnFC<IDropdownProps> & {
  PopupPanel?: React.FC<IPopupPanelProps>,
  Button?: React.FC<ButtonProps>
} = observer((props) => {
  const { placement, children, ...other } = props;
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null)
  const pannel = useFindNode("PopupPanel");
  const button = useFindNode("Button");

  const config = useMemo(() => {
    return {
      visible,
      setVisible
    }
  }, [visible])

  return (
    <DropdownDesignerContext.Provider value={config} >
      <div ref={ref}>
        <Dropdown
          overlay={
            <div>
              <TreeNodeWidget node={pannel} />
            </div>
          }
          open={visible}
          placement={placement}
          getPopupContainer={() => ref.current}
          {...other}
        >
          <TreeNodeWidget node={button} />
        </Dropdown>
      </div>
    </DropdownDesignerContext.Provider>
  )
})

ComponentDesigner.Button = ButtonDesigner
ComponentDesigner.PopupPanel = PopupPanelDesigner

export default ComponentDesigner;