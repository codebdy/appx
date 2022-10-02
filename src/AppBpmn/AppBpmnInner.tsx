import React, { memo, useEffect, useRef, useState } from "react";
import { ModelToolbar } from "../common/ModelBoard/ModelToolbar";
import { ModelBoard } from "../common/ModelBoard";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useLoadDiagramXML } from "./hooks/useLoadDiagramXML";
import BpmnModeler from 'bpmn-js/lib/Modeler';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/properties-panel.css";
import "./style.less"
import { PropertyBox } from "../common/ModelBoard/PropertyBox";
import { useSelectedElement } from "./hooks/useSelectedElement";
import { PropertyPanel } from "./PropertyPanel";
import AppRoot from "../shared/AppRoot";

export const AppBpmnInner = memo((props) => {
  const { t } = useTranslation();
  const { diagramXML } = useLoadDiagramXML();
  const containerRef = useRef<HTMLDivElement>();
  const [bpmnModeler, setBpmnModeler] = useState<any>()
  const { element } = useSelectedElement(bpmnModeler);

  useEffect(() => {
    const container = containerRef?.current;
    if (container) {
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

        //return handleShown(warnings);
      });
    }

    return () => {
      bpmnModeler?.destroy();
    }
  }, [])

  useEffect(() => {
    if (diagramXML && bpmnModeler) {
      bpmnModeler.importXML(diagramXML);
    }
  }, [diagramXML, bpmnModeler])

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
      modelList={
        <div>
          列表
        </div>
      }
      propertyBox={<PropertyBox title={t("Properties")} >
        <PropertyPanel element={element} modeler={bpmnModeler} />
      </PropertyBox>}
    >
      <div className="react-bpmn-diagram-container" ref={containerRef}>
      </div>
    </ModelBoard>
  );
})