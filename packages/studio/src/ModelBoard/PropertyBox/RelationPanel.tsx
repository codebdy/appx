import React, { useCallback, useMemo } from "react";
import {
  RelationMeta,
  RelationMultiplicity,
  RelationType,
} from "../meta/RelationMeta";
import { useClass } from "../hooks/useClass";
import { useChangeRelation } from "../hooks/useChangeRelation";
import { useSelectedAppId } from "../hooks/useSelectedAppId";
import { Form, Input } from "antd";
import { getLocalMessage } from "../../locales/getLocalMessage";


export const RelationPanel = (props: { relation: RelationMeta }) => {
  const { relation } = props;
  const serviceId = useSelectedAppId();
  const source = useClass(relation.sourceId, serviceId);
  const target = useClass(relation.targetId, serviceId);
  const changeRelation = useChangeRelation(serviceId);

  const handleSourceMultiplicityChange = useCallback(
    (event: any) => {
      changeRelation({
        ...relation,
        sourceMutiplicity: event.target.value as RelationMultiplicity,
      });
    },
    [changeRelation, relation]
  );

  const handleTargetMultiplicityChange = useCallback(
    (event: any) => {
      changeRelation({
        ...relation,
        targetMultiplicity: event.target.value as RelationMultiplicity,
      });
    },
    [changeRelation, relation]
  );

  const handleSourceRoleChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeRelation({
        ...relation,
        roleOfTarget: event.target.value.trim(),
      });
    },
    [changeRelation, relation]
  );

  const handleSourceDescriptionChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeRelation({
        ...relation,
        descriptionOnSource: event.target.value,
      });
    },
    [changeRelation, relation]
  );
  const handleTargetRoleChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeRelation({
        ...relation,
        roleOfSource: event.target.value.trim(),
      });
    },
    [changeRelation, relation]
  );

  const handleTargetDescriptionChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeRelation({
        ...relation,
        descriptionOnTarget: event.target.value,
      });
    },
    [changeRelation, relation]
  );

  // const handleEnableAssociationClass = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const enabled = event.target.checked;
  //     changeRelation({
  //       ...relation,
  //       enableAssociaitonClass: enabled,
  //       associationClass:
  //         enabled && !relation.associationClass
  //           ? {
  //               name: "AssociationClass",
  //               attributes: [],
  //             }
  //           : relation.associationClass,
  //     });
  //   },
  //   [changeRelation, relation]
  // );

  // const handleAssociationClassNameChange = useCallback(
  //   (event: React.ChangeEvent<{ value: string }>) => {
  //     relation.associationClass &&
  //       changeRelation({
  //         ...relation,
  //         associationClass: {
  //           ...relation.associationClass,
  //           name: event.target.value,
  //         },
  //       });
  //   },
  //   [changeRelation, relation]
  // );

  // const handleAssociationFieldsChange = useCallback(
  //   (attrs: AttributeMeta[]) => {
  //     relation.associationClass &&
  //       changeRelation({
  //         ...relation,
  //         associationClass: {
  //           ...relation.associationClass,
  //           attributes: attrs,
  //         },
  //       });
  //   },
  //   [changeRelation, relation]
  // );

  const isInherit = useMemo(
    () => RelationType.INHERIT === relation.relationType,
    [relation.relationType]
  );

  const handleChange = useCallback((form) => {

  }, [])

  return (
    <div className="property-pannel">
      {
        isInherit ?
          <div style={{
            width: "100%",
            padding: "8px",
          }}>{getLocalMessage("model.Inherit")}</div>
          : <Form
            name="classForm"
            colon={false}
            labelAlign="left"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            //initialValues={cls}
            autoComplete="off"
            onValuesChange={handleChange}
          >
            <Form.Item
              label={getLocalMessage("model.Name")}
              name="name"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={getLocalMessage("model.Description")}
              name="description"
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
      }

    </div>
  );
};
