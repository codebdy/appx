import React, { memo, useCallback, useEffect, useMemo, } from "react";
import { Addon, Graph } from "@antv/x6";
import { Tree } from "antd";
import { DataNode } from "antd/lib/tree";
import SvgIcon from "../../common/SvgIcon";
import { getLocalMessage } from "../../locales/getLocalMessage";
import RootAction from "./RootAction";
import { useRecoilState, useRecoilValue } from 'recoil';
import { packagesState, diagramsState, classesState, selectedDiagramState, selectedElementState } from './../recoil/atoms';
import { useSelectedAppId } from './../hooks/useSelectedAppId';
import TreeNodeLabel from "./TreeNodeLabel";
import PackageLabel from "./PackageLabel";
import { PackageMeta } from "../meta/PackageMeta";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { classSvg } from "./svgs";
import { useIsDiagram } from "../hooks/useIsDiagram";
import { useIsElement } from "../hooks/useIsElement";
import { PRIMARY_COLOR } from "../../consts";
import { NODE_INIT_SIZE } from "../GraphCanvas/nodeInitSize";
import { ClassView } from "../GraphCanvas/ClassView";
const { Dnd } = Addon;
const { DirectoryTree } = Tree;

export const EntityTree = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const [dnd, setDnd] = React.useState<any>();
  const appId = useSelectedAppId();
  const packages = useRecoilValue(packagesState(appId));
  const diagrams = useRecoilValue(diagramsState(appId));
  const classes = useRecoilValue(classesState(appId));
  const isDiagram = useIsDiagram(appId);
  const isElement = useIsElement(appId);
  const [selectedDiagramId, setSelecteDiagramId] = useRecoilState(selectedDiagramState(appId));
  const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState(appId));

  useEffect(() => {
    const theDnd = graph
      ? new Dnd({
        target: graph,
        scaled: false,
        animation: true,
      })
      : undefined;
    setDnd(theDnd);
  }, [graph, classes]);

  const startDragHandle = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cls: ClassMeta) => {
      if (!graph) {
        return;
      }
      const node = graph.createNode({
        ...NODE_INIT_SIZE,
        height: 70 + (cls?.attributes.length || 0) * 26,
        isTempForDrag: true,
        shape: "react-shape",
        component: <ClassView />,
        data: { ...cls, isTempForDrag: true },
      });
      dnd?.start(node, e.nativeEvent as any);
    },
    [dnd, graph, classes]
  );

  const getClassAttributesNode = useCallback((cls: ClassMeta) => {
    return {
      title: getLocalMessage("model.Atrributes"),
      key: cls.uuid + "attributes",
      //children: clses.map(cls => getClassNode(cls))
    }
  }, [])

  const getClassRelationsNode = useCallback((cls: ClassMeta) => {
    return {
      title: getLocalMessage("model.Relationships"),
      key: cls.uuid + "relations",
      //children: clses.map(cls => getClassNode(cls))
    }
  }, [])

  const getClassNode = useCallback((cls: ClassMeta) => {
    return {
      icon: <SvgIcon>{classSvg}</SvgIcon>,
      title:
        <div style={{ color: selectedElement === cls.uuid ? PRIMARY_COLOR : undefined }}
          draggable
          onDragStart={e => startDragHandle(e, cls)}
        >
          {cls.name}
        </div>,
      key: cls.uuid,
      children: [getClassAttributesNode(cls), getClassRelationsNode(cls)]
    }
  }, [selectedElement, startDragHandle])

  const getClassCategoryNode = useCallback((title: string, key: string, clses: ClassMeta[]) => {
    return {
      title: title,
      key: key,
      children: clses.map(cls => getClassNode(cls))
    }
  }, [getClassNode])

  const getPackageChildren = useCallback((pkg: PackageMeta) => {
    const packageChildren: DataNode[] = []
    const abstracts = classes.filter(cls => cls.stereoType === StereoType.Abstract && cls.packageUuid === pkg.uuid)
    const entities = classes.filter(cls => cls.stereoType === StereoType.Entity && cls.packageUuid === pkg.uuid)
    const enums = classes.filter(cls => cls.stereoType === StereoType.Enum && cls.packageUuid === pkg.uuid)
    const valueObjects = classes.filter(cls => cls.stereoType === StereoType.ValueObject && cls.packageUuid === pkg.uuid)

    if (abstracts.length > 0) {
      packageChildren.push(getClassCategoryNode(getLocalMessage("model.AbstractClass"), pkg.uuid + "abstracts", abstracts))
    }
    if (entities.length > 0) {
      packageChildren.push(getClassCategoryNode(getLocalMessage("model.EntityClass"), pkg.uuid + "entities", entities))
    }
    if (enums.length > 0) {
      packageChildren.push(getClassCategoryNode(getLocalMessage("model.EnumClass"), pkg.uuid + "enums", enums))
    }
    if (valueObjects.length > 0) {
      packageChildren.push(getClassCategoryNode(getLocalMessage("model.ValueClass"), pkg.uuid + "valueObjects", valueObjects))
    }

    for (const diagram of diagrams.filter(diagram => diagram.packageUuid === pkg.uuid)) {
      packageChildren.push({
        title: diagram.name,
        key: diagram.uuid,
        isLeaf: true,
      })
    }

    return packageChildren;
  }, [diagrams, classes, getClassCategoryNode])

  const getPackageNodes = useCallback(() => {
    return packages.map((pkg) => {
      return {
        title: <PackageLabel pkg={pkg} />,
        key: pkg.uuid,
        children: getPackageChildren(pkg),
      }
    })
  }, [packages, getPackageChildren]);

  const treeData: DataNode[] = useMemo(() => [
    {
      icon: <SvgIcon>
        <svg style={{ width: "16px", height: "16px" }} viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M907.8 226.4l0.1-0.2L526 98.2l-13.4-4.5c-0.4-0.1-0.8-0.1-1.2 0l-13.3 4.5-381.8 128 0.1 0.2c-7.7 3.2-13.4 10.7-13.4 20v509.4c0 0.7 0.4 1.4 1.1 1.7l382 162.1 13.2 5.6 12.1 5.1c0.5 0.2 1 0.2 1.4 0l12.1-5.1 13.2-5.6 382-162.1c0.7-0.3 1.1-0.9 1.1-1.7V246.3c-0.1-9.2-5.8-16.7-13.4-19.9zM483.5 862L156 723c-0.7-0.3-1.1-0.9-1.1-1.7V294.9c0-1.3 1.3-2.2 2.5-1.7l327.5 139c0.7 0.3 1.1 0.9 1.1 1.7v426.4c0 1.3-1.3 2.2-2.5 1.7z m27.8-475L201.9 255.6c-1.5-0.7-1.5-2.9 0.1-3.4l310.1-103.9 310 103.9c1.6 0.5 1.7 2.7 0.1 3.4L512.7 387c-0.4 0.2-1 0.2-1.4 0zM868 723L540.5 862c-1.2 0.5-2.5-0.4-2.5-1.7V433.9c0-0.7 0.4-1.4 1.1-1.7l327.5-139c1.2-0.5 2.5 0.4 2.5 1.7v426.4c0 0.7-0.4 1.4-1.1 1.7z" p-id="16762"></path>
        </svg>
      </SvgIcon>,
      title:
        <TreeNodeLabel fixedAction action={<RootAction />}>
          <div>{getLocalMessage("model.DomainModel")}</div>
        </TreeNodeLabel>,
      key: "0",
      children: getPackageNodes()
    },

  ], [getPackageNodes, packages]);

  const handleSelect = useCallback((keys: string[]) => {
    for (const uuid of keys) {
      if (isDiagram(uuid)) {
        setSelecteDiagramId(uuid);
      } else if (isElement(uuid)) {
        setSelectedElement(uuid);
      }
    }
  }, [isDiagram, isElement])

  return (

    <div
      style={{
        flex: 1,
        overflow: "auto",
        padding: 8,
      }}
    >
      <DirectoryTree
        selectedKeys={[selectedDiagramId]}
        //className='page-list-tree'
        // allowDrop={()=>{
        //   return true
        // }}
        // draggable={
        //   ()=>{
        //     return true
        //   }
        // }
        //defaultExpandAll
        onSelect={handleSelect}
        treeData={treeData}
      />
    </div>
  );
});
