import "@antv/x6-react-shape";
import { Graph, Node } from "@antv/x6";
import { useCallback, useEffect, useRef } from "react";
import { ClassView } from "./ClassView";
import _ from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  drawingLineState,
  pressedLineTypeState,
  selectedUmlDiagramState,
  selectedElementState,
} from "../recoil/atoms";
import { useDiagramNodes } from "../hooks/useDiagramNodes";
import { useGetClass } from "../hooks/useGetClass";
import { useGetDiagramNode } from "../hooks/useGetDiagramNode";
import { useGetNode } from "../hooks/useGetNode";
import { useChangeClass } from "../hooks/useChangeClass";
import { useCreateClassAttribute } from "../hooks/useCreateClassAttribute";
import { ClassNodeData } from "./ClassView/ClassNodeData";
import { useDeleteClass } from "../hooks/useDeleteClass";
import { useCreateClassMethod } from "../hooks/useCreateClassMethod";
import { ID } from "../../shared";
import React from "react";
import { useGetPackage } from "../hooks/useGetPackage";
import { useSelectedDiagramPackageUuid } from "../hooks/useSelectedDiagramPackageUuid";
import { useHideClassFromDiagram } from "../hooks/useHideClassFromDiagram";

export function useNodesShow(graph: Graph | undefined, appUuid: ID) {
  const selectedDiagram = useRecoilValue(selectedUmlDiagramState(appUuid));
  const [selectedElement, setSelectedElement] = useRecoilState(
    selectedElementState(appUuid)
  );
  const nodes = useDiagramNodes(selectedDiagram || "", appUuid);
  const getClass = useGetClass(appUuid);
  const getNode = useGetNode(appUuid);
  const getDiagramNode = useGetDiagramNode(appUuid);
  const pressedLineType = useRecoilValue(pressedLineTypeState(appUuid));
  const changeClass = useChangeClass(appUuid);
  const createAttribute = useCreateClassAttribute(appUuid);
  const createMethod = useCreateClassMethod(appUuid);
  const drawingLine = useRecoilValue(drawingLineState(appUuid));
  const getClassRef = useRef(getClass);
  getClassRef.current = getClass;
  const deleteClass = useDeleteClass(appUuid);
  const deleteClassRef = useRef(deleteClass);
  deleteClassRef.current = deleteClass;
  const getPackage = useGetPackage(appUuid);
  
  const selectedDiagramUuid = useSelectedDiagramPackageUuid(appUuid);
  const hideClass = useHideClassFromDiagram(appUuid);
  const hideClassRef = useRef(hideClass);
  hideClassRef.current = hideClass;

  const changeClassRef = useRef(changeClass);
  changeClassRef.current = changeClass;

  const createAttributeRef = useRef(createAttribute);
  createAttributeRef.current = createAttribute;

  const createMothodRef = useRef(createMethod);
  createMothodRef.current = createMethod;

  const handleAttributeSelect = useCallback(
    (attrId: string) => {
      setSelectedElement(attrId);
    },
    [setSelectedElement]
  );

  const handleAttributeDelete = useCallback(
    (classId: string, attrId: string) => {
      const cls = getClassRef.current(classId);
      if (!cls) {
        console.error("Class not exist: " + classId);
        return;
      }
      changeClassRef.current({
        ...cls,
        attributes: cls.attributes.filter((ent) => ent.uuid !== attrId),
      });
    },
    []
  );

  const handleMethodSelect = useCallback(
    (methodId: string) => {
      setSelectedElement(methodId);
    },
    [setSelectedElement]
  );

  const handleMothodDelete = useCallback(
    (classId: string, methodId: string) => {
      const cls = getClassRef.current(classId);
      if (!cls) {
        console.error("Class not exist: " + classId);
        return;
      }
      changeClassRef.current({
        ...cls,
        methods: cls.methods.filter((cls) => cls.uuid !== methodId),
      });
    },
    []
  );

  const handleAttributeCreate = useCallback((classUuid: string) => {
    const cls = getClassRef.current(classUuid);
    if (!cls) {
      console.error("Class not exist: " + classUuid);
      return;
    }
    const attr = createAttributeRef.current(cls);
    setSelectedElement(attr?.uuid)
  }, [setSelectedElement]);

  const handleMethodCreate = useCallback((classUuid: string) => {
    const cls = getClassRef.current(classUuid);
    if (!cls) {
      console.error("Class not exist: " + classUuid);
      return;
    }
    createMothodRef.current(cls);
  }, []);

  const handleHideClass = useCallback(
    (entityId: string) => {
      hideClassRef.current && hideClassRef.current(entityId)
    },
    []
  );

  const handelDeleteClass = useCallback(
    (uuid: string) => {
      deleteClassRef.current && deleteClassRef.current(uuid);
    },
    []
  );

  useEffect(() => {
    nodes?.forEach((node) => {
      const grahpNode = graph?.getCellById(node.id) as Node<Node.Properties>;
      const cls = getClass(node.id);
      if (!cls) {
        console.error("cant not find entity by node id :" + node.id);
        return;
      }

      const data: ClassNodeData = {
        ...cls,
        ...node,
        packageName: selectedDiagramUuid !== cls.packageUuid ? getPackage(cls.packageUuid)?.name : undefined,
        //selectedId: selectedElement,
        //pressedLineType: pressedLineType,
        //drawingLine: drawingLine,
        //themeMode: themeMode,
      };
      if (grahpNode) {
        //Update by diff
        if (!_.isEqual(data, grahpNode.data)) {
          grahpNode.replaceData(data);
        }
        if (
          node.x !== grahpNode.getPosition().x ||
          node.y !== grahpNode.getPosition().y ||
          node.width !== grahpNode.getSize().width ||
          node.height !== grahpNode.getSize().height
        ) {
          grahpNode.setSize(node as any);
          grahpNode.setPosition(node as any);
        }
      } else {
        graph?.addNode({
          ...node,
          shape: "react-shape",
          data,
          component: (
            <ClassView
              onAttributeSelect={handleAttributeSelect}
              onAttributeDelete={handleAttributeDelete}
              onAttributeCreate={handleAttributeCreate}
              onMethodSelect={handleMethodSelect}
              onMethodDelete={handleMothodDelete}
              onMethodCreate={handleMethodCreate}
              onDelete={handelDeleteClass}
              onHide={handleHideClass}
            />
          ),
        });
      }
    });
    graph?.getNodes().forEach((node) => {
      //如果diagram上没有
      if (!getDiagramNode(node.id, selectedDiagram || "")) {
        graph?.removeNode(node.id);
      }
      //如果实体已被删除
      if (!getNode(node.id, selectedDiagram || "")) {
        graph?.removeNode(node.id);
      }
    });
  }, [getDiagramNode, getClass, getNode, graph, handleAttributeCreate, handleAttributeDelete, handleAttributeSelect, handleHideClass, nodes, pressedLineType, selectedDiagram, selectedElement, setSelectedElement, drawingLine, handelDeleteClass, handleMethodCreate, handleMethodSelect, handleMothodDelete, selectedDiagramUuid, getPackage]);
}
