import React from "react"
import { memo } from "react"
import { MonacoInput } from "~/AppDesigner/UiDesigner/SettingsForm/components/MonacoInput";

function formatXml(xml) {
  // https://stackoverflow.com/questions/57039218/doesnt-monaco-editor-support-xml-language-by-default
  const PADDING = ' '.repeat(2);
  const reg = /(>)(<)(\/*)/g;
  let pad = 0;

  xml = xml.replace(reg, '$1\r\n$2$3');

  return xml.split('\r\n').map((node, index) => {
    let indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/) && pad > 0) {
      pad -= 1;
    } else if (node.match(/^<\w[^>]*[^/]>.*$/)) {
      indent = 1;
    } else {
      indent = 0;
    }

    pad += indent;

    return PADDING.repeat(pad - indent) + node;
  }).join('\r\n');
}
export const XmlEditor = memo((
  props: {
    value?: string,
    onChange?: (value?: string) => void,
  }
) => {
  const { value, onChange } = props;
  const handleEditorDidMount = (editor: any, monaco: any) => {
    //不起作用，先不管了
    monaco.languages?.registerDocumentFormattingEditProvider('xml', {
      async provideDocumentFormattingEdits(model, options, token) {
        return [
          {
            range: model.getFullModelRange(),
            text: formatXml(model.getValue()),
          },
        ];
      },
    });
  }

  return (
    <MonacoInput
      className="gql-input-area"
      options={{
        readOnly: false,
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 0,
        minimap: {
          enabled: false,
        }
      }}
      language="xml"
      value={value}
      onChange={onChange}
    />

  )
})