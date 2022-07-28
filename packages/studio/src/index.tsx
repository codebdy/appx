import React from "react";
import ReactDOM from 'react-dom'
import App from "./App";
import 'antd/dist/antd.less'
import './index.less'
import "./locales"
import { SERVER_URL } from "./consts";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { EntiRoot } from "./enthooks";

const AppRoot = () => {
  console.log("Approot")
  return (
    <RecoilRoot>
      <EntiRoot config={{ endpoint: SERVER_URL }} >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EntiRoot>
    </RecoilRoot>
  )
}

ReactDOM.render(<AppRoot />, document.getElementById('root'))