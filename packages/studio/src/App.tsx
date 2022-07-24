import { Layout } from 'antd';
import React, { memo } from 'react';
import AppManager from './AppManager';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import AppDesigner from './AppDesigner';
import AppConfig from './AppConfig/index';
import { useQuery, EntRoot } from '@apper/enthooks';

const App = memo(() => {
  useQuery()
  return (
    <EntRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppManager />} />
          <Route path="/config-app/:appId" element={<AppConfig />} />
          <Route path="/design-app/:deviceSlug/:appId" element={<AppDesigner />} />
          <Route path="/model" element={<div>model 模块尚未并入</div>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </EntRoot>
  )
});

export default App