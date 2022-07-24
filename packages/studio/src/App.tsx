import { Layout } from 'antd';
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

const App = memo(() => {
  useQuery()
  return (
    <EntiRoot config={{ endpoint: SERVER_URL }} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppManager />}>
            <Route
              path="/"
              element={<AppsContent />}
            />
            <Route path="system-model" element={<ModelBoard />} />
            <Route path="system-api" element={<ApiBoard />} />
            <Route path="system-auth" element={<AuthBoard />} />
          </Route>
          <Route path="/config-app/:appId" element={<AppConfig />} />
          <Route path="/design-app/:deviceSlug/:appId" element={<AppDesigner />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </EntiRoot >
  )
});

export default App