import { observer } from "@formily/reactive-react"
import React, { useMemo } from "react"
import cls from "classnames"
import "./style.less"
import { Button, Dropdown, Menu, Space, Typography } from "antd"
import { CheckOutlined, ClockCircleOutlined, CloseOutlined, FileAddOutlined, HistoryOutlined, MoreOutlined, NodeIndexOutlined, QuestionCircleOutlined, UserAddOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"

export interface IApprovalBarProps {
  className?: string,
  children?: React.ReactNode,
}

export const ApprovalBar = observer((props: IApprovalBarProps) => {
  const { className, children, ...other } = props;
  const { t } = useTranslation();

  const menu = useMemo(() => (
    <Menu
      items={[
        {
          icon: <UserAddOutlined />,
          label: "加签",
          key: '0',
          onClick: e => {
            //e.domEvent.stopPropagation();
            //handleAddDiagram();
          }
        },

        {
          icon: <ClockCircleOutlined />,
          label: "催办",
          key: '1',
          onClick: e => {
            //e.domEvent.stopPropagation();
            //handleAddDiagram();
          }
        },
        {
          icon: <HistoryOutlined />,
          label: "审批详情",
          key: '2',
          onClick: e => {
            //e.domEvent.stopPropagation();
            //handleAddDiagram();
          }
        },
        {
          icon: <NodeIndexOutlined />,
          label: "审批流程图",
          key: '3',
          onClick: e => {
            //e.domEvent.stopPropagation();
            //handleAddDiagram();
          }
        },
      ]}
    />
  ), [t]);

  return (
    <div className={cls("appx-arroval-bar", className)} {...other}>
      <Space direction="vertical" size="large">
        <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
          <div>
            <Typography.Text type="secondary">状态</Typography.Text>
            <Typography.Title level={3} style={{ margin: 0 }}>
              费用待批
            </Typography.Title>
          </div>
        </div>
        <Space>
          <Button icon={<CloseOutlined />}>驳回</Button>
          <Button type="primary" icon={<CheckOutlined />}>通过</Button>
          <Dropdown
            overlay={menu}
            trigger={['click']}
          >
            <Button icon={<MoreOutlined />}></Button>
          </Dropdown>
        </Space>
      </Space>
    </div>
  )
})