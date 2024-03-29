import React, { memo } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { useDesignerAppConfig } from '~/plugin-sdk/contexts/desinger';
import { useTranslation } from 'react-i18next';
import { TranslationOutlined } from '@ant-design/icons';

export interface IComponentProps {
}

const SelectLang = memo((props: IComponentProps) => {
  //const [selectedLang, setSelectedLang] = useState(() => getLocale());

  const appConfig = useDesignerAppConfig();
  const { t, i18n } = useTranslation();
  const handleClick = ({ key }): void => {
    i18n.changeLanguage(key)
  };

  const isMultLang = appConfig?.schemaJson?.multiLang?.open;
  const langMenu = (
    <Menu selectedKeys={[i18n.language]} onClick={handleClick}>
      {appConfig?.schemaJson?.multiLang?.langs?.map((lang) => {
        return (
          <Menu.Item key={lang.key} >
            <span role="img" style={{ marginRight: 8 }}>
              {lang.abbr}
            </span>
            {t("Lang." + lang.key)}
          </Menu.Item>
        );
      })}
    </Menu>
  );


  return (
    isMultLang ?
      <Dropdown
        overlay={langMenu}
        placement={'bottomLeft'}
        trigger={["click"]}
      >
        <Button
          type='text'
          shape='circle'
          icon={<TranslationOutlined />}>
        </Button>
      </Dropdown >
      :
      <></>
  );
});

export default SelectLang