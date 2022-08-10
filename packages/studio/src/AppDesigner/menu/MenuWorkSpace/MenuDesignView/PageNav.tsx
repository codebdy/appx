import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { DeleteFab } from "./DeleteFab";
import { IMenuNode } from "../../models/IMenuNode";
import { navigationSelectedIdState } from "../../atoms";
import { memo } from "react";
import { useRecoilState } from "recoil";

const PageNavInner = memo(
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
      <ListItem
        ref={provided.innerRef}
        button
        disableRipple
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        sx={{
          background: snapshot.isDragging
            ? theme.palette.action.selected
            : theme.palette.background.paper,
          outline: selected ? theme.palette.primary.main + " solid 1px" : 0,
          mt: "1px",
          position: "relative",
        }}
        onClick={handleClick}
      >
        {node.meta.icon?.trim() && (
          <ListItemIcon>
            <SvgStringIcon
              icon={node.meta.icon}
              sx={{ color: theme.palette.text.primary }}
            />
          </ListItemIcon>
        )}
        <ListItemText primary={node.meta?.title} />
        {!snapshot.isDragging && <DeleteFab node={node} />}
      </ListItem>
    );
  }
);

export const PageNav = memo((props: { node: IMenuNode; index: number }) => {
  const { node, index } = props;

  return (
    <Draggable draggableId={node.id} index={index}>
      {(provided, snapshot) => (
        <PageNavInner provided={provided} snapshot={snapshot} node={node} />
      )}
    </Draggable>
  );
});
