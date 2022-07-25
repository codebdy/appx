import React, { useCallback } from "react";
import { memo } from "react";
import { PackageMeta } from "../meta/PackageMeta";
import PackageAction from "./PackageAction";
import TreeNodeLabel from "./TreeNodeLabel";

const PackageLabel = memo((
  props: {
    pkg: PackageMeta
  }
) => {
  const {pkg} = props;
  const handleEdit = useCallback(()=>{

  }, [])
  
  return (
    <TreeNodeLabel fixedAction action={<PackageAction pkg={pkg} onEdit={handleEdit} />}>
      <div>{pkg.name}</div>
    </TreeNodeLabel>
  )
})

export default PackageLabel;