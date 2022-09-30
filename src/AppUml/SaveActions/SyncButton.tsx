import { SyncOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useShowError } from '../../hooks/useShowError';
import { useEdittingAppUuid } from '../../hooks/useEdittingAppUuid';
import { usePublishMeta } from '../hooks/usePublishMeta';
import { MetaStatus } from '../meta/Meta';
import { changedState, publishedIdState, metaState } from '../recoil/atoms';

const SyncButton = memo(() => {
  const appUuid = useEdittingAppUuid();
  const changed = useRecoilValue(changedState(appUuid))
  const [meta, setMeta] = useRecoilState(metaState(appUuid));
  const { t } = useTranslation();
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


  return (
    <Button
      disabled={disablePublished}
      type='primary'
      loading={loading}
      icon={<SyncOutlined />}
      onClick={handlePublish}
    >
      {t("Publish")}
    </Button>
  )
});

export default SyncButton;