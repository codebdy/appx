import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import intl from "react-intl-universal";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";

import {
  COLLAPSE_GROUP_ID,
  HELPER_LIST_ID,
  SUBHEADER_ID,
} from "../consts";
import { Draggable, Droppable } from "react-beautiful-dnd";

export const HelperList = () => {
  const theme = useTheme();
  const items = [
    {
      id: COLLAPSE_GROUP_ID,
      name: intl.get("collapse-group"),
    },
    {
      id: SUBHEADER_ID,
      name: intl.get("title"),
    },
  ];

  return (
    <Droppable droppableId={HELPER_LIST_ID} isDropDisabled={true}>
      {(provided) => (
        <List ref={provided.innerRef} sx={{mt:-2}}>
          {items.map((item, index) => {
            return (
              <Draggable key = {item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <>
                    <ListItem
                      button
                      disableRipple
                      sx={{
                        background: snapshot.isDragging
                          ? theme.palette.action.selected
                          : undefined,
                        border: theme.palette.divider + " dashed 1px",
                        mt: 0.5,
                        mb: 0.5
                      }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <ListItemIcon>
                        <DragIndicatorOutlinedIcon
                          sx={{ color: theme.palette.text.primary }}
                        />
                      </ListItemIcon>
                      <ListItemText>{item.name}</ListItemText>
                    </ListItem>
                    {snapshot.isDragging && (
                      <ListItem
                        button
                        disableRipple
                        sx={{
                          border: theme.palette.divider + " dashed 1px",
                          mt: 0.5,
                          mb: 0.5
                        }}
                      >
                        <ListItemIcon>
                          <DragIndicatorOutlinedIcon
                            sx={{ color: theme.palette.text.primary }}
                          />
                        </ListItemIcon>
                        <ListItemText>
                          {intl.get("collapse-group")}
                        </ListItemText>
                      </ListItem>
                    )}
                  </>
                )}
              </Draggable>
            );
          })}

          <Box sx={{ display: "none" }}>{provided.placeholder}</Box>
        </List>
      )}
    </Droppable>
  );
};
