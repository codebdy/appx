import { Button, Input, Radio, RadioChangeEvent, Space, Tabs } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { findIcons, iconCategories } from '../data';
const { TabPane } = Tabs;

export enum IconType {
  Normal = "normal",
  Customized = "Customized"
}

const IconSelectForm = memo((
  props: {
    iconType?: IconType,
    selectedIcon?: string,
    onSelected: (icon: string | undefined) => void,
    customizedIcon?: string,
    onChangeCustomizedIcon: (svgIcon: string | undefined) => void,
    onTypeChange: (iconType: IconType) => void,
  }
) => {
  const { iconType, selectedIcon, onSelected, customizedIcon, onChangeCustomizedIcon, onTypeChange } = props;
  const [keyword, setKeyWord] = useState("");
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

  const handleChange = useCallback((key) => {
    onTypeChange(key)
  }, [onTypeChange]);

  const onCategoryChange = useCallback(({ target: { value } }: RadioChangeEvent) => {
    setCategoryName(value);
  }, []);

  const handleKeywordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value)
  }, [])

  const handleCustomizedChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeCustomizedIcon(event.target.value)
  }, [onChangeCustomizedIcon])

  return (
    <Tabs defaultActiveKey={iconType || IconType.Normal} onChange={handleChange}>
      <TabPane className='icon-pannel' tab={t("IconInput.IconLib")} key={IconType.Normal}>
        <div className='icon-lib-actions'>
          <Radio.Group
            options={categoryButtons}
            onChange={onCategoryChange}
            value={categoryName}
            optionType="button"
            buttonStyle="solid"
          />
          <Input.Search allowClear style={{ flex: 1, marginLeft: 8 }} onChange={handleKeywordChange} />
        </div>
        {
          keyword &&
          <Space style={{ marginTop: 16 }} wrap>
            {
              findIcons(keyword, categoryName).map((icon) => {
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
        }
        {
          !keyword && getCategory(categoryName).iconGroups.map((group) => {
            return (
              <div>
                <h3 style={{ padding: "16px 0" }}>
                  {t("IconInput." + group.name)}
                </h3>
                <div>
                  <Space wrap>
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
        <Input.TextArea
          rows={16}
          value={customizedIcon}
          onChange={handleCustomizedChange}
        />
      </TabPane>
    </Tabs>
  )
});

export default IconSelectForm;