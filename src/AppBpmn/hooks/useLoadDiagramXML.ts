import { useCallback, useEffect, useState } from "react";

const url = "/public/diagram.bpmn";
export function useLoadDiagramXML() {
  const [loading, setLoading] = useState(false);
  const [diagramXML, setDiagramXML] = useState<string>();
  const [error, setError] = useState<Error>();

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

  return { diagramXML, loading, error }
}