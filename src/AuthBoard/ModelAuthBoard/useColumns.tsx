import { useTranslation } from "react-i18next";
import { ColumnsType } from 'antd/es/table';
import { useMemo } from "react";
import React from "react";
import { IAuthConfig, RowType } from "./IAuthConfig";
import { ExpandSwitch } from "./ExpandSwitch";
import { ID } from "../../shared";
import { ClassAuthChecker } from "./ClassAuthChecker";

export function useColumns(roleId: ID) {
  const { t } = useTranslation();
  const columns: ColumnsType<IAuthConfig> = useMemo(() => [
    {
      title: t("AppUml.Class"),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('Auth.Expand'),
      dataIndex: 'expand',
      key: 'expand',
      width: '12%',
      render: (_, { rowType, classUuid, classConfig }) => {
        return rowType === RowType.Class &&
          <ExpandSwitch classConfig={classConfig} classUuid={classUuid} roleId={roleId} />
      }
    },
    {
      title: t('Auth.Create'),
      dataIndex: 'create',
      key: 'create',
      width: '12%',
      render: (_, { rowType, classUuid, classConfig }) => {
        return rowType === RowType.Class &&
          <ClassAuthChecker
            classConfig={classConfig}
            classUuid={classUuid}
            roleId={roleId}
            field={"canCreate"}
            expressionField="createExpression"
          />
      }
    },
    {
      title: t('Auth.Delete'),
      dataIndex: 'delete',
      key: 'delete',
      width: '12%',
      render: (_, { rowType, classUuid, classConfig }) => {
        return rowType === RowType.Class &&
          <ClassAuthChecker
            classConfig={classConfig}
            classUuid={classUuid}
            roleId={roleId}
            field={"canDelete"}
            expressionField="deleteExpression"
          />
      }
    },
    {
      title: t('Auth.Read'),
      dataIndex: 'read',
      key: 'read',
      width: '12%',
      render: (_, { rowType, classUuid, classConfig }) => {
        return rowType === RowType.Class &&
          <ClassAuthChecker
            classConfig={classConfig}
            classUuid={classUuid}
            roleId={roleId}
            field={"canRead"}
            expressionField="readExpression"
          />
      }
    },
    {
      title: t('Auth.Update'),
      dataIndex: 'update',
      key: 'update',
      width: '12%',
      render: (_, { rowType, classUuid, classConfig }) => {
        return rowType === RowType.Class &&
          <ClassAuthChecker
            classConfig={classConfig}
            classUuid={classUuid}
            roleId={roleId}
            field={"canUpdate"}
            expressionField="upateExpression"
          />
      }
    },
  ], [roleId]);

  return columns;
}