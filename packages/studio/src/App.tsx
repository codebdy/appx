import React, { memo } from 'react';
import AppManager from './AppManager';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import AppDesigner from './AppDesigner';
import AppEntry from './AppEntry/index';
import AppsContent from './AppManager/AppsContent';
import ApiBoard from './ApiBoard';
import AuthBoard from './AuthBoard';
import { AppManagerRoutes } from './AppManager/AppHeader';
import Install from './Install';
import { INDEX_URL, INSTALL_URL, LOGIN_URL } from './consts';
import ModelBoard from './ModelBoard';
import { AppConfigRouts } from './AppEntry/AppConfigRouts';
import DeviceList from './AppEntry/DeviceList';
import FlowBoard from './FlowBoard';
import AppRunner from './AppRunner';
import AppConfig from './AppConfig';
import { LoggedInPanel } from './Login/LoggedInPanel';
import { AppTemplates } from './AppTemplates';
import { TemplateDesigner } from './TemplateDesigner';
import { AppPlugins } from './AppPlugins';
import { useLoadPredefinedPlugins } from './plugin/hooks/useLoadPredefinedPlugins';
import { PredefinedPluginsRoot } from './plugin/PredefinedPluginsRoot';
import { PredefinedMaterialsRoot } from './material/PredefinedMaterialsRoot';

const App = memo(() => {
  const predefinedPlugsin = useLoadPredefinedPlugins();
  console.log("App.tsx 刷新", predefinedPlugsin)
  return (
    <PredefinedPluginsRoot>
      <PredefinedMaterialsRoot>
        <Routes>
          <Route path={INDEX_URL} element={<LoggedInPanel />}>
            <Route path={INDEX_URL} element={<AppManager />}>
              <Route
                path={AppManagerRoutes.Root}
                element={<AppsContent />}
              />
              <Route path={AppManagerRoutes.Templates} element={<AppTemplates />} />
              <Route path={AppManagerRoutes.Model} element={<ModelBoard />} />
              <Route path={AppManagerRoutes.Api} element={<ApiBoard />} />
              <Route path={AppManagerRoutes.Auth} element={<AuthBoard />} />
              <Route path={AppManagerRoutes.Config} element={<AppConfig />} />
            </Route>
            <Route path="/design-template/:device" element={<TemplateDesigner />} />
            <Route path="/config-app/:appUuid" element={<AppEntry />}>
              <Route path={AppConfigRouts.Config} element={<AppConfig />} />
              <Route path={AppConfigRouts.App} element={<DeviceList />} />
              <Route path={AppConfigRouts.Flow} element={<FlowBoard />} />
              <Route path={AppConfigRouts.Model} element={<ModelBoard />} />
              <Route path={AppConfigRouts.Api} element={<ApiBoard />} />
              <Route path={AppConfigRouts.Auth} element={<AuthBoard />} />
              <Route path={AppConfigRouts.Plugins} element={<AppPlugins />} />
            </Route>
            <Route path="/design-app/:device/:appUuid" element={<AppDesigner />} />
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
          </Route>
          <Route path={LOGIN_URL} element={<Login />} />
          <Route path={INSTALL_URL} element={<Install />} />
        </Routes>
      </PredefinedMaterialsRoot>
    </PredefinedPluginsRoot>
  )
});

export default App