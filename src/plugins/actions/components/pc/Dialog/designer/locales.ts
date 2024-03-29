const locales = {
  'zh-CN': {
    title: '弹出窗口',
    settings: {
      'x-component-props': {
        title: '标题',
        type: {
          title: '类型',
          dataSource: ['填充', '透明', '虚线', '链接', '文本', '默认'],
        },
        block: "充满",
        danger: "警醒",
        disabled: "无效",
        ghost: "透明",
        icon: "图标",
        shape: {
          title: '形状',
          dataSource: ['默认', '圆圈', '圆角'],
        },
        size: {
          title: '尺寸',
          dataSource: ['大', '中', '小'],
        },
        closable: "关闭按钮",
        maskClosable: "遮罩关闭",
        footer: "页脚",
        centered: "垂直居中",
        changeRemind: "保存提醒"
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

