import { createLocales } from '@designable/core'
import { InputLocales } from '../../Input/designer/locales'

export const PasswordLocales = createLocales(InputLocales, {
  'zh-CN': {
    title: '密码输入',
  },
  'en-US': {
    title: 'Password',
  },
  'ko-KR': {
    title: '비밀번호',
  },
})