import { Avatar, List } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import SvgIcon from '../common/SvgIcon';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export const PluginList = memo(() => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="vertical"
      dataSource={list}
      size="large"
      renderItem={(item) => (
        <List.Item
          actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
        >
          <List.Item.Meta
            avatar={<Avatar icon={
              <SvgIcon>
                <svg style={{ width: "24px", height: "24px", marginTop: 4 }} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 6V5A2 2 0 0 0 17 3H15A2 2 0 0 0 13 5V6H11V5A2 2 0 0 0 9 3H7A2 2 0 0 0 5 5V6H3V20H21V6M19 18H5V8H19Z" />
                </svg>
              </SvgIcon>
            } />}
            title={item.name?.last}
            description="Version 1.0"
          />
          <div>Ant Design, a design language for background applications, is refined by Ant UED Team</div>
        </List.Item>
      )}
    />
  );
});
