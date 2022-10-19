import { Layout } from 'antd';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useQueryApps } from '../hooks/useQueryApps';
import { useShowError } from '~/hooks/useShowError';
import { appsLoadingState, appsState } from '../recoil/atoms';
import AppHeader from './AppHeader';
import "./style.less";

const { Content } = Layout;

const AppManager = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null)

  const setApps = useSetRecoilState(appsState);
  const setAppsLoading = useSetRecoilState(appsLoadingState);

  const { apps, error, loading } = useQueryApps();
  useShowError(error)

  useEffect(()=>{
    setAppsLoading(loading);
  }, [loading])

  useEffect(()=>{
    setApps(apps||[]);
  }, [apps])
  
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
        <Outlet />
      </Content>
    </Layout>
  )
});

export default AppManager