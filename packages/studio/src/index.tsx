import React, { Suspense } from "react";
import ReactDOM from 'react-dom'
import App from "./App";
import 'antd/dist/antd.less'
import './index.less'
import { SERVER_URL, SYSTEM_APP_UUID } from "./consts";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { EntiRoot } from "./enthooks";
import './i18n';
import AppRoot from "./shared/AppRoot";

const AppRender = () => {
  return (
    <Suspense fallback="loading">
      <RecoilRoot>
        <EntiRoot config={{ endpoint: SERVER_URL, appUuid: SYSTEM_APP_UUID }} >
          <AppRoot>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AppRoot>
        </EntiRoot>
      </RecoilRoot>
    </Suspense>
  )
}

ReactDOM.render(<AppRender />, document.getElementById('root'))