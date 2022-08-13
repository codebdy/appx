import React, { useMemo } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const LangLabel = memo((
  props: {
    lang: string
  }
) => {

  const { lang } = props;
  const { t } = useTranslation();

  const [, langAbbr] = useMemo(() => lang.split("-"), [lang]);

  return (
    <div className="lang-item">
      <div className="lang-abbr">
        {langAbbr.toUpperCase()}
      </div>
      <div>
        {t("Lang." + lang)}
      </div>
    </div>
  )
})

export default LangLabel;