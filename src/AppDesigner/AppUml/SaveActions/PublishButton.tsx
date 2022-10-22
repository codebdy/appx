import { SyncOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useShowError } from '~/hooks/useShowError';
import { useEdittingAppId } from '~/hooks/useEdittingAppUuid';
import { usePublishMeta } from '../hooks/usePublishMeta';
import { changedState } from '../recoil/atoms';

const PublishButton = memo(() => {
  const appUuid = useEdittingAppId();
  const changed = useRecoilValue(changedState(appUuid))
  //const [meta, setMeta] = useRecoilState(metaState(appUuid));
  const { t } = useTranslation();
  //const [publishedId, setPublishedId] = useRecoilState(publishedIdState(appUuid));

  const [publish, { loading, error }] = usePublishMeta(appUuid, {
    onCompleted() {
      //setPublishedId(meta?.id);
      //setMeta(meta => (meta ? { ...meta, status: MetaStatus.META_STATUS_PUBLISHED } : undefined));
      message.success(t("OperateSuccess"));
    },
  });

  useShowError(error);

  const handlePublish = useCallback(() => {
    publish()
  }, [publish])


  return (
    <Button
      //disabled={disablePublished}
      type='primary'
      loading={loading}
      icon={<SyncOutlined />}
      onClick={handlePublish}
    >
      {t("Publish")}
    </Button>
  )
});

export default PublishButton;