import { Card } from "antd";
import React, { memo, useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { useDesignerViewKey } from "~/plugin-sdk/contexts/desinger";
import { navigationRootNodeState } from "../../atoms";
import NavItemList from "./NavItemList";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
import { IApp } from "~/model";

const MenuDesignView = memo((
  props: {
    app: IApp,
  }
) => {
  const { app } = props;
  const [canDrop, setCanDrop] = useState(true);
  const key = useDesignerViewKey();
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