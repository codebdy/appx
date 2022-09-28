import React, { useCallback, useEffect, useRef, useState } from 'react';
import BpmnJS from 'bpmn-js/dist/bpmn-navigated-viewer.production.min.js';
import "./style.less"

export const ReactBpmn = (props: {
  url: string,
}) => {
  const { url } = props;
  const [bpmnViewer, setBpmnViewr] = useState<any>()
  const [loading, setLoading] = useState(false);
  const [diagramXML, setDiagramXML] = useState<string>();
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (diagramXML && bpmnViewer) {
      bpmnViewer.importXML(diagramXML);
    }
  }, [diagramXML, bpmnViewer])

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
      const bpmnViewer = new BpmnJS({ container });
      setBpmnViewr(bpmnViewer)
      bpmnViewer.on('import.done', (event) => {
        const {
          error,
          warnings
        } = event;

        if (error) {
          //return handleError(error);
          return;
        }

        bpmnViewer.get('canvas').zoom('fit-viewport');

        //return handleShown(warnings);
      });
    }
  }, [containerRef?.current])

  return (
    <div className="react-bpmn-diagram-container" ref={containerRef}></div>
  )
}