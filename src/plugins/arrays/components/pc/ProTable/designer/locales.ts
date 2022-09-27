const locales = {
  'zh-CN': {
    title: '查询表格',
    settings: {
      'x-component-props': {
        hasQueryForm: "查询表单",
        hasToolbar: "工具栏",
        selectable: "可选择",
        paginationPosition: {
          title:"分页位置",
          dataSource: ['左', '右', '居中'],
        },
        pageSize: "每页行数"
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

export default locales;
