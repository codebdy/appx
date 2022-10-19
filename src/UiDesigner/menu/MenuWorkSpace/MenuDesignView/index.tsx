import { Card } from "antd";
import { IApp } from "../../../../model";
import React, { memo, useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { useAppViewKey } from "../../../../plugin-sdk/contexts/appRoot";
import { navigationRootNodeState } from "../../atoms";
import NavItemList from "./NavItemList";
import { useParseLangMessage } from "../../../../plugin-sdk/hooks/useParseLangMessage";

const MenuDesignView = memo((
  props: {
    app: IApp,
  }
) => {
  const { app } = props;
  const [canDrop, setCanDrop] = useState(true);
  const key = useAppViewKey();
  const rootNode = useRecoilValue(navigationRootNodeState(key));
  const p = useParseLangMessage();

  const handleDropable = useCallback((dropable: boolean) => {
    setCanDrop(dropable);
  }, []);


  return (
    <Card className="design-view" title={p(app?.title)}>
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