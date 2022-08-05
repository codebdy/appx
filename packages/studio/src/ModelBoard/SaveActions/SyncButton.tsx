import { DownloadOutlined, DownOutlined, ImportOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message } from 'antd';
import React, { memo, useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useShowError } from '../../hooks/useShowError';
import { getLocalMessage } from '../../locales/getLocalMessage';
import { useSelectedAppUuid } from '../context';
import { useExportJson } from '../hooks/useExportJson';
import { usePublishMeta } from '../hooks/usePublishMeta';
import { MetaStatus } from '../meta/Meta';
import { changedState, publishedIdState, metaState } from '../recoil/atoms';

const SyncButton = memo(() => {
  const appUuid = useSelectedAppUuid();
  const changed = useRecoilValue(changedState(appUuid))
  const [meta, setMeta] = useRecoilState(metaState(appUuid));
  const expotJson = useExportJson(appUuid)
  const [publishedId, setPublishedId] = useRecoilState(publishedIdState(appUuid));

  const disablePublished = React.useMemo(() => {
    return !!meta?.publishedAt || (publishedId === meta?.id && !changed);
  }, [changed, meta?.id, meta?.publishedAt, publishedId]);

  const [publish, { loading, error }] = usePublishMeta(appUuid, {
    onCompleted() {
      setPublishedId(meta?.id);
      setMeta(meta => (meta ? { ...meta, status: MetaStatus.META_STATUS_PUBLISHED } : undefined));
      message.success(t("OperateSuccess"));
    },
  });

  useShowError(error);

  const handlePublish = useCallback(() => {
    publish()
  }, [publish])

  const menu = useMemo(() => (
    <Menu
      items={[
        {
          icon: <DownloadOutlined />,
          label: t("model.ExportModel"),
          key: 'export',
          onClick: expotJson,
        },
        {
          icon: <ImportOutlined />,
          label: t("model.ImportModel"),
          key: 'import',
        },
      ]}
    />
  ), [expotJson]);

  return (
    <Dropdown.Button
      disabled={disablePublished}
      overlay={menu}
      placement="bottom"
      type='primary'
      loading={loading}
      icon={<DownOutlined />}
      onClick={handlePublish}
    >
      {t("Publish")}
    </Dropdown.Button>
  )
});

export default SyncButton;