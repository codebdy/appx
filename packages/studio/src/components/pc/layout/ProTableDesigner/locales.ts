export const ProTableLocales: any & {
  HeaderActions: any,
  HeaderContent: any,
  HeaderContentExtra: any,
  Content: any,
  TabPanel: any,
  FooterToolbar: any,
} = {
  'zh-CN': {
    title: '页面表格',
    settings: {
      'x-component-props': {
        hasQueryForm: "查询表单",
        hasToolbar: "工具栏",
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
