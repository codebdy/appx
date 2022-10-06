import translations from './translations/zh-CN';

export default function customTranslate(template, replacements) {
  replacements = replacements || {};
  
  // Translate
  template = translations[template] || template;
  console.log("我和和", template, translations[template])
  // Replace
  return template.replace(/{([^}]+)}/g, function(_, key) {
    return replacements[key] || '{' + key + '}';
  });
}