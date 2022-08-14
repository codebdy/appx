import { Layout } from 'antd';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppRoot from '../shared/AppRoot';
import AppHeader from './AppHeader';

const { Content } = Layout;

const AppManager = memo(() => {
  const [scrolled, setScrolled] = useState(false);
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
    <AppRoot>
      <Layout className="rx-studio">
        <AppHeader scrolled={scrolled} />
        <Content ref={ref} className='content'>
          <Outlet />
        </Content>
      </Layout>
    </AppRoot>
  )
});

export default AppManager