import { Button } from "antd";
import SvgIcon from "../../../common/SvgIcon";
import React, { useCallback, useState } from "react";
import { memo } from "react";
import CreatePageModal from "./CreatePageModal";
import { useTranslation } from "react-i18next";

const CreatePageDialog = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <Button
        type='primary'
        icon={
          <SvgIcon>
            <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
              <path fill="currentColor" d="M13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H14L20 8V13.09C19.67 13.04 19.34 13 19 13S18.33 13.04 18 13.09V9H13V4H6V20H13.09C13.21 20.72 13.46 21.39 13.81 22M23 18H20V15H18V18H15V20H18V23H20V20H23V18Z" />
            </svg>
          </SvgIcon>
        }
        onClick={showModal}
      >
        {t("Pages.NewPage")}
      </Button>
      <CreatePageModal isModalVisible={isModalVisible} onClose={handleClose} />
    </>
  )
})

export default CreatePageDialog;