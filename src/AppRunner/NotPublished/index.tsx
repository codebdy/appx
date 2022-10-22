import { EditOutlined } from "@ant-design/icons"
import { Button, Card } from "antd"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import "./style.less"

export const NotPublished = memo(() => {
  const { t } = useTranslation();
  return (
    <div className="not-published-page">
      <div className="float card">
        <div className="logo">
          <svg style={{ width: "80px", height: "80px" }} viewBox="0 0 24 24">
            <defs>
              <linearGradient id="logo_color" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3ca9f2" />
                <stop offset="90%" stopColor="#3a29e6" />
                <stop offset="100%" stopColor="#3ca9f2" />
              </linearGradient>
            </defs>
            <path
              style={{ fill: "url(#logo_color)" }}
              d="M23 11.5L19.95 10.37C19.69 9.22 19.04 8.56 19.04 8.56C17.4 6.92 14.75 6.92 13.11 8.56L11.63 10.04L5 3C4 7 5 11 7.45 14.22L2 19.5C2 19.5 10.89 21.5 16.07 17.45C18.83 15.29 19.45 14.03 19.84 12.7L23 11.5M17.71 11.72C17.32 12.11 16.68 12.11 16.29 11.72C15.9 11.33 15.9 10.7 16.29 10.31C16.68 9.92 17.32 9.92 17.71 10.31C18.1 10.7 18.1 11.33 17.71 11.72Z"
            />
          </svg>
        </div>
        <div className="content">{t("NotPublishedTip")}</div>
        <div className="footer">
          <Button type="primary" size="large" icon={<EditOutlined />}>{t("GoEdit")}</Button>
        </div>

      </div>
    </div>
  )
})