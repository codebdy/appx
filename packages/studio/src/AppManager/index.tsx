import { Layout } from 'antd';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

const { Content } = Layout;

const AppManager = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null)
  const handleScroll = useCallback((event: Event) => {
    const scrollRect = ref?.current?.getBoundingClientRect();
    if (scrollRect.y < 40) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll])

  return (
    <Layout className="rx-studio">
      <AppHeader scrolled={scrolled} />
      <Content ref={ref} className='content'>
        {t("title")}
        <Outlet />
      </Content>
    </Layout>
  )
});

export default AppManager