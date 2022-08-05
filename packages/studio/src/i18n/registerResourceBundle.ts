import i18n from './index'

export function registerResourceBundle(nameSpace: string, bundles: { [key: string]: any },) {
  for (const key of Object.keys(bundles)) {
    if (!i18n.hasResourceBundle(key, nameSpace)) {
      i18n.addResourceBundle(key, nameSpace, bundles[key]);
    }
  };
}
