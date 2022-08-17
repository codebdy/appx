import { observer } from "@formily/reactive-react";
import React from "react";
import "./style.less"
import { AutoComplete, Input } from 'antd';
import { useCurrentEntity } from "../../../datasource/hooks/useCurrentEntity";

const renderItem = (title: string, count: number) => ({
  value: title,
  label: title,
});

const options = [
  {
    label: 'Libraries',
    options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
  },
  {
    label: 'Solutions',
    options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
  },
  {
    label: 'Articles',
    options: [renderItem('AntDesign design language', 100000)],
  },
];

export const FieldNameSelect = observer(() => {
  const currentEntity = useCurrentEntity();
  console.log("哈哈哈", currentEntity)

  return (
    <>
      <AutoComplete
        dropdownClassName="certain-category-search-dropdown"
        //dropdownMatchSelectWidth={500}
        options={options}
      >
        <Input
          style={{
            paddingRight: "24px"
          }}
        />
      </AutoComplete>
      <span className="ant-select-arrow"
        unselectable="on"
        aria-hidden="true"
        style={{ userSelect: "none", marginTop: -11 }}>
        <span role="img" aria-label="down" className="anticon anticon-down ant-select-suffix">
          <svg viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z">
            </path>
          </svg>
        </span>
      </span>
    </>
  )
})