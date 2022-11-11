const locales = {
  'zh-CN': {
    title: '下拉窗口',
    settings: {
      'x-component-props': {
        placement: {
          title: '位置',
          dataSource: ["底部", "左下", "右下", "顶部", "左上", "右上"],
        },
        trigger: {
          title: '触发',
          dataSource: ["点击", "悬停", "右键"],
        },
      },
    },
  },
  'en-US': {
    title: 'Grid',
    addGridColumn: 'Add Grid Column',
    settings: {
      'x-component-props': {
        minWidth: 'Min Width',
        minColumns: 'Min Columns',
        maxWidth: 'Max Width',
        maxColumns: 'Max Columns',
        breakpoints: 'Breakpoints',
        columnGap: 'Column Gap',
        rowGap: 'Row Gap',
        colWrap: 'Col Wrap',
      },
    },
  },
  'ko-KR': {
    title: '그리드 열',
    addGridColumn: '그리드 열 추가',
    settings: {
      'x-component-props': {
        minWidth: '최소 너비',
        minColumns: '최소 열 개수',
        maxWidth: '최대 너비',
        maxColumns: '최대 열 개수',
        breakpoints: '중단점',
        columnGap: '열 간격',
        rowGap: '행 간격',
        colWrap: '자동 줄바꿈',
      },
    },
  },
}

export default locales;