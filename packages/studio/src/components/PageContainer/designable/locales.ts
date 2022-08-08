export const Locales: any & {
  HeaderActions: any,
  HeaderContent: any,
  Content: any,
  TabPanel: any,
  FooterToolbar: any,
} = {
  'zh-CN': {
    title: '页面容器',
    addExtra: '添加页头扩展',
    addHeaderContent: '添加页头内容',
    addPanel: '添加选项卡',
    addFooter: '添加页脚',
    settings: {
      'x-component-props': {
        type: '类型',
        title: '标题',
        subtitle: '子标题',
        hasBreadcrumb: "面包屑导航",
        hasGobackButton: "返回按钮",
        hasActions: "动作区",
        hasHeaderContent: "页头内容区",
        hasHeaderContentExtra: "页头扩展区",
        hasTabs: "选项卡",
        hasFooterToolbar: "页脚工具条",
      },
    },
  },
  'en-US': {
    title: 'Page Container',
    settings: {
      'x-component-props': {
        type: 'Type',
        title: 'Title',
        cardTypes: [
          { label: 'Inner', value: 'inner' },
          { label: 'Default', value: '' },
        ],
      },
    },
  },
  'ko-KR': {
    title: '카드',
    settings: {
      'x-component-props': {
        type: '타입',
        title: '제목',
        extra: '추가 항목',
        cardTypes: [
          { label: '안쪽', value: 'inner' },
          { label: '기본', value: '' },
        ],
      },
    },
  },
}
