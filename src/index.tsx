import React, { Suspense } from "react";
import ReactDOM from 'react-dom'
import App from "./App";
import 'antd/dist/antd.less'
import './index.less'
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import './i18n';
import AppRoot from "./shared/AppRoot";
import { SYSTEM_APP_UUID } from "./consts";

const AppRender = () => {
  return (
    <Suspense fallback="loading">
      <RecoilRoot>
        <AppRoot appUuid={SYSTEM_APP_UUID}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppRoot>
      </RecoilRoot>
    </Suspense>
  )
}

ReactDOM.render(<AppRender />, document.getElementById('root'))