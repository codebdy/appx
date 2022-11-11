import { observer } from "@formily/reactive-react"
import React, { CSSProperties, useCallback, useMemo, useRef, useState } from "react"
import { IAppxAction, IconView, IIcon, useParseLangMessage } from '@rxdrag/plugin-sdk'
import { Button, Dropdown, Menu, message } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { DropdownContext } from "../../../../../../plugin-sdk/contexts/dropdown"
import { Schema, useFieldSchema } from "@formily/react"
import { useDoActions } from "~/shared/action"

export interface IDropdownProps {
  title?: string,
  icon?: IIcon,
  style?: CSSProperties,
  showDropdownIcon?: boolean,
  placement?: "bottom" | "bottomLeft" | "bottomRight" | "top" | "topLeft" | "topRight",
  trigger?: Array<"click" | "hover" | "contextMenu">,
  children?: React.ReactNode,
}

const Component: React.FC<IDropdownProps> = observer((props) => {
  const { icon, title, showDropdownIcon, placement, trigger, children, ...other } = props;
  const [loading, setLoading] = useState(false);
  const p = useParseLangMessage();
  const fieldSchema = useFieldSchema();
  const childActionsRef = useRef<any>({})

  const doActions = useDoActions();

  const handleAction = useCallback((onClick?: IAppxAction[]) => {
    if (!onClick) {
      return;
    }
    setLoading(true)
    doActions(onClick)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        error?.message && message.error(error?.message);
        error && console.error(error);
      })
      ;
  }, [doActions, setLoading])

  const handleMenuClick = useCallback(({ key }) => {
    const action = childActionsRef.current[key]
    handleAction(action);
  }, [handleAction])


  const contextValue = useMemo(() => {
    return { loading, setLoading }
  }, [loading])

  return (
    <DropdownContext.Provider value={contextValue}>
      <Dropdown
        overlay={<div>哈哈</div>}
        placement={placement}
        trigger={trigger}
      >
        {
          showDropdownIcon
            ?
            <Button
              icon={icon && <IconView icon={icon} />}
              {...other}
              loading={loading}
            >
              {
                p(title)
              }
              <DownOutlined />
            </Button>
            :
            <Button
              icon={icon && <IconView icon={icon} />}
              {...other}
              loading={loading}
            >
              {
                p(title)
              }
            </Button>
        }

      </Dropdown>
    </DropdownContext.Provider>
  )
})

export default Component;