import { Spin } from 'antd'
import 'antd/dist/antd.less'
import React, { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useApp } from '../../hooks/useApp'
import { useQueryLangLocales } from '../../hooks/useQueryLangLocales'
import { useQueryAppConfig } from '../../hooks/useQueryAppConfig'
import { useShowError } from '../../hooks/useShowError'
import { AppContext, IInstalledPlugin, PluginType } from './context'
import { SYSTEM_APP_UUID } from '../../consts'
import { useQueryAppDeviceConfig } from '../../hooks/useQueryAppDeviceConfig'
import { useMe } from '../../Login/context'
import { useQueryUserConfig } from './hooks/useQueryUserConfig'
import { Device, IMaterialComponent } from '../../plugin-sdk/model'
import { InputDesigner } from '../../components/pc'
import { Input } from '@designable/formily-antd'

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
    behavior: {
      name:"Input",
      selector: "",
      designerLocales:{
        'zh-CN': {
          title: '输入框',
        },
        'en-US': {
          title: 'Input',
        },
      }
    }
  },
  {
    name: "TextArea",
    component: Input,
    designer: InputDesigner,
    behavior: {
      name:"TextArea",
      selector: "",
      designerLocales:{
        'zh-CN': {
          title: '多行输入框',
        },
        'en-US': {
          title: 'TextArea',
        },
      }
    }
  },
  {
    name: "Select",
    component: Input,
    designer: InputDesigner,
    behavior: {
      name:"Select",
      selector: "",
      designerLocales:{
        'zh-CN': {
          title: '选择框',
        },
        'en-US': {
          title: 'Select',
        },
      }
    }
  },
]

const coms2: IMaterialComponent[] = [
  {
    name: "Input2",
    component: Input,
    designer: InputDesigner,
    behavior: {
      name:"Input2",
      selector: "",
      designerLocales:{
        'zh-CN': {
          title: '输入框2',
        },
        'en-US': {
          title: 'Input2',
        },
      }
    }
  },
  {
    name: "TextArea2",
    component: Input,
    designer: InputDesigner,
    behavior: {
      name:"TextArea2",
      selector: "",
      designerLocales:{
        'zh-CN': {
          title: '多行输入框2',
        },
        'en-US': {
          title: 'TextArea2',
        },
      }
    }
  },
  {
    name: "Select2",
    component: Input,
    designer: InputDesigner,
    behavior: {
      name:"Select2",
      selector: "",
      designerLocales:{
        'zh-CN': {
          title: '选择框2',
        },
        'en-US': {
          title: 'Select2',
        },
      }
    }
  },
]

const coms3: IMaterialComponent[] = [
  {
    name: "Input3",
    component: Input,
    designer: InputDesigner,
    behavior: {
      name:"Input3",
      selector: "",
      designerLocales:{
        'zh-CN': {
          title: '输入框3',
        },
        'en-US': {
          title: 'Input3',
        },
      }
    }
  },
  {
    name: "TextArea3",
    component: Input,
    designer: InputDesigner,
    behavior: {
      name:"TextArea3",
      selector: "",
      designerLocales:{
        'zh-CN': {
          title: '多行输入框3',
        },
        'en-US': {
          title: 'TextArea3',
        },
      }
    }
  },
  {
    name: "Select3",
    component: Input,
    designer: InputDesigner,
    behavior: {
      name:"Select3",
      selector: "",
      designerLocales:{
        'zh-CN': {
          title: '选择框3',
        },
        'en-US': {
          title: 'Select3',
        },
      }
    }
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
    },
    plugin: {
      id: "test1",
      title: "Layouts",
      version: "1.0",
      description: "Description",
      components: {
        [Device.PC]: coms1,
      },
      loacales: locales1,
    },
    type: PluginType.Normal,
  },
  {
    pluginInfo: {
      id: "text-2",
      url: "test",
      title: "多媒体",
      pluginId: "test2",
      appUuid: "",
    },
    plugin: {
      id: "test2",
      title: "Medias",
      version: "1.1.0",
      description: "Description",
      components: {
        [Device.PC]: coms2,
      },
      loacales: locales2,
    },
    type: PluginType.Normal,
  }

]

const debugPlugins = [
  {
    pluginInfo: {
      id: "text-3",
      url: "test",
      title: "测试",
      pluginId: "test2",
      appUuid: "",
    },
    plugin: {
      id: "test1",
      title: "Test",
      version: "1.1.0",
      description: "Description",
      components: {
        [Device.PC]: [],
      },
      loacales: coms3,
    },
    type: PluginType.Debug,
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
  const { userConfig, loading: useConfigLoading, error: useConfigError } = useQueryUserConfig(appUuid, device as any, me?.id)
  useShowError(error || configError || localError || deviceError || useConfigError);

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
      debugPlugins
    }
  }, [config, device, deviceConfig, langLocales, realApp, userConfig])

  return (
    realApp ?
      <AppContext.Provider
        value={contextValue}
      >
        <Spin style={{ height: "100vh" }} spinning={loading || configLoading || localLoading || deviceLoading || useConfigLoading}>
          {props.children}
        </Spin>
      </AppContext.Provider>
      : <></>
  )
})



