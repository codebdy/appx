const locales = {
  'zh-CN': {
    title: '多语言输入框',
    settings: {
      'x-component-props': {
        inline: "内联",
        multiline: "多行",
        rows: "行数",
        addonAfter: '后缀标签',
        addonBefore: '前缀标签',
        maxLength: '最大长度',
        prefix: '前缀',
        suffix: '后缀',
        autoSize: {
          title: '自适应高度',
          tooltip: '可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }',
        },
        showCount: '是否展示字数',
        checkStrength: '检测强度',
      },
    },
  },
  'en-US': {
    title: 'Multilang Input',
    settings: {
      'x-component-props': {
        addonAfter: 'Addon After',
        addonBefore: 'Addon Before',
        maxLength: 'Max Length',
        prefix: 'Prefix',
        suffix: 'Suffix',
        autoSize: 'Auto Size',
        showCount: 'Show Count',
        checkStrength: 'Check Strength',
      },
    },
  },
  'ko-KR': {
    title: '입력',
    settings: {
      'x-component-props': {
        addonAfter: '애드온 후',
        addonBefore: '애드온 전',
        maxLength: '최대 길이',
        prefix: '접두사',
        suffix: '접미사',
        autoSize: '자동 크기 맞춤',
        showCount: '개수 보여주기',
        checkStrength: '강도 체크',
      },
    },
  },
}

export default locales;