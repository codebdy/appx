import React, { useCallback } from 'react'
import { Space, Button, message } from 'antd'
import { TextWidget } from '@designable/react'
import { observer } from '@formily/react'
import { useShowError } from '~/AppDesigner/hooks/useShowError'
import { useTranslation } from 'react-i18next'
import { useDesignerViewKey } from '~/plugin-sdk/contexts/desinger'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isNavigationDirtyState, menuIdState, navigationRootNodeState } from '../atoms'
import { useUpsertMenu } from '../../hooks/useUpsertMenu'
import { useExtractMenuNodeMeta } from '../hooks/useExtractMenuNodeMeta'
import { IMenu } from '~/model'

export const MenuActionsWidget = observer(() => {
  const { t } = useTranslation();
  const key = useDesignerViewKey();
  const rootNode = useRecoilValue(navigationRootNodeState(key));
  const isDirty = useRecoilValue(isNavigationDirtyState(key));
  const [meunId, setMenuId] = useRecoilState(menuIdState(key));
  const extractMetas = useExtractMenuNodeMeta();

  const [upsert, { loading, error }] = useUpsertMenu({
    onCompleted: (menu: IMenu) => {
      setMenuId(menu.id);
      message.success(t("OperateSuccess"))
    }
  });

  useShowError(error);

  const handleSave = useCallback(() => {
    const items = extractMetas(rootNode?.meta?.uuid || "")?.children || [];
    upsert({
      id: meunId,
      schemaJson: {
        items
      }
    });
  }, [extractMetas, meunId, rootNode?.meta?.uuid, upsert])

  return (
    <Space style={{ marginRight: 10 }}>
      <Button
        type="primary"
        loading={loading}
        disabled={!isDirty}
        onClick={handleSave}
      >
        <TextWidget>Save</TextWidget>
      </Button>
    </Space>
  )
})
