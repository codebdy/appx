import { Button, Input, Radio, RadioChangeEvent, Space, Tabs } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { iconCategories } from '../data';
const { TabPane } = Tabs;

export enum IconType {
  Normal = "normal",
  Customized = "Customized"
}

const IconSelectForm = memo((
  props: {
    selectedIcon?: string,
    onSelected: (icon: string | undefined) => void,
    customizedIcon?: string,
    onChangeCustomizedIcon: (svgIcon: string | undefined) => void,
  }
) => {
  const { selectedIcon, onSelected, customizedIcon, onChangeCustomizedIcon } = props;
  const [categoryName, setCategoryName] = useState(iconCategories[0].name);
  const { t } = useTranslation();

  const getCategory = useCallback((name: string) => {
    for (const category of iconCategories) {
      if (category.name === name) {
        return category;
      }
    }
  }, [])

  const categoryButtons = useMemo(() => iconCategories.map((category) => {
    return {
      label: <>{category.icon} {t("IconInput." + category.name)}</>,
      value: category.name,
      icon: category.icon,
    }
  }), [t])

  const handleChange = useCallback(() => {

  }, []);

  const onCategoryChange = useCallback(({ target: { value } }: RadioChangeEvent) => {
    console.log('radio4 checked', value);
    setCategoryName(value);
  }, []);

  return (
    <Tabs defaultActiveKey={IconType.Normal} onChange={handleChange}>
      <TabPane className='icon-pannel' tab={t("IconInput.IconLib")} key={IconType.Normal}>
        <div className='icon-lib-actions'>
          <Radio.Group
            options={categoryButtons}
            onChange={onCategoryChange}
            value={categoryName}
            optionType="button"
            buttonStyle="solid"
          />
          <Input.Search allowClear style={{ flex: 1, marginLeft: 8 }} />
        </div>
        {
          getCategory(categoryName).iconGroups.map((group) => {
            return (
              <div>
                <h3 style={{ padding: "16px 0" }}>
                  {t("IconInput." + group.name)}
                </h3>
                <div>
                  <Space>
                    {
                      group.icons.map((icon) => {
                        return (
                          <Button
                            size='large'
                            icon={<icon.icon />}
                            type={icon.iconKey === selectedIcon ? "primary" : undefined}
                            onClick={() => onSelected(icon.iconKey)}
                          />
                        )
                      })
                    }
                  </Space>
                </div>
              </div>
            )
          })
        }

      </TabPane>
      <TabPane className='icon-pannel' tab={t("IconInput.Customized")} key={IconType.Customized}>
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  )
});

export default IconSelectForm;