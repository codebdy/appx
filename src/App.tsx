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
import { INDEX_URL, INSTALL_URL, LOGIN_URL, SERVER_URL, SYSTEM_APP_UUID } from './consts';
import AppUml from './AppUml';
import { AppEntryRouts } from './AppEntry/AppEntryRouts';
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
import { AuthBoard, AuthRoutes } from './AuthBoard';
import { MenuAuthBoard } from './AuthBoard/MenuAuthBoard';
import { ModelAuthBoard } from './AuthBoard/ModelAuthBoard';
import { AppAuthBoard } from './AuthBoard/AppAuthBoard';
import { PageAuthBoard } from './AuthBoard/PageAuthBoard';
import { MonitorCenter, MonitorRoutes } from './MonitorCenter/intex';
import { ReportEngineBoard } from './ConfigCenter/ReportEngineBoard';
import { BusinessLogsBoard } from './MonitorCenter/BusinessLogsBoard';
import { ModelLogsBoard } from './MonitorCenter/ModelLogsBoard';
import { DebugLogsBoard } from './MonitorCenter/DebugLogsBoard';
import { ServerBoard } from './MonitorCenter/ServerBoard';
import { EntiRoot } from './enthooks';

const App = memo(() => {
  return (
    <EntiRoot config={{ endpoint: SERVER_URL, appUuid: SYSTEM_APP_UUID }} >
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
                <Route path={AppManagerRoutes.Auth} element={<AuthBoard />}>
                  <Route path={AuthRoutes.ModelAuth} element={<ModelAuthBoard />} />
                  <Route path={AuthRoutes.AppAuth} element={<AppAuthBoard />} />
                  <Route path="" element={<ModelAuthBoard />} />
                </Route>
                <Route path={AppManagerRoutes.SystemConfig} element={<AppConfig />} />
                <Route path={AppManagerRoutes.Monitor} element={<MonitorCenter />}>
                  <Route path={MonitorRoutes.ServerStatus} element={<ServerBoard />} />
                  <Route path={MonitorRoutes.BusinessLogs} element={<BusinessLogsBoard />} />
                  <Route path={MonitorRoutes.ModelLogs} element={<ModelLogsBoard />} />
                  <Route path={MonitorRoutes.DebugLogs} element={<DebugLogsBoard />} />
                  <Route path="" element={<ServerBoard />} />
                </Route>
                <Route path={AppManagerRoutes.Configs} element={<ConfigCenter />}>
                  <Route path={ConfigsRoutes.ProcessEngine} element={<ProcessEngineBoard />} />
                  <Route path={ConfigsRoutes.NotificationEngine} element={<NotificationEngineBoard />} />
                  <Route path={ConfigsRoutes.SearchEngine} element={<SearchEngineBoard />} />
                  <Route path={ConfigsRoutes.ReportEngine} element={<ReportEngineBoard />} />
                  <Route path={ConfigsRoutes.SystemConfig} element={<AppConfig />} />
                  <Route path="" element={<ProcessEngineBoard />} />
                </Route>
              </Route>
              <Route path="/config-app/:appUuid" element={<AppEntry />}>
                <Route path={AppEntryRouts.App} element={<AppUis />} />
                <Route path={AppEntryRouts.Bpmn} element={<AppBpmn />} />
                <Route path={AppEntryRouts.Dmn} element={<AppDmn />} />
                <Route path={AppEntryRouts.Uml} element={<AppUml />} />
                <Route path={AppEntryRouts.Api} element={<ApiBoard />} />
                <Route path={AppEntryRouts.Plugins} element={<AppPlugins />} />
                <Route path={AppEntryRouts.Frame} element={<AppFrames />} />
                <Route path={AppEntryRouts.Auth} element={<AuthBoard />}>
                  <Route path={AuthRoutes.MenuAuth} element={<MenuAuthBoard />} />
                  <Route path={AuthRoutes.ComponentAuth} element={<PageAuthBoard />} />
                  <Route path={AuthRoutes.ModelAuth} element={<ModelAuthBoard />} />
                  <Route path="" element={<MenuAuthBoard />} />
                </Route>
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
    </EntiRoot>
  )
});

export default App