import { Form, Input } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAssignment } from "../../hooks/useAssignment";

export const AssgnmentItem = (props: { element: any, modeler: any }) => {
  const { element, modeler } = props;
  const { t } = useTranslation()
  return (
    <>
      <Form.Item
        label={t("AppBpmn.Assignee")}
        name="assignee"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("AppBpmn.Candidate groups")}
        name="candidateGroups"
      >
        <Input />
      </Form.Item>
    </>
  )
}