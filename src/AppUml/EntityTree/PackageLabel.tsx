import { Input } from "antd";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { memo } from "react";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { PackageMeta } from "../meta/PackageMeta";
import PackageAction from "./PackageAction";
import TreeNodeLabel from "../../common/TreeNodeLabel";
import { useSetRecoilState } from 'recoil';
import { packagesState } from './../recoil/atoms';
import { SYSTEM_APP_UUID } from "../../consts";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";
import { useParseLangMessage } from "../../plugin-sdk";
import { MultiLangInput } from "../../plugins/inputs/components/pc/MultiLangInput/view";

const PackageLabel = memo((
  props: {
    pkg: PackageMeta
  }
) => {
  const { pkg } = props;
  const [name, setName] = useState(pkg.name);
  const [editing, setEditing] = useState(false);
  const [visible, setVisible] = useState(false);

  const p = useParseLangMessage();

  useEffect(() => {
    setName(pkg.name)
  }, [pkg])

  const appUuid = useEdittingAppUuid();
  const backup = useBackupSnapshot(appUuid);
  const setPackages = useSetRecoilState(packagesState(appUuid));

  const handleVisableChange = useCallback((visible) => {
    setVisible(visible)
  }, []);

  const handleEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const handleChange = useCallback((value?: string) => {
    setName(value);
    handleEditFinish(value);
  }, []);

  const handleEditFinish = useCallback((value?: string) => {
    backup()
    setEditing(false);
    setPackages(packages => packages.map(pg => pg.uuid === pkg.uuid ? { ...pkg, name: value || name } : pg))
  }, [backup, name, pkg, setPackages])

  const handleKeyEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      handleEditFinish();
    }
  };

  return (
    <TreeNodeLabel
      fixedAction={visible || (pkg.sharable && appUuid !== SYSTEM_APP_UUID)}
      action={!editing ?
        <PackageAction pkg={pkg}
          onEdit={handleEdit}
          onVisibleChange={handleVisableChange} /> : undefined
      }
      onClick={e => editing ? e.stopPropagation() : undefined}
    >
      {
        editing ?
          <MultiLangInput
            //size="small"
            value={name}
            onClick={e => e.stopPropagation()}
            onChange={handleChange}
            onKeyUp={handleKeyEnter}
          />
          :
          <div>{p(name)}</div>
      }

    </TreeNodeLabel>
  )
})

export default PackageLabel;