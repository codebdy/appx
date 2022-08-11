import { Input, Radio, RadioChangeEvent, Tabs } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { iconCategories } from '../data';
const { TabPane } = Tabs;

const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
];


export enum IconType {
  Normal = "normal",
  Customized = "Customized"
}

const IconSelectForm = memo(() => {
  const [category, setCategory] = useState(iconCategories[0].name);
  const { t } = useTranslation();

  const handleChange = useCallback(() => {

  }, []);

  const onCategoryChange = useCallback(({ target: { value } }: RadioChangeEvent) => {
    console.log('radio4 checked', value);
    setCategory(value);
  }, []);

  return (
    <Tabs defaultActiveKey={IconType.Normal} onChange={handleChange}>
      <TabPane className='icon-pannel' tab={t("IconInput.IconLib")} key={IconType.Normal}>
        <div className='icon-lib-actions'>
          <Radio.Group
            options={optionsWithDisabled}
            onChange={onCategoryChange}
            value={category}
            optionType="button"
            buttonStyle="solid"
          />
          <Input.Search allowClear style={{ flex: 1, marginLeft: 8 }} />
        </div>
        Content of Tab <br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1
        Content of Tab <br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1
        Content of Tab <br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1
        Content of Tab <br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1
        Content of Tab <br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1
      </TabPane>
      <TabPane className='icon-pannel' tab={t("IconInput.Customized")} key={IconType.Customized}>
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  )
});

export default IconSelectForm;