import { DeleteOutline } from "@mui/icons-material";
import { Fab } from "@mui/material";
import {
  isNavigationDirtyState,
  navigationSelectedIdState,
} from "../atoms";
import { memo, useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRemoveMenuNode } from "../hooks/useRemoveMenuNode";
import { IMenuNode } from "../models/IMenuNode";

export const DeleteFab = memo((props: { node: IMenuNode }) => {
  const { node } = props;
  const selectedId = useRecoilValue(navigationSelectedIdState);
  const setIsDirty = useSetRecoilState(isNavigationDirtyState);

  const selected = selectedId && selectedId === node.id;
  const remove = useRemoveMenuNode();
  const handleDelete = useCallback(() => {
    remove(node.id);
    setIsDirty(true);
  }, [node.id, remove, setIsDirty]);

  return selected ? (
    <Fab
      color="primary"
      aria-label="delete"
      size="small"
      sx={{
        position: "absolute",
        right: -56,
        top: "calc(50% - 20px)",
        zIndex: 10,
      }}
      onClick={handleDelete}
    >
      <DeleteOutline />
    </Fab>
  ) : (
    <></>
  );
});
