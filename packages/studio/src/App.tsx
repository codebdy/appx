import React, { memo } from 'react';
import AppManager from './AppManager';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import AppDesigner from './AppDesigner';
import AppConfig from './AppConfig/index';
import AppsContent from './AppManager/AppsContent';
import ApiBoard from './ApiBoard';
import AuthBoard from './AuthBoard';
import { AppManagerRoutes } from './AppManager/AppHeader';
import Install from './Install';
import { useLoginCheck } from './hooks/useLoginCheck';
import { INDEX_URL, INSTALL_URL, LOGIN_URL } from './consts';
import ModelBoard from './ModelBoard';
import { AppConfigRouts } from './AppConfig/AppConfigRouts';
import DeviceList from './AppConfig/DeviceList';
import FlowBoard from './FlowBoard';
import AppRunner from './AppRunner';
import ConfigBoard from './ConfigBoard';

const App = memo(() => {
  useLoginCheck()
  return (
    <Routes>
      <Route path={INDEX_URL} element={<AppManager />}>
        <Route
          path={AppManagerRoutes.Root}
          element={<AppsContent />}
        />
        <Route path={AppManagerRoutes.Model} element={<ModelBoard />} />
        <Route path={AppManagerRoutes.Api} element={<ApiBoard />} />
        <Route path={AppManagerRoutes.Auth} element={<AuthBoard />} />
        <Route path={AppManagerRoutes.Config} element={<ConfigBoard />} />
      </Route>
      <Route path="/config-app/:appUuid" element={<AppConfig />}>
        <Route path={AppConfigRouts.Base} element={<ConfigBoard />} />
        <Route path={AppConfigRouts.App} element={<DeviceList />} />
        <Route path={AppConfigRouts.Flow} element={<FlowBoard />} />
        <Route path={AppConfigRouts.Model} element={<ModelBoard />} />
        <Route path={AppConfigRouts.Api} element={<ApiBoard />} />
        <Route path={AppConfigRouts.Auth} element={<AuthBoard />} />
      </Route>
      <Route path="/design-app/:device/:appUuid" element={<AppDesigner />} />
      <Route path={LOGIN_URL} element={<Login />} />
      <Route path={INSTALL_URL} element={<Install />} />
      <Route path={"/app/:device/:appUuid"} element={<AppRunner />}>
        <Route path=":menuUuid" element={<></>}>
          <Route path=":pageId" element={<></>}>
            <Route path=":dataId" element={<></>} />
            <Route path="" element={<></>} />
          </Route>
          <Route path="" element={<></>} />
        </Route>
        <Route path="" element={<></>} />
      </Route>
    </Routes>
  )
});

export default App