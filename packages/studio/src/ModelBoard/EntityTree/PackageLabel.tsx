import React from "react";
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
  return (
    <TreeNodeLabel fixedAction action={<PackageAction />}>
      <div>{pkg.name}</div>
    </TreeNodeLabel>
  )
})

export default PackageLabel;