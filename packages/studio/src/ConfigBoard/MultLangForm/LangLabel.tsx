import React from "react";
import { useTranslation } from "react-i18next";
import { ILang } from "../../model";

const LangLabel = React.forwardRef((
  props: {
    lang: ILang
  },
  ref: any
) => {

  const { lang } = props;
  const { t } = useTranslation();

  return (
    <div ref={ref} className="lang-item">
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