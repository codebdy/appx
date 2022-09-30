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
import { useEdittingAppUuid } from "../hooks/useAppUuid";

const PackageLabel = memo((
  props: {
    pkg: PackageMeta
  }
) => {
  const { pkg } = props;
  const [name, setName] = useState(pkg.name);
  const [editing, setEditing] = useState(false);
  const [visible, setVisible] = useState(false);

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

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const handleEditFinish = useCallback(() => {
    backup()
    setEditing(false);
    setPackages(packages => packages.map(pg => pg.uuid === pkg.uuid ? { ...pkg, name } : pg))
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
          onVisibleChange={handleVisableChange} /> : undefined}
    >
      {
        editing ?
          <Input
            size="small"
            value={name}
            onClick={e => e.stopPropagation()}
            onChange={handleChange}
            onBlur={handleEditFinish}
            onKeyUp={handleKeyEnter}
          />
          :
          <div>{name}</div>
      }

    </TreeNodeLabel>
  )
})

export default PackageLabel;