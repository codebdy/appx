import React, { memo, useCallback } from 'react'
import { Button } from 'antd'
import {
  usePrefix,
  IconWidget,
} from "@designable/react"
import cls from 'classnames'
import './styles.less'
import { useDesignerViewKey } from '~/plugin-sdk/contexts/desinger'
import { useRecoilValue } from 'recoil'
import { navigationSelectedIdState } from '../atoms'
import { useRedo } from '../hooks/useRedo'
import { useUndo } from '../hooks/useUndo'
import { useRemoveMenuNode } from '../hooks/useRemoveMenuNode'

export type IMenuToolsWidgetProps = {
  className?: string
  style?: React.CSSProperties
}

export const MenuToolsWidget: React.FC<IMenuToolsWidgetProps> =
  memo((props) => {
    const key = useDesignerViewKey();
    const { redoDisabled, redo } = useRedo();
    const { undoDisabled, undo } = useUndo();
    const remove = useRemoveMenuNode()

    const selectedId = useRecoilValue(
      navigationSelectedIdState(key)
    );
    const prefix = usePrefix('menu-tools')

    const handleUndo = useCallback(() => {
      undo();
    }, [undo])

    const handleRedo = useCallback(() => {
      redo();
    }, [redo])

    const handleRemove = useCallback(()=>{
      remove(selectedId);
    }, [remove, selectedId]);

    return (
      <div style={props.style} className={cls(prefix, props.className)}>
        <Button.Group size="small" style={{ marginRight: 20 }}>
          <Button
            size="small"
            disabled={undoDisabled}
            onClick={handleUndo}
          >
            <IconWidget infer="Undo" />
          </Button>
          <Button
            size="small"
            disabled={redoDisabled}
            onClick={handleRedo}
          >
            <IconWidget infer="Redo" />
          </Button>
        </Button.Group>
        <Button.Group size="small" style={{ marginRight: 20 }}>
          <Button
            size="small"
            disabled={!selectedId}
            onClick={handleRemove}
          >
            <IconWidget infer="Remove" />
          </Button>
        </Button.Group>
      </div>
    )
  })
