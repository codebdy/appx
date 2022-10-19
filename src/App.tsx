import React, { memo } from 'react';
import AppManager from './AppManager';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import AppDesigner from './AppDesigner/index';
import AppsContent from './AppManager/AppsContent';
import { AppManagerRoutes } from './AppManager/AppHeader';
import Install from './Install';
import { DESIGNER_TOKEN_NAME, INDEX_URL, INSTALL_URL, LOGIN_URL, SERVER_URL, SYSTEM_APP_UUID } from './consts';
import { AppEntryRouts } from './AppDesigner/DesignerHeader/AppEntryRouts';
import AppUis from './AppDesigner/DesignerHeader/AppUis';
import AppRunner from './AppRunner';
import { LoggedInPanel } from './Login/LoggedInPanel';
import { AppFrames } from './AppDesigner/DesignerHeader/AppFrames';
import { PredefinedPluginsRoot } from './plugin/PredefinedPluginsRoot';
import { PredefinedMaterialsRoot } from './material/PredefinedMaterialsRoot';
import { ConfigCenter, ConfigsRoutes } from './ConfigCenter';
import { NotificationEngineBoard } from './ConfigCenter/NotificationEngineBoard';
import { ProcessEngineBoard } from './ConfigCenter/ProcessEngineBoard';
import { SearchEngineBoard } from './ConfigCenter/SearchEngineBoard';
import { AppBpmn } from './AppDesigner/AppBpmn';
import { AppDmn } from './AppDesigner/AppDmn';
import { AppPlugins } from './AppDesigner/AppPlugins';
import AppConfig from './AppDesigner/AppConfig';
import AppUml from './AppDesigner/AppUml';
import ApiBoard from './AppDesigner/ApiBoard';
import UiDesigner from './AppDesigner/UiDesigner';
import { FrameDesigner } from './AppDesigner/FrameDesigner';
import { AuthBoard, AuthRoutes } from './AppDesigner/AppAuth';
import { MenuAuthBoard } from './AppDesigner/AppAuth/MenuAuthBoard';
import { ModelAuthBoard } from './AppDesigner/AppAuth/ModelAuthBoard';
import { AppAuthBoard } from './AppDesigner/AppAuth/AppAuthBoard';
import { PageAuthBoard } from './AppDesigner/AppAuth/PageAuthBoard';
import { MonitorCenter, MonitorRoutes } from './MonitorCenter/intex';
import { ReportEngineBoard } from './ConfigCenter/ReportEngineBoard';
import { BusinessLogsBoard } from './MonitorCenter/BusinessLogsBoard';
import { ModelLogsBoard } from './MonitorCenter/ModelLogsBoard';
import { ServerBoard } from './MonitorCenter/ServerBoard';
import { EntiRoot } from './enthooks';

const App = memo(() => {
  return (
    <EntiRoot config={{ endpoint: SERVER_URL, appUuid: SYSTEM_APP_UUID, tokenName: DESIGNER_TOKEN_NAME }} >
      <PredefinedPluginsRoot>
        <PredefinedMaterialsRoot>
          <Routes>
            <Route path={INDEX_URL} element={<LoggedInPanel />}>
              <Route path={"/:device?/:appUuid?"} element={<AppRunner />}>
                <Route path=":menuUuid" element={<></>}>
                  <Route path=":pageId" element={<></>}>
                    <Route path=":dataId" element={<></>} />
                    <Route path="" element={<></>} />
                  </Route>
                  <Route path="" element={<></>} />
                </Route>
                <Route path="" element={<></>} />
              </Route>
              <Route path="/app-designer/:appId" element={<AppDesigner />}>
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
                <Route path={AppEntryRouts.Config} element={<AppConfig />}></Route>
              </Route>
              <Route path="/design-ui/:device/:appId" element={<UiDesigner />} />
              <Route path="/design-frame/:device/:appId" element={<FrameDesigner />} />

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