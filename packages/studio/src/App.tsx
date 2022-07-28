import React, { memo } from 'react';
import AppManager from './AppManager';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import AppDesigner from './AppDesigner';
import AppConfig from './AppConfig/index';
import { useQuery, EntiRoot } from '@appx/enthooks';
import ModelBoard from './ModelBoard';
import AppsContent from './AppManager/AppsContent';
import ApiBoard from './ApiBoard';
import AuthBoard from './AuthBoard';
import { AppManagerRoutes } from './AppManager/AppHeader';
import Install from './Install';
import { useLoginCheck } from './hooks/useLoginCheck';

const App = memo(() => {
  useQuery()
  useLoginCheck()
  return (
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
  )
});

export default App