import React, { memo } from 'react';
import AppManager from './AppManager';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import AppDesigner from './AppDesigner';
import AppConfig from './AppConfig/index';
import { useQuery, EntiRoot } from '@appx/enthooks';
import { SERVER_URL } from './consts';
import ModelBoard from './ModelBoard';
import AppsContent from './AppManager/AppsContent';
import ApiBoard from './ApiBoard';
import AuthBoard from './AuthBoard';
import { AppManagerRoutes } from './AppManager/AppHeader';
import { RecoilRoot } from 'recoil';
import Install from './Install';
import InstallCheck from './Install/InstallCheck';
import LoginCheck from './Login/LoginCheck';

const App = memo(() => {
  useQuery()
  return (
    <RecoilRoot>
      <EntiRoot config={{ endpoint: SERVER_URL }} >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppManager />}>
              <Route
                path={AppManagerRoutes.Root}
                element={<AppsContent />}
              />
              <Route path={AppManagerRoutes.Model} element={<ModelBoard />} />
              <Route path={AppManagerRoutes.Api} element={<ApiBoard />} />
              <Route path={AppManagerRoutes.Auth} element={<AuthBoard />} />
            </Route>
            <Route path="/config-app/:appId" element={<AppConfig />} />
            <Route path="/design-app/:deviceSlug/:appId" element={<AppDesigner />} />
            <Route path="/login" element={<Login />} />
            <Route path="/install" element={<Install />} />
          </Routes>
        </BrowserRouter>
      </EntiRoot >
    </RecoilRoot>
  )
});

export default App