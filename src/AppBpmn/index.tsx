import React, { memo, useEffect, useRef, useState } from "react";
import { ModelToolbar } from "../common/ModelBoard/ModelToolbar";
import { ModelBoard } from "../common/ModelBoard";
import { Button, Spin } from "antd";
import { useTranslation } from "react-i18next";
import BpmnModeler from 'bpmn-js/lib/Modeler';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/properties-panel.css";
import "./style.less"
import { PropertyBox } from "../common/ModelBoard/PropertyBox";
import { useSelectedElement } from "./hooks/useSelectedElement";
import { PropertyPanel } from "./PropertyPanel";
import { ProcessList } from "./ProcessList";
import { useQueryOneProcess } from "./hooks/useQueryOneProcess";
import { useRecoilValue } from "recoil";
import { selectedBpmnProcessIdState } from "./recoil/atoms";
import { useAppParams } from "../plugin-sdk";
import { useShowError } from "../hooks/useShowError";

export const AppBpmn = memo((props) => {
  const { app } = useAppParams();
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>();
  const [bpmnModeler, setBpmnModeler] = useState<any>()
  const { element } = useSelectedElement(bpmnModeler);
  const selectedProcessId = useRecoilValue(selectedBpmnProcessIdState(app?.uuid));
  const { process, loading, error } = useQueryOneProcess(selectedProcessId)

  useShowError(error);

  useEffect(() => {
    const container = containerRef?.current;
    if (container && selectedProcessId) {
      const bpmnModeler = new BpmnModeler({
        container: container,
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        // additionalModules: [
        //   BpmnPropertiesPanelModule,
        //   BpmnPropertiesProviderModule
        // ]
      });
      setBpmnModeler(bpmnModeler)
      bpmnModeler.on('import.done', (event) => {
        const {
          error,
          warnings
        } = event;

        if (error) {
          console.error(error)
          //return handleError(error);

        } else {
          bpmnModeler.get('canvas').zoom('fit-viewport');
        }
      });

      if (process?.xml) {
        bpmnModeler.importXML(process?.xml);
      }
      return () => {
        bpmnModeler?.destroy();
      }
    }
  }, [process])

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
      listWidth={240}
      toolbar={<ModelToolbar>
        工具栏
        <div style={{ flex: 1 }}></div>
        <Button type="primary">
          {t("Save")}
        </Button>
      </ModelToolbar>
      }
      modelList={
        <ProcessList />
      }
      propertyBox={<PropertyBox title={t("Properties")} >
        <PropertyPanel element={element} modeler={bpmnModeler} />
      </PropertyBox>}
    >
      <Spin spinning={loading}>
        <div className="react-bpmn-diagram-container" ref={containerRef}>
        </div>
      </Spin>
    </ModelBoard>
  );
})