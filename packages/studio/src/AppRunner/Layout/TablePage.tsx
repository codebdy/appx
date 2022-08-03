import { EllipsisOutlined, LikeOutlined } from "@ant-design/icons";
import { Button, Descriptions, Dropdown, Menu, Result, Space, Statistic } from "antd";
import React from "react";
import { FooterToolbar, PageContainer } from '@ant-design/pro-components';

const content = (
  <Descriptions size="small" column={2}>
    <Descriptions.Item label="创建人">张三</Descriptions.Item>
    <Descriptions.Item label="联系方式">
      <a href="/#">421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="备注">中国浙江省杭州市西湖区古翠路</Descriptions.Item>
  </Descriptions>
);

const TablePage = () => {
  return (
    <PageContainer
      content={content}
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
    </PageContainer>
  )
}

export default TablePage