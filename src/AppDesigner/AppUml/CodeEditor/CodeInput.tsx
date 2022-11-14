import React, { useCallback } from "react";
import { memo } from "react"
import { MonacoInput } from "~/AppDesigner/UiDesigner/SettingsForm/components/MonacoInput";

export const CodeInput = memo((
  props: {
    value?: string,
    onChange?: (value?: string) => void,
  }
) => {
  const { value, onChange } = props;

  const handleChange = useCallback((newValue) => {
    if (value != newValue && onChange) {
      onChange(newValue)
    }
  }, [onChange, value])
  return (
    <div style={{ height: "100%" }}>
      <MonacoInput
        className="gql-input-area"
        options={{
          readOnly: false,
          //lineDecorationsWidth: 0,
          //lineNumbersMinChars: 0,
          //minimap: {
          //  enabled: false,
          //}
        }}
        language="javascript"
        theme="dark"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
})