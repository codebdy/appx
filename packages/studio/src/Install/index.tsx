import { LoadingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { gql } from 'awesome-graphql-client';
import React, { memo } from 'react';
import { useEndpoint } from '../enthooks';
import { useRequest } from '../enthooks/hooks/useRequest';
import { useShowError } from '../hooks/useShowError';
import { getLocalMessage } from '../locales/getLocalMessage';
import InstallForm from './InstallForm';

const queryGql = gql`
  query installed() {
    installed()
  }
`;

const Install = memo(() => {
  const { data, error, loading } = useRequest(queryGql);
  const endpoint = useEndpoint();
  console.log("呵呵", endpoint)
  useShowError(error)

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      background: "url(/public/img/background1.jpg)",
      height: "100vh",
      backgroundPosition: " 50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}>
      <Card
        title={getLocalMessage("install.Title")}
      >
        {
          loading ?
            <div style={{
              minHeight: 160,
              width: 400,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <LoadingOutlined style={{ fontSize: 50, color: "blue" }} />
            </div>
            : (
              data?.installed ?
                getLocalMessage("install.InstalledMessage")
                :
                (!error && <InstallForm />)
            )

        }
        {
          error && <div style={{ color: "red" }}>{error.message}</div>
        }


      </Card>
    </div>
  );
});

export default Install;