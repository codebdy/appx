import React from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ILang } from "../../model";

const LangLabel = memo((
  props: {
    lang: ILang
  }
) => {

  const { lang } = props;
  const { t } = useTranslation();

  return (
    <div className="lang-item">
      <div className="lang-abbr">
        {lang.abbr.toUpperCase()}
      </div>
      <div>
        {t("Lang." + lang.key)}
      </div>
    </div>
  )
})

export default LangLabel;