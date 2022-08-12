
import { memo } from 'react';
import React from 'react';
import { useShowError } from '../../hooks/useShowError';
import { Spin } from 'antd';
import { useAppParams } from '../../shared/AppRoot/context';
import { useMenu } from '../../shared/AppRoot/hooks/useMenu';
import { Device } from '../../model';
import PCRunner from '../PCRunner';
import H5Runner from '../H5Runner';
import WebsiteRunner from '../WebsiteRunner';
import { RunnerContext } from '../context';

const RunnerDistributer = memo(() => {
  const { device } = useAppParams();
  const { menu, error, loading } = useMenu();
  useShowError(error);

  return (
    <RunnerContext.Provider value={{ menu }}>
      <Spin spinning={loading}>
        {
          device === Device.PC &&
          <PCRunner />
        }
        {
          device === Device.H5 &&
          <H5Runner />
        }
        {
          device === Device.WebSite &&
          <WebsiteRunner />
        }
      </Spin>
    </RunnerContext.Provider>
  );
});

export default RunnerDistributer