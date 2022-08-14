import { Layout } from 'antd';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useShowError } from '../hooks/useShowError';
import { useSystemConfig } from '../hooks/useSystemConfig';
import { AppConfigContext } from '../shared/AppRoot/context/config';
import AppHeader from './AppHeader';

const { Content } = Layout;

const AppManager = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const { config, error } = useSystemConfig()
  useShowError(error);
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
    <AppConfigContext.Provider value={config}>
      <Layout className="rx-studio">
        <AppHeader scrolled={scrolled} />
        <Content ref={ref} className='content'>
          <Outlet />
        </Content>
      </Layout>
    </AppConfigContext.Provider>
  )
});

export default AppManager