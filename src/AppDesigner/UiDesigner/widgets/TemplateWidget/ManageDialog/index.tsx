import { Modal } from 'antd';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const ManageDialog = memo((
  props: {
    open?: boolean,
    onClose?: () => void,
  }
) => {
  const { open, onClose } = props;
  const { t } = useTranslation();

  const handleOk = useCallback(()=>{

  }, [])


  const handleCancel = useCallback(()=>{
    onClose();
  }, [onClose])

  return (
    <Modal
      title={t("Designer.ManageTemplates")}
      className='template-module-modal'
      open={open}
      okText={t("Confirm")}
      cancelText={t("Cancel")}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        //loading: loading
      }}
    >

    </Modal>
  );
})