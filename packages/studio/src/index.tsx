import React from "react";
import ReactDOM from 'react-dom'
import App from "./App";
import 'antd/dist/antd.less'
import './index.less'
import "./locales"
import { SERVER_URL } from "./consts";
import { RecoilRoot } from "recoil";
import { EntiRoot } from "@appx/enthooks";

const AppRoot = () => {
  return (
    <RecoilRoot>
      <EntiRoot config={{ endpoint: SERVER_URL }} >
        <App />
      </EntiRoot>
    </RecoilRoot>
  )
}

ReactDOM.render(<AppRoot />, document.getElementById('root'))