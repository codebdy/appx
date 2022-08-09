import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { SvgStringIcon } from "packages/rx-components/SvgStringIcon";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { NavItemList } from ".";
import { DeleteFab } from "./DeleteFab";
import { IMenuNode } from "../models/IMenuNode";
import { useRecoilState } from "recoil";
import { navigationSelectedIdState } from "../atoms";

const CollpaseGroupInner = memo(
  (props: {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    node: IMenuNode;
    onParentDropable: (drapable: boolean) => void;
  }) => {
    const { provided, snapshot, node, onParentDropable } = props;
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const [canDrop, setCanDrop] = useState(true);
    const [selectedId, setSelectedId] = useRecoilState(
      navigationSelectedIdState
    );

    const handleMouseOver = useCallback(() => {
      setHover(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setHover(false);
    }, []);

    const handleParentDropable = useCallback(
      (dropable: boolean) => {
        onParentDropable && onParentDropable(dropable);
        setCanDrop(dropable);
      },
      [onParentDropable]
    );

    useEffect(() => {
      onParentDropable && onParentDropable(!hover);
    }, [hover, onParentDropable]);

    const theme = useTheme();

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        setSelectedId(node.id);
        event.stopPropagation();
      },
      [node.id, setSelectedId]
    );
    const handleToggle = useCallback(() => {
      setOpen(!open);
    }, [open]);

    const selected = useMemo(
      () => selectedId && selectedId === node.id,
      [node.id, selectedId]
    );
    return (
      <Box
        ref={provided.innerRef}
        sx={{
          outline: selected ? theme.palette.primary.main + " solid 1px" : 0,
          mt: "1px",
          position: "relative",
        }}
        {...provided.draggableProps}
        onClick={handleClick}
      >
        <ListItem
          button
          disableRipple
          sx={{
            background: snapshot.isDragging
              ? theme.palette.action.selected
              : theme.palette.background.paper,
            border: open ? theme.palette.divider + " dotted 1px" : 0,
            borderBottom: 0,
          }}
          onClick={handleClick}
          {...provided.dragHandleProps}
        >
          {node.meta.icon?.trim() && (
            <ListItemIcon>
              <SvgStringIcon
                icon={node.meta.icon}
                sx={{ color: theme.palette.text.primary }}
              />
            </ListItemIcon>
          )}

          <ListItemText>{node.meta.title}</ListItemText>
          <IconButton onClick={handleToggle} color="inherit">
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box
            sx={{
              display: "flex",
              flexFlow: "column",
              minHeight: 60,
              border: theme.palette.divider + " dotted 1px",
              backgroundColor: theme.palette.background.paper,
              borderTop: 0,
            }}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <NavItemList
              node={node}
              onParentDropable={handleParentDropable}
              canDrop={canDrop}
              isSubList={true}
            />
          </Box>
        </Collapse>
        {!snapshot.isDragging && <DeleteFab node={node} />}
      </Box>
    );
  }
);
export const CollapseGroup = memo(
  (props: {
    node: IMenuNode;
    index: number;
    onParentDropable: (drapable: boolean) => void;
  }) => {
    const { node, index, onParentDropable } = props;

    return (
      <Draggable draggableId={node.id} index={index}>
        {(provided, snapshot) => (
          <CollpaseGroupInner
            provided={provided}
            snapshot={snapshot}
            node={node}
            onParentDropable={onParentDropable}
          />
        )}
      </Draggable>
    );
  }
);
