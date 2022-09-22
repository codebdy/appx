
import { memo } from 'react';
import React from 'react';
import { useShowError } from '../../hooks/useShowError';
import { Spin } from 'antd';
import { useAppParams } from '../../shared/AppRoot/context';
import { useMenu } from '../../shared/AppRoot/hooks/useMenu';
import { PCRunner } from '../PCRunner';
import H5Runner from '../H5Runner';
import WebsiteRunner from '../WebsiteRunner';
import { RunnerContext } from '../context/runner';
import RunnerRoot from '../RunnerRoot';
import { Device } from '@rxdrag/appx-plugin-sdk';

const RunnerDistributer = memo(() => {
  const { device } = useAppParams();
  const { menu, error, loading } = useMenu();
  useShowError(error);

  return (
    <RunnerContext.Provider value={{ menu }}>
      <Spin spinning={loading}>
        <RunnerRoot>
          {
            device === Device.PC &&
            <PCRunner />
          }
          {
            device === Device.Mobile &&
            <H5Runner />
          }
          {
            device === Device.Website &&
            <WebsiteRunner />
          }
        </RunnerRoot>
      </Spin>
    </RunnerContext.Provider>
  );
});

export default RunnerDistributer