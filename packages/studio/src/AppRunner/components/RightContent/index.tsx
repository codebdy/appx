import { Space } from 'antd';
import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import Avatar from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch';
import './index.less';
import HeaderSearch from '../HeaderSearch';
import NoticeIconView from '../NoticeIcon';
import SelectLang from '../SelectLang';
// import { SelectLang } from '../SelectLang/SelectLang';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  //const { initialState } = useModel('@@initialState');

  // if (!initialState || !initialState.settings) {
  //   return null;
  // }

  // const { navTheme, layout } = initialState.settings;
   //let className = styles.right;

  // if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
  //   className = `${styles.right}  ${styles.dark}`;
  // }

  return (
    <Space className={"right"}>
      <HeaderSearch
        className={`action search`}
        placeholder="站内搜索"
        defaultValue="rxdrag"
        options={[
          {
            label: <a href="https://umijs.org/zh/guide/umi-ui.html">rxdrag</a>,
            value: 'rxdrag',
          },
          {
            label: <a href="next.ant.design">询盘 </a>,
            value: '询盘',
          },
          {
            label: <a href="https://protable.ant.design/">天气</a>,
            value: '天气',
          },
          {
            label: <a href="https://prolayout.ant.design/">低代码</a>,
            value: '低代码',
          },
        ]} // onSearch={value => {
        //   console.log('input', value);
        // }}
      /> 
      <span
        className={"action"}
        onClick={() => {
          window.open('https://rxdrag.com');
        }}
      >
        <QuestionCircleOutlined />
      </span>
      <NoticeIconView />
      <Avatar menu />
      <SelectLang className={"action"} />
    </Space>
  );
};

export default GlobalHeaderRight;
