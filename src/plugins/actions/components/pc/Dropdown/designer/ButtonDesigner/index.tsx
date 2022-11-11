import { DownOutlined } from '@ant-design/icons';
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react";
import { Button } from 'antd';
import React, { useCallback } from "react";
import { useParseLangMessage } from '~/plugin-sdk';
import { ButtonProps } from '../../view/Button';
import { useDropdownDesignerParams } from '../context';

const ComponentDesigner: DnFC<ButtonProps> = observer((props) => {
  const { showDropdownIcon, onClick, title, ...other } = props;
  const p = useParseLangMessage();
  const { setVisible } = useDropdownDesignerParams()
  const handleClick = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  return <Button {...other} onClick={handleClick}>
    {p(title)}
    {
      showDropdownIcon && <DownOutlined />
    }
  </Button>
})

export default ComponentDesigner;
