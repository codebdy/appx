import React, { useCallback } from 'react'
import { Space, Button, message } from 'antd'
import { TextWidget } from '@designable/react'
import { observer } from '@formily/react'
import { useShowError } from '../../../hooks/useShowError'
import { useTranslation } from 'react-i18next'
import { useAppViewKey } from '../../../shared/AppRoot/context'
import { useUpsertMenu } from '../../hooks/useUpsertMenu'
import { IMenu } from 'packages/studio/src/model'
import { useRecoilState } from 'recoil'
import { deviceConfigChangedState } from '../../recoil/atom'

export const ConfigActionsWidget = observer(() => {
  const key = useAppViewKey();
  const [changed, setChanged] = useRecoilState(deviceConfigChangedState(key));
  const { t } = useTranslation();


  // const [upsert, { loading, error }] = useUpsertMenu({
  //   onCompleted: (menu: IMenu) => {
  //     setMenuId(menu.id);
  //     message.success(t("OperateSuccess"))
  //   }
  // });

  // useShowError(error);

  // const handleSave = useCallback(() => {
  //   const items = extractMetas(rootNode?.meta?.uuid || "")?.children || [];
  //   upsert({
  //     id: meunId,
  //     schemaJson: {
  //       items
  //     }
  //   });
  // }, [extractMetas, meunId, rootNode?.meta?.uuid, upsert])

  return (
    <Space style={{ marginRight: 10 }}>
      <Button
        type="primary"
        //loading={loading}
        disabled={!changed}
        //onClick={handleSave}
      >
        <TextWidget>Save</TextWidget>
      </Button>
    </Space>
  )
})
