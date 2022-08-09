import { ListSubheader, useTheme } from "@mui/material";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { DeleteFab } from "./DeleteFab";
import { IMenuNode } from "../models/IMenuNode";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { navigationSelectedIdState } from "../atoms";

const SubheaderInner = memo(
  (props: {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    node: IMenuNode;
  }) => {
    const { provided, snapshot, node } = props;
    const theme = useTheme();
    const [selectedId, setSelectedId] = useRecoilState(
      navigationSelectedIdState
    );

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setSelectedId(node.id);
      event.stopPropagation();
    };

    const selected = selectedId && selectedId === node.id;
    return (
      <ListSubheader
        component="div"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        sx={{
          background: snapshot.isDragging
            ? theme.palette.action.selected
            : theme.palette.background.paper,
          outline: selected ? theme.palette.primary.main + " solid 1px" : 0,
          mt: "1px",
          position: "relative",
          "&:hover": {
            background: theme.palette.action.hover,
          },
        }}
        onClick={handleClick}
      >
        {node.meta?.title}
        {!snapshot.isDragging && <DeleteFab node={node} />}
      </ListSubheader>
    );
  }
);

export const Subheader = memo((props: { node: IMenuNode; index: number }) => {
  const { node, index } = props;

  return (
    <Draggable draggableId={node.id} index={index}>
      {(provided, snapshot) => (
        <SubheaderInner provided={provided} snapshot={snapshot} node={node} />
      )}
    </Draggable>
  );
});
