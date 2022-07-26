import React, { useCallback, useMemo } from "react";
import {
  RelationMeta,
  RelationMultiplicity,
  RelationType,
} from "../meta/RelationMeta";
import { useClass } from "../hooks/useClass";
import { useChangeRelation } from "../hooks/useChangeRelation";
import { useSelectedAppId } from "../hooks/useSelectedAppId";
import { Collapse, Form, Input, Select } from "antd";
import { getLocalMessage } from "../../locales/getLocalMessage";

const { Panel } = Collapse;
const { Option } = Select;

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

  const isInherit = useMemo(
    () => RelationType.INHERIT === relation.relationType,
    [relation.relationType]
  );

  const handleChange = useCallback((form) => {

  }, [])

  return (
    <div className="property-pannel no-border" style={{ padding: 0 }}>
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
            initialValues={relation}
            autoComplete="off"
            onValuesChange={handleChange}
          >
            <Collapse className="no-border" defaultActiveKey={['1']}>
              <Panel header={source?.name + getLocalMessage("model.Side")} key="1">
                <Form.Item
                  label={getLocalMessage("model.Multiplicity")}
                  name="sourceMutiplicity"
                >
                  <Select>
                    <Option value={RelationMultiplicity.ZERO_ONE}> {RelationMultiplicity.ZERO_ONE}</Option>
                    {relation.relationType !==
                      RelationType.ONE_WAY_COMBINATION &&
                      relation.relationType !==
                      RelationType.TWO_WAY_COMBINATION && (
                        <Option value={RelationMultiplicity.ZERO_MANY}> {RelationMultiplicity.ZERO_MANY}</Option>
                      )}
                  </Select>

                </Form.Item>
                {
                  relation.relationType !== RelationType.ONE_WAY_AGGREGATION &&
                  relation.relationType !== RelationType.ONE_WAY_ASSOCIATION &&
                  relation.relationType !== RelationType.ONE_WAY_COMBINATION &&
                  <>
                    <Form.Item
                      label={getLocalMessage("model.RoleName")}
                      name="roleOfSource"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={getLocalMessage("model.Description")}
                      name="descriptionOnSource"
                    >
                      <Input />
                    </Form.Item>
                  </>
                }

              </Panel>
              <Panel header={target?.name + getLocalMessage("model.Side")} key="2">
                <Form.Item
                  label={getLocalMessage("model.Multiplicity")}
                  name="targetMultiplicity"
                >
                  <Select>
                    <Option value={RelationMultiplicity.ZERO_ONE}> {RelationMultiplicity.ZERO_ONE}</Option>
                    <Option value={RelationMultiplicity.ZERO_MANY}> {RelationMultiplicity.ZERO_MANY}</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label={getLocalMessage("model.RoleName")}
                  name="roleOfTarget"
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  label={getLocalMessage("model.Description")}
                  name="descriptionOnTarget"
                >
                  <Input.TextArea />
                </Form.Item>
              </Panel>
            </Collapse>
          </Form>
      }
    </div>
  );
};
