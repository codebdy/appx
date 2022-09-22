export const FormButtonGroupLocales = {
  'zh-CN': {
    title: '按钮容器',
    addPanel: '添加选项卡',
    settings: {
      'x-component-props': {
        formItem: "对齐标签",
        sticky: "吸底",
        align: {
          title: '对齐',
          dataSource: ['左对齐', '右对齐', '居中'],
        },
        gutter: "间隙",
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
