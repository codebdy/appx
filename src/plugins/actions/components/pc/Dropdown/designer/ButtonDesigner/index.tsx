import { DownOutlined } from '@ant-design/icons';
import {
  DnFC,
  useTreeNode,
  useSelected,
  useTree,
} from '@designable/react'
import { observer } from "@formily/reactive-react";
import { Button } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParseLangMessage } from '~/plugin-sdk';
import { ButtonProps } from '../../view/Button';
import { useDropdownDesignerParams } from '../context';

const ComponentDesigner: DnFC<ButtonProps> = observer((props) => {
  const { showDropdownIcon, onClick, title, ...other } = props;
  const [canShow, setCanShow] = useState(false);
  const p = useParseLangMessage();
  const { visible, setVisible } = useDropdownDesignerParams()
  const tree = useTree();

  const node = useTreeNode()
  const selected = useSelected();

  const isSelected = useMemo(() => selected?.[0] === node.id, [node, selected])
  useEffect(() => {
    if (!visible) {
      tree.operation.selection.select(node.id)
    }
  }, [visible, tree, node])

  useEffect(() => {
    setCanShow(isSelected)
  }, [isSelected])

  const handleClick = useCallback(() => {
    if (canShow) {
      setVisible(true);
    }

  }, [canShow, setVisible]);

  return <Button {...other} onClick={handleClick}>
    {p(title)}
    {
      showDropdownIcon && <DownOutlined />
    }
  </Button>
})

export default ComponentDesigner;
