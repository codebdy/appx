import { useEffect, useState } from "react";
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export function useAssignment(element: any, modeler: any) {
  const [assignment, setAssignment] = useState<any>();
  useEffect(() => {
    if (!modeler || !element) {
      return;
    }
    console.log("哈哈哈", modeler)
    const businessObject = getBusinessObject(element);
    const moddle = modeler.get('moddle');
    //const extensionElements = businessObject.extensionElements || moddle.create('bpmn:ExtensionElements');
    let assignment = getExtensionElement(businessObject, 'zeebe:AssignmentDefinition');
    if (!assignment) {
      assignment = moddle.create('zeebe:AssignmentDefinition')
    }
    setAssignment(assignment)
  }, [element, modeler])

  return assignment;
}

function getExtensionElement(element, type) {
  if (!element.extensionElements) {
    return;
  }

  return element.extensionElements.values.filter((extensionElement) => {
    return extensionElement.$instanceOf(type);
  })[0];
}