import { TranslationOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { useParseLangMessage } from "../../hooks/useParseLangMessage";
import { useAppConfig } from "../AppRoot/context";
import ResourceEditDialog from "./ResourceEditDialog";

const MultiLangInput = (
  props?: {
    multiline?: boolean,
    onChange?: (event: { target: { value: string } }) => void,
    value?: string,
  }
) => {
  const { multiline, onChange, value } = props;
  const appConfig = useAppConfig();
  const [visiable, setVisiable] = useState(false);

  const parse = useParseLangMessage();

  const handleOpen = useCallback(() => {
    setVisiable(true)
  }, [])

  const handleClose = useCallback(() => {
    setVisiable(false)
  }, [])

  const InputCtrl = useMemo(() => multiline ? Input.TextArea : Input, [multiline]);

  const isMultLang = appConfig?.schemaJson?.multiLang?.open;

  const parsedValue = useMemo(() => parse(value), [parse, value]);

  return (
    <>
      <Input.Group compact>
        <InputCtrl style={{ width: isMultLang ? 'calc(100% - 32px)' : "100%" }} value={parsedValue} onChange={onChange} />
        {
          isMultLang &&
          <Button icon={<TranslationOutlined />} style={{ width: "32px" }} onClick={handleOpen}></Button>
        }

      </Input.Group>
      <ResourceEditDialog visiable={visiable} multiline={multiline} value={value} onClose={handleClose} />
    </>
  )
}

export default MultiLangInput;