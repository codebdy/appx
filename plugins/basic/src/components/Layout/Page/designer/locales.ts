export const locales = {
  'zh-CN': {
    title: '卡片',
    settings: {
      'x-component-props': {
        type: '类型',
        title: '标题',
        extra: '右侧扩展',
        cardTypes: { title:"卡片类型", dataSource: ['内置', '默认'] }
      },
    },
  },
  'en-US': {
    title: 'Card',
    settings: {
      'x-component-props': {
        type: 'Type',
        title: 'Title',
        extra: 'Extra',
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
