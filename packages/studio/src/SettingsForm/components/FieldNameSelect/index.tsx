import { observer } from "@formily/reactive-react";
import React from "react";
import "./style.less"
import { AutoComplete, Input } from 'antd';

const renderTitle = (title: string) => (
  <span>
    {title}
    <a
      style={{ float: 'right' }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);

const renderItem = (title: string, count: number) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
      }}
    >
      {title}
    </div>
  ),
});

const options = [
  {
    label: renderTitle('Libraries'),
    options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
  },
  {
    label: renderTitle('Solutions'),
    options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
  },
  {
    label: renderTitle('Articles'),
    options: [renderItem('AntDesign design language', 100000)],
  },
];

export const FieldNameSelect = observer(() => {
  return (
    <AutoComplete
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={500}
      style={{ width: 250 }}
      options={options}
    >
      <Input size="large" placeholder="input here" />
    </AutoComplete>
  )
})