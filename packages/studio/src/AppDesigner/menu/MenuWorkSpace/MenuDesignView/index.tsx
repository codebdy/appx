import { Card } from "antd";
import { IApp } from "../../../../model";
import React, { memo, useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { useAppKey } from "../../../../shared/AppRoot/context";
import { navigationRootNodeState } from "../../atoms";
import NavItemList from "./NavItemList";

const MenuDesignView = memo((
  props: {
    app: IApp,
  }
) => {
  const { app } = props;
  const [canDrop, setCanDrop] = useState(true);
  const key = useAppKey();
  const rootNode = useRecoilValue(navigationRootNodeState(key));
  const handleDropable = useCallback((dropable: boolean) => {
    setCanDrop(dropable);
  }, []);


  return (
    <Card className="design-view" title={app?.title}>
      {rootNode && (
        <NavItemList
          node={rootNode}
          onParentDropable={handleDropable}
          canDrop={canDrop}
        />
      )}
    </Card>
  );
});

export default MenuDesignView;