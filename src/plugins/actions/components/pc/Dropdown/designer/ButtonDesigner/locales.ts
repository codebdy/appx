export const ButtonLocales = {
  'zh-CN': {
    title: '触发按钮',
    description: "按钮，可绑定事件",
    settings: {
      'x-component-props': {
        title: '标题',
        showDropdownIcon: "下拉图标",
        onClick: "鼠标点击",
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
        }
      },
    },
  },
  'en-US': {
    title: 'Card',
    settings: {
      'x-component-props': {
        type: 'Type',
        title: 'Title',
      },
    },
  }
}
