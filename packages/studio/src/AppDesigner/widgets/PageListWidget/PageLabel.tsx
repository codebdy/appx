import TreeNodeLabel from "../../../common/TreeNodeLabel"
import React, { useCallback, useState } from "react"
import { IPage } from "../../../model"
import PageActions from "./PageActions"

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
    <TreeNodeLabel fixedAction={visible} action={<PageActions onVisibleChange={handleVisableChange} />}>
      {page.title}
    </TreeNodeLabel>
  )
}

export default PageLabel