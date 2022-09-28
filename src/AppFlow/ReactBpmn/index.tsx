import React, { useCallback, useEffect, useRef, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
//import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/properties-panel.css";
import "./style.less"

export const ReactBpmn = (props: {
  url: string,
}) => {
  const { url } = props;
  const [bpmnModeler, setBpmnModeler] = useState<any>()
  const [loading, setLoading] = useState(false);
  const [diagramXML, setDiagramXML] = useState<string>();
  const containerRef = useRef<HTMLDivElement>();
  const canvasRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (diagramXML && bpmnModeler) {
      bpmnModeler.importXML(diagramXML);
    }
  }, [diagramXML, bpmnModeler])

  const fetchDiagram = useCallback((url: string) => {
    setLoading(true);
    fetch(url)
      .then(
        response => {
          setLoading(false);
          return response.text();
        }
      )
      .then(text => {
        setDiagramXML(text)
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false)
      });
  }, [])

  useEffect(() => {
    if (url) {
      fetchDiagram(url);
    }
  }, [url, fetchDiagram])

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

  return (
    <div className="react-bpmn-diagram-container" ref={containerRef}>
    </div>
  )
}