import React, { memo } from "react";
import { ModelToolbar } from "../common/ModelBoard/ModelToolbar";
import { ModelBoard } from "../common/ModelBoard";
import { ReactBpmn } from "./ReactBpmn";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

export const AppBpmn = memo((props) => {
  const { t } = useTranslation();
  function onShown() {
    console.log('diagram shown');
  }

  function onLoading() {
    console.log('diagram loading');
  }

  function onError(err) {
    console.log('failed to show diagram');
  }

  return (
    <ModelBoard
      listWidth={200}
      toolbar={<ModelToolbar>
        工具栏
        <div style={{ flex: 1 }}></div>
        <Button type="primary">
          {t("Save")}
        </Button>
      </ModelToolbar>
      }
      propertyBox={<></>}
    >

      <ReactBpmn
        url="/public/diagram.bpmn"
      />
    </ModelBoard>
  );
})