import { TranslationOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { useParseLangMessage } from "../../../hooks/useParseLangMessage";
import { useAppConfig } from "../../../shared/AppRoot/context";
import ResourceEditDialog from "./ResourceEditDialog";

export const MultiLangInput = (
  props?: {
    multiline?: boolean,
    onChange?: (value: string) => void,
    value?: string,
    inline?: boolean,
    title?: string,
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  }
) => {
  const { multiline, onChange, onKeyUp, value, inline, title } = props;
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

  const handleDiaglogChange = useCallback((value?: string) => {
    onChange && onChange(value)
  }, [onChange])

  const hanldeCInputCtrlChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange && onChange(event.target.value)
  }, [onChange])

  return (
    <>
      <Input.Group compact>
        <InputCtrl style={{ width: isMultLang ? 'calc(100% - 32px)' : "100%" }} onKeyUp={onKeyUp as any} value={parsedValue} onChange={hanldeCInputCtrlChange} />
        {
          isMultLang &&
          <Button icon={<TranslationOutlined />} style={{ width: "32px" }} onClick={handleOpen}></Button>
        }

      </Input.Group>
      <ResourceEditDialog
        visiable={visiable}
        multiline={multiline}
        value={value}
        inline={inline}
        title={title}
        onClose={handleClose}
        onChange={handleDiaglogChange}
      />
    </>
  )
}
