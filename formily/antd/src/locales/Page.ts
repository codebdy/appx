export const Page = {
  'zh-CN': {
    title: '页面容器',
    addExtra: '添加扩展',
    addColumn: '添加列',
    addIndex: '添加索引',
    addOperation: '添加操作',
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
    title: 'Page Container',
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

export const PageExtra = {
  'zh-CN': {
    title: '页面扩展',
    settings: {
      'x-component-props': {
        gridSpan: '跨列栏数',
      },
    },
  },
  'en-US': {
    title: 'Grid Column',
    settings: {
      'x-component-props': {
        gridSpan: 'Grid Span',
      },
    },
  },
  'ko-KR': {
    title: '그리드 열',
    settings: {
      'x-component-props': {
        gridSpan: '그리드 스팬',
      },
    },
  },
}
