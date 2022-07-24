
import { EllipsisOutlined, LikeOutlined } from '@ant-design/icons';
import { FooterToolbar, ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProLayout, SettingDrawer } from '@ant-design/pro-components';
import { Button, Descriptions, Dropdown, Menu, Result, Space, Statistic } from 'antd';
import { useState } from 'react';
import defaultProps from './_defaultProps';
import RightContent from '../components/RightContent';
import 'antd/dist/antd.variable.min.css';

const content = (
  <Descriptions size="small" column={2}>
    <Descriptions.Item label="创建人">张三</Descriptions.Item>
    <Descriptions.Item label="联系方式">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="备注">中国浙江省杭州市西湖区古翠路</Descriptions.Item>
  </Descriptions>
);

export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    fixedHeader: true,
    layout: 'mix',
  });
  const [pathname, setPathname] = useState('/welcome');
  return (
    <div
      id="apper-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        onPageChange = {(location)=>console.log("onPageChange", location)}
        title="Apper"
        logo={
          <svg style={{ width: "40px", height: "40px" }} viewBox="0 0 24 24">
            <defs>
              <linearGradient id="logo_color" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3a29e6" />
                <stop offset="90%" stopColor="#f155c3" />
                <stop offset="100%" stopColor="#3a29e6" />
              </linearGradient>
            </defs>
            <path
              style={{ fill: "url(#logo_color)" }}
              d="M23 11.5L19.95 10.37C19.69 9.22 19.04 8.56 19.04 8.56C17.4 6.92 14.75 6.92 13.11 8.56L11.63 10.04L5 3C4 7 5 11 7.45 14.22L2 19.5C2 19.5 10.89 21.5 16.07 17.45C18.83 15.29 19.45 14.03 19.84 12.7L23 11.5M17.71 11.72C17.32 12.11 16.68 12.11 16.29 11.72C15.9 11.33 15.9 10.7 16.29 10.31C16.68 9.92 17.32 9.92 17.71 10.31C18.1 10.7 18.1 11.33 17.71 11.72Z"
            />
          </svg>
        }
        location={{
          pathname,
        }}
        // menuHeaderRender={(logo, title) => (
        //   <div
        //     id="customize_menu_header"
        //     onClick={() => {
        //       window.open('https://rxdrag.com/');
        //     }}
        //     style={{
        //       display: "flex",
        //       alignItems: "center",
        //     }}
        //   >
        //     {logo}
        //     {title}
        //   </div>
        // )}
        waterMarkProps={{
          content: 'Apper',
        }}
        // menuFooterRender={(props) => {
        //   return (
        //     <a
        //       style={{
        //         lineHeight: '48rpx',
        //         display: 'flex',
        //         height: 48,
        //         color: 'rgba(255, 255, 255, 0.65)',
        //         alignItems: 'center',
        //       }}
        //       href="https://preview.pro.ant.design/dashboard/analysis"
        //       target="_blank"
        //       rel="noreferrer"
        //     >
        //       <img
        //         alt="pro-logo"
        //         src="https://procomponents.ant.design/favicon.ico"
        //         style={{
        //           width: 16,
        //           height: 16,
        //           margin: '0 16px',
        //           marginRight: 10,
        //         }}
        //       />
        //       {!props?.collapsed && 'Preview Pro'}
        //     </a>
        //   );
        // }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
        // headerContentRender={() => (
        //   <div>外贸CRM</div>
        // )}
        rightContentRender={() => (
          <RightContent />
        )}
        {...settings}
      >
        <PageContainer
          content={content}
          //header = {{title:"哈哈"}}
          tabList={[
            {
              tab: '基本信息',
              key: 'base',
              closable: false,
            },
            {
              tab: '详细信息',
              key: 'info',
              closable: false,
            },
          ]}
          tabProps={{
            type: 'editable-card',
            hideAdd: false,
            onEdit: (e, action) => console.log(e, action)
          }}
          onTabChange={(key) => console.log("onTabChange", key)}
          tabBarExtraContent="测试tabBarExtraContent"
          extraContent={
            <Space size={24}>
              <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
              <Statistic title="Unmerged" value={93} suffix="/ 100" />
            </Space>
          }
          extra={[
            <Button key="3">操作3</Button>,
            <Button key="2">操作2</Button>,
            <Button key="1" type="primary">
              主操作
            </Button>,
            <Dropdown
              key="dropdown"
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item key="1">下拉菜单</Menu.Item>
                  <Menu.Item key="2">下拉菜单2</Menu.Item>
                  <Menu.Item key="3">下拉菜单3</Menu.Item>
                </Menu>
              }
            >
              <Button key="4" style={{ padding: '0 8px' }}>
                <EllipsisOutlined />
              </Button>
            </Dropdown>,
          ]}
          // footer={[
          //   <Button key="3">重置</Button>,
          //   <Button key="2" type="primary">
          //     提交
          //   </Button>,
          // ]}
        >
          <div
            style={{
              height: '120vh',
            }}
          >
            <Result
              status="404"
              style={{
                height: '100%',
                background: '#fff',
              }}
              title="Hello World"
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Button type="primary">Back Home</Button>}
            />
          </div>
          <FooterToolbar
            style={{
              left: 208,
              width: `calc(100% - 208px)`,
            }}
          >
            <Button key="3">重置</Button>,
            <Button key="2" type="primary">提交</Button>
          </FooterToolbar>
        </PageContainer>
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        enableDarkTheme
        getContainer={() => document.getElementById('apper-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
        disableUrlParams={true}
      />
    </div>
  );
};