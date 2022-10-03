import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { ModelToolbar } from "../common/ModelBoard/ModelToolbar";
import { ModelBoard } from "../common/ModelBoard";
import { Button, Divider, Spin } from "antd";
import { useTranslation } from "react-i18next";
import BpmnModeler from 'bpmn-js/lib/Modeler';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/properties-panel.css";
import "./style.less"
import minimapModule from 'diagram-js-minimap';
import "diagram-js-minimap/assets/diagram-js-minimap.css";
import { PropertyBox } from "../common/ModelBoard/PropertyBox";
import { useSelectedElement } from "./hooks/useSelectedElement";
import { PropertyPanel } from "./PropertyPanel";
import { ProcessList } from "./ProcessList";
import { useQueryOneProcess } from "./hooks/useQueryOneProcess";
import { useRecoilState, useRecoilValue } from "recoil";
import { minMapState, selectedBpmnProcessIdState } from "./recoil/atoms";
import { useAppParams } from "../plugin-sdk";
import { useShowError } from "../hooks/useShowError";
import { PRIMARY_COLOR } from "../consts";
import { AimOutlined, RedoOutlined, UndoOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";

export const AppBpmn = memo((props) => {
  const { app } = useAppParams();
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>();
  const canvasrRef = useRef<HTMLDivElement>();
  const [bpmnModeler, setBpmnModeler] = useState<any>()
  const { element } = useSelectedElement(bpmnModeler);
  const selectedProcessId = useRecoilValue(selectedBpmnProcessIdState(app?.uuid));
  const { process, loading, error } = useQueryOneProcess(selectedProcessId)
  const [minMap, setMinMap] = useRecoilState(minMapState(app?.uuid));
  const minMapRef = useRef(minMap);
  minMapRef.current = minMap;

  useShowError(error);

  useEffect(() => {
    if (bpmnModeler) {
      if (minMap) {
        bpmnModeler.get('minimap').open();
      } else {
        bpmnModeler.get('minimap').close();
      }
    }

  }, [minMap, bpmnModeler])

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasrRef?.current;
    if (canvas && selectedProcessId) {
      const bpmnModeler = new BpmnModeler({
        container: canvas,
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        additionalModules: [
          minimapModule
        ]
      });
      setBpmnModeler(bpmnModeler)
      bpmnModeler.on('import.done', (event) => {
        const {
          error,
          warnings
        } = event;

        if (error) {
          console.error(error)
          container.classList.remove('with-diagram')
          container.classList.add('with-error');

        } else {
          bpmnModeler.get('canvas').zoom('fit-viewport');
          minMapRef.current && bpmnModeler.get('minimap').open();
          container.classList.remove('with-error')
          container.classList.add('with-diagram');
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

  const toggleMinMap = useCallback(() => {
    setMinMap(minMap => !minMap)
  }, [])

  const handleUndo = useCallback(() => {

  }, [])

  const handleRedo = useCallback(() => {

  }, [])

  return (
    <ModelBoard
      listWidth={240}
      toolbar={<ModelToolbar>
        <Button
          type="text"
          shape="circle"
          size="large"
          disabled={!selectedProcessId}
          onClick={toggleMinMap}
        >
          <svg style={{ width: '18px', height: '18px', marginTop: "4px" }} viewBox="0 0 24 24">
            <path
              fill={minMap && selectedProcessId ? PRIMARY_COLOR : "currentColor"}
              d="M12 4C14.2 4 16 5.8 16 8C16 10.1 13.9 13.5 12 15.9C10.1 13.4 8 10.1 8 8C8 5.8 9.8 4 12 4M12 2C8.7 2 6 4.7 6 8C6 12.5 12 19 12 19S18 12.4 18 8C18 4.7 15.3 2 12 2M12 6C10.9 6 10 6.9 10 8S10.9 10 12 10 14 9.1 14 8 13.1 6 12 6M20 19C20 21.2 16.4 23 12 23S4 21.2 4 19C4 17.7 5.2 16.6 7.1 15.8L7.7 16.7C6.7 17.2 6 17.8 6 18.5C6 19.9 8.7 21 12 21S18 19.9 18 18.5C18 17.8 17.3 17.2 16.2 16.7L16.8 15.8C18.8 16.6 20 17.7 20 19Z"
            />
          </svg>
        </Button>
        <Button
          type="text"
          shape="circle"
          size="large"
          disabled = {!selectedProcessId}
        >
          <AimOutlined />
        </Button>
        <Button
          type="text"
          shape="circle"
          size="large"
          disabled = {!selectedProcessId}
        >
          <ZoomOutOutlined />
        </Button>
        <Button
          type="text"
          shape="circle"
          size="large"
          disabled = {!selectedProcessId}
        >
          <ZoomInOutlined />
        </Button>
        <Divider type="vertical" />
        <Button
          //disabled={undoList.length === 0}
          disabled = {!selectedProcessId}
          type="text"
          shape="circle"
          onClick={handleUndo}
          size="large"
        >
          <UndoOutlined />
        </Button>
        <Button
          //disabled={redoList.length === 0}
          disabled = {!selectedProcessId}
          type="text"
          shape="circle"
          onClick={handleRedo}
          size="large"
        >
          <RedoOutlined />
        </Button>
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
        <div className="bmpm-content react-bpmn-diagram-container" ref={containerRef} id="js-drop-zone">
          <div className="message error">
            <div className="note">
              <p>Ooops, we could not display the BPMN 2.0 diagram.</p>

              <div className="details">
                <span>cause of the problem</span>
                <pre></pre>
              </div>
            </div>
          </div>

          <div className="canvas" ref={canvasrRef} id="js-canvas"></div>
        </div>
      </Spin>
    </ModelBoard>
  );
})