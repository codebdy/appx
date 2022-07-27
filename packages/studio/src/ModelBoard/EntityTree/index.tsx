import React, { memo, useCallback, useMemo, } from "react";
import { Graph } from "@antv/x6";
import { Button, Tree } from "antd";
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
import ClassLabel from "./ClassLabel";
import InterfaceIcon from '../../icons/InterfaceIcon';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useCreateClassAttribute } from './../hooks/useCreateClassAttribute';
import { AttributeMeta } from './../meta/AttributeMeta';
import { useDeleteAttribute } from './../hooks/useDeleteAttribute';
import { CONST_ID } from "../meta/Meta";
import { useParseRelationUuid } from "../hooks/useParseRelationUuid";
const { DirectoryTree } = Tree;

export const EntityTree = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const appId = useSelectedAppId();
  const packages = useRecoilValue(packagesState(appId));
  const diagrams = useRecoilValue(diagramsState(appId));
  const classes = useRecoilValue(classesState(appId));
  const addAttribute = useCreateClassAttribute(appId);
  const removeAttribute = useDeleteAttribute(appId);
  const isDiagram = useIsDiagram(appId);
  const isElement = useIsElement(appId);
  const parseRelationUuid = useParseRelationUuid(appId);
  const [selectedDiagramId, setSelecteDiagramId] = useRecoilState(selectedDiagramState(appId));
  const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState(appId));

  const getAttributeNode = useCallback((attr: AttributeMeta) => {
    return {
      icon: <SvgIcon>
        <svg style={{ width: "12px", height: "12px" }} viewBox="0 0 24 24" fill="currentColor"><path
          fill="currentColor"
          d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12Z"
        /></svg>
      </SvgIcon>,
      title:
        <TreeNodeLabel
          action={
            attr.name !== CONST_ID &&
            <Button
              type="text"
              shape="circle"
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                removeAttribute(attr.uuid);
              }}
            >
              <DeleteOutlined />
            </Button>
          }
        >
          {attr.name}
        </TreeNodeLabel>,
      key: attr.uuid,
      isLeaf: true,
    }
  }, [removeAttribute]);

  const getClassAttributesNode = useCallback((cls: ClassMeta) => {
    return {
      title:
        <TreeNodeLabel
          action={
            <Button
              type="text"
              shape="circle"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                addAttribute(cls);
              }}
            >
              <PlusOutlined />
            </Button>
          }
        >
          {getLocalMessage("model.Atrributes")}
        </TreeNodeLabel>,
      key: cls.uuid + "attributes",
      children: cls.attributes.map(attr => getAttributeNode(attr))
    }
  }, [getAttributeNode, addAttribute])

  const getClassRelationsNode = useCallback((cls: ClassMeta) => {
    const children = [];
    return {
      title: getLocalMessage("model.Relationships"),
      key: cls.uuid + "relations",
      children: children,
    }
  }, [])

  const getClassMethodsNode = useCallback((cls: ClassMeta) => {
    const children = [];
    return {
      title: getLocalMessage("model.Methods"),
      key: cls.uuid + "methods",
      children: children,
    }
  }, [])

  const getClassNode = useCallback((cls: ClassMeta) => {
    const children = [getClassAttributesNode(cls)];
    if (cls.stereoType === StereoType.Abstract || cls.stereoType === StereoType.Entity) {
      children.push(getClassMethodsNode(cls))
    }

    if (cls.stereoType == StereoType.Entity) {
      const relations = getClassRelationsNode(cls);
      relations.children?.length >0 && children.push(relations)
    }
    return {
      icon: cls.root ? <InterfaceIcon size={"12px"} /> : <SvgIcon>{classSvg}</SvgIcon>,
      title: <ClassLabel cls={cls} graph={graph} />,
      key: cls.uuid,
      children: children,
    }
  }, [selectedElement, classes, getClassAttributesNode, getClassRelationsNode, getClassMethodsNode])

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
      } else {
        const relationUuid = parseRelationUuid(uuid);
        if (relationUuid) {
          setSelectedElement(relationUuid);
        }
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
        onSelect={handleSelect}
        treeData={treeData}
      />
    </div>
  );
});
