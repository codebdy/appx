import { Input, Spin } from 'antd'
import 'antd/dist/antd.less'
import React, { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useApp } from '../../hooks/useApp'
import { useQueryLangLocales } from '../../hooks/useQueryLangLocales'
import { useQueryAppConfig } from '../../hooks/useQueryAppConfig'
import { useShowError } from '../../hooks/useShowError'
import { AppContext } from './context'
import { IInstalledPlugin, PluginStatus } from "../../plugin/model"
import { SYSTEM_APP_UUID } from '../../consts'
import { useQueryAppDeviceConfig } from '../../hooks/useQueryAppDeviceConfig'
import { useMe } from '../../Login/context'
import { useQueryUserConfig } from './hooks/useQueryUserConfig'
import { Device, IMaterialComponent } from '@appx/plugin-sdk'
import { useQueryMaterialConfig } from './hooks/useQueryMaterialConfig'
import { InputDesigner } from '../../components/pc'
import { PluginType } from '../../model'

export const locales1 = {
  'zh-CN': {
    Layouts: '布局',
    Description: '布局组件，包括Fromlayou， PageContainer等',
  },
  'en-US': {
    Layouts: 'Layouts',
    Description: '',
  },
}

export const locales2 = {
  'zh-CN': {
    Medias: '多媒体',
    Description: '包含媒体管理、媒体选择组件',
  },
  'en-US': {
    Layouts: 'Layouts',
    Description: '',
  },
}

export const locales3 = {
  'zh-CN': {
    Test: '测试',
    Description: '一个测试组件',
  },
  'en-US': {
    Layouts: 'Layouts',
    Description: '',
  },
}

const coms1: IMaterialComponent[] = [
  {
    name: "Input",
    component: Input,
    designer: InputDesigner,
    behaviors: [{
      name: "Input",
      selector: "",
      designerLocales: {
        'zh-CN': {
          title: '输入框',
        },
        'en-US': {
          title: 'Input',
        },
      }
    }
    ],
  },
  {
    name: "TextArea",
    component: Input,
    designer: InputDesigner,
    behaviors: [{
      name: "TextArea",
      selector: "",
      designerLocales: {
        'zh-CN': {
          title: '多行输入框',
        },
        'en-US': {
          title: 'TextArea',
        },
      }
    }]
  },
  {
    name: "Select",
    component: Input,
    designer: InputDesigner,
    behaviors: [{
      name: "Select",
      selector: "",
      designerLocales: {
        'zh-CN': {
          title: '选择框',
        },
        'en-US': {
          title: 'Select',
        },
      }
    }]
  },
]



const plugins: IInstalledPlugin[] = [
  {
    pluginInfo: {
      id: "text-1",
      url: "test",
      title: "布局",
      pluginId: "test1",
      appUuid: "",
      type: PluginType.normal,
    },
    plugin: {
      id: "test1",
      title: "Layouts",
      version: "1.0",
      description: "Description",
      components: {
        [Device.PC]: coms1,
      },
      locales: locales1,
    },
    status: PluginStatus.Normal,
  },
  {
    pluginInfo: {
      id: "text-2",
      url: "test",
      title: "多媒体",
      pluginId: "test2",
      appUuid: "",
      type: PluginType.normal,
    },
    plugin: {
      id: "test2",
      title: "Medias",
      version: "1.1.0",
      description: "Description",
      components: {
        [Device.PC]: [],
      },
      locales: locales2,
    },
    status: PluginStatus.Normal,
  }

]

export const AppRootInner = memo((
  props: {
    children: React.ReactNode
  }
) => {
  const { appUuid = SYSTEM_APP_UUID, device = Device.PC } = useParams();
  const me = useMe();
  const { app, loading, error } = useApp(appUuid)
  const { config, loading: configLoading, error: configError } = useQueryAppConfig(appUuid);
  const { deviceConfig, loading: deviceLoading, error: deviceError } = useQueryAppDeviceConfig(appUuid, device as any)
  const { langLocales, loading: localLoading, error: localError } = useQueryLangLocales(appUuid);
  const { userConfig, loading: userConfigLoading, error: userConfigError } = useQueryUserConfig(appUuid, device as any, me?.id)
  const { materialConfig, loading: materialConfigLoading, error: materialConfigError } = useQueryMaterialConfig(appUuid, device as any)
  useShowError(error || configError || localError || deviceError || userConfigError || materialConfigError);

  const realApp = useMemo(() => {
    return appUuid === SYSTEM_APP_UUID ? { id: "System", uuid: SYSTEM_APP_UUID, title: "System" } : app
  }, [app, appUuid])

  const contextValue = useMemo(() => {
    return {
      app: realApp,
      device: device as Device,
      config,
      langLocales,
      deviceConfig: deviceConfig,
      userConfig,
      plugins,
      materialConfig
    }
  }, [config, device, deviceConfig, langLocales, materialConfig, realApp, userConfig])


  return (
    realApp ?
      <AppContext.Provider
        value={contextValue}
      >
        <Spin
          style={{ height: "100vh" }}
          spinning={
            loading ||
            configLoading ||
            localLoading ||
            deviceLoading ||
            userConfigLoading ||
            materialConfigLoading
          }
        >
          {props.children}
        </Spin>
      </AppContext.Provider>
      : <></>
  )
})



