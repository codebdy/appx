import TreeNodeLabel from "../../../common/TreeNodeLabel"
import React, { useCallback, useState } from "react"
import CategoryActions from "./CategoryActions"
import { IPage } from "../../../model"

const PageLabel = (
  props: {
    page: IPage
  }
) => {
  const { page } = props;
  const [visible, setVisible] = useState(false);
  const handleVisableChange = useCallback((visible) => {
    setVisible(visible)
  }, []);

  return (
    <TreeNodeLabel fixedAction={visible} action={<CategoryActions onVisibleChange={handleVisableChange} />}>
      {page.title}
    </TreeNodeLabel>
  )
}

export default PageLabel