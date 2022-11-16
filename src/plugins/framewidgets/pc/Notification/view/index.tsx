import { Dropdown, Button, Badge } from 'antd';
import './style.less';
import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { NotificationBox } from './NotificationBox';
import { useSubscribeNotificationCounts } from '../../../hooks/useSubscribeNotificationCounts';
import { useShowError } from '~/AppRunner/hooks/useShowError';

export const Notification: React.FC = () => {
  const { count, error } = useSubscribeNotificationCounts()
  useShowError(error)
  return (
    <Dropdown
      placement="bottomRight"
      overlay={<NotificationBox />}
      overlayClassName={"popover"}
      trigger={['click']}
    //open={visible}
    //onOpenChange={setVisible}
    >
      <Badge count={count} style={{ boxShadow: 'none' }} className={"badge"}>
        <Button type="text" style={{ borderRadius: 8 }} icon={<BellOutlined className={"icon"} />}></Button>
      </Badge>
    </Dropdown>
  )
};

