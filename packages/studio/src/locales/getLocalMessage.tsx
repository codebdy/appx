import React from 'react';
import { isStr, isPlainObj } from '@designable/shared';
import { GlobalRegistry, IDesignerMiniLocales } from '@designable/core';

const takeLocale = (
  message: string | IDesignerMiniLocales
): React.ReactNode => {
  if (isStr(message))
    return message;
  if (isPlainObj(message)) {
    const lang = GlobalRegistry.getDesignerLanguage();
    for (let key in message) {
      if (key.toLocaleLowerCase() === lang)
        return message[key];
    }
    return;
  }
  return message;
};
export const takeMessage = (token: any) => {
  if (!token)
    return;
  const message = isStr(token)
    ? GlobalRegistry.getDesignerMessage(token)
    : token;
  if (message)
    return takeLocale(message);
  return token;
};

export function getLocalMessage(message: string | IDesignerMiniLocales) {
  return takeMessage(message);
}
