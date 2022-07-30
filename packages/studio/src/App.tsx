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
import SystemModelBoard from './ModelBoard/SystemModelBoard';

const App = memo(() => {
  useLoginCheck()
  return (
    <Routes>
      <Route path={INDEX_URL} element={<AppManager />}>
        <Route
          path={AppManagerRoutes.Root}
          element={<AppsContent />}
        />
        <Route path={AppManagerRoutes.Model} element={<SystemModelBoard />} />
        <Route path={AppManagerRoutes.Api} element={<ApiBoard />} />
        <Route path={AppManagerRoutes.Auth} element={<AuthBoard />} />
      </Route>
      <Route path="/config-app/:appId" element={<AppConfig />} />
      <Route path="/design-app/:deviceSlug/:appId" element={<AppDesigner />} />
      <Route path={LOGIN_URL} element={<Login />} />
      <Route path={INSTALL_URL} element={<Install />} />
    </Routes>
  )
});

export default App