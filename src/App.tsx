import React, { memo } from 'react';
import AppManager from './AppManager';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import AppDesigner from './AppDesigner';
import AppEntry from './AppEntry/index';
import AppsContent from './AppManager/AppsContent';
import ApiBoard from './ApiBoard';
import { AppManagerRoutes } from './AppManager/AppHeader';
import Install from './Install';
import { INDEX_URL, INSTALL_URL, LOGIN_URL } from './consts';
import AppUml from './AppUml';
import { AppConfigRouts } from './AppEntry/AppConfigRouts';
import AppUis from './AppEntry/AppUis';
import AppRunner from './AppRunner';
import AppConfig from './AppConfig';
import { LoggedInPanel } from './Login/LoggedInPanel';
import { AppFrames } from './AppEntry/AppFrames';
import { FrameDesigner } from './FrameDesigner';
import { AppPlugins } from './AppPlugins';
import { PredefinedPluginsRoot } from './plugin/PredefinedPluginsRoot';
import { PredefinedMaterialsRoot } from './material/PredefinedMaterialsRoot';
import { AppBpmn } from './AppBpmn';
import { AppDmn } from './AppDmn';
import { ConfigCenter, ConfigsRoutes } from './ConfigCenter';
import { NotificationEngineBoard } from './ConfigCenter/NotificationEngineBoard';
import { ProcessEngineBoard } from './ConfigCenter/ProcessEngineBoard';
import { SearchEngineBoard } from './ConfigCenter/SearchEngineBoard';
import { AuthBoard } from './AuthBoard';

const App = memo(() => {
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
              <Route path={AppManagerRoutes.Model} element={<AppUml />} />
              <Route path={AppManagerRoutes.Api} element={<ApiBoard />} />
              <Route path={AppManagerRoutes.Auth} element={<AuthBoard />} />
              <Route path={AppManagerRoutes.SystemConfig} element={<AppConfig />} />
              <Route path={AppManagerRoutes.Configs} element={<ConfigCenter />}>
                <Route path={ConfigsRoutes.ProcessEngine} element={<ProcessEngineBoard />} />
                <Route path={ConfigsRoutes.NotificationEngine} element={<NotificationEngineBoard />} />
                <Route path={ConfigsRoutes.SearchEngine} element={<SearchEngineBoard />} />
                <Route path={ConfigsRoutes.SystemConfig} element={<AppConfig />} />
                <Route path="" element={<ProcessEngineBoard />} />
              </Route>
            </Route>
            <Route path="/config-app/:appUuid" element={<AppEntry />}>
              <Route path={AppConfigRouts.App} element={<AppUis />} />
              <Route path={AppConfigRouts.Bpmn} element={<AppBpmn />} />
              <Route path={AppConfigRouts.Dmn} element={<AppDmn />} />
              <Route path={AppConfigRouts.Uml} element={<AppUml />} />
              <Route path={AppConfigRouts.Api} element={<ApiBoard />} />
              <Route path={AppConfigRouts.Auth} element={<AuthBoard />} />
              <Route path={AppConfigRouts.Plugins} element={<AppPlugins />} />
              <Route path={AppConfigRouts.Frame} element={<AppFrames />} />
            </Route>
            <Route path="/design-app/:device/:appUuid" element={<AppDesigner />} />
            <Route path="/design-frame/:device/:appUuid" element={<FrameDesigner />} />
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