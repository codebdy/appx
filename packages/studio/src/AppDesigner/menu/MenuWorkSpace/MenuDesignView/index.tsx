import React, { memo, useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { useDesingerKey } from "../../../context";
import { navigationRootNodeState } from "../../atoms";
import NavItemList from "./NavItemList";

const MenuDesignView = memo(() => {
  const [canDrop, setCanDrop] = useState(true);
  const key = useDesingerKey();
  const rootNode = useRecoilValue(navigationRootNodeState(key));
  const handleDropable = useCallback((dropable: boolean) => {
    setCanDrop(dropable);
  }, []);

  
  return (
    <div className="design-view">
      {rootNode && (
        <NavItemList
          node={rootNode}
          onParentDropable={handleDropable}
          canDrop={canDrop}
        />
      )}
    </div>
  );
});

export default MenuDesignView;