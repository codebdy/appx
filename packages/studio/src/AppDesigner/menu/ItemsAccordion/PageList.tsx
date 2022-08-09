import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { PAGE_LIST_ID } from "../consts";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import { RxApp } from "packages/rx-entity-interfaces/RxApp";

export const PageList = (props: { module: RxApp }) => {
  const { module } = props;
  const theme = useTheme();

  return (
    <Droppable
      droppableId={PAGE_LIST_ID + "-" + module.id}
      isDropDisabled={true}
    >
      {(provided, snapshot) => (
        <List ref={provided.innerRef} sx={{ mt: -2 }}>
          {module.pages?.map((page, index) => {
            return (
              <Draggable key={page.uuid} draggableId={page.uuid} index={index}>
                {(provided, snapshot) => (
                  <React.Fragment key={page.id}>
                    <ListItem
                      button
                      disableRipple
                      sx={{
                        background: snapshot.isDragging
                          ? theme.palette.action.selected
                          : undefined,
                        border: theme.palette.divider + " dashed 1px",
                        mt: 0.5,
                        mb: 0.5,
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
                      <ListItemText>{page.name}</ListItemText>
                    </ListItem>
                    {snapshot.isDragging && (
                      <ListItem
                        button
                        disableRipple
                        sx={{
                          border: theme.palette.divider + " dashed 1px",
                          mt: 0.5,
                          mb: 0.5,
                        }}
                      >
                        <ListItemIcon>
                          {" "}
                          <DragIndicatorOutlinedIcon
                            sx={{ color: theme.palette.text.primary }}
                          />{" "}
                        </ListItemIcon>
                        <ListItemText>{page.name}</ListItemText>
                      </ListItem>
                    )}
                  </React.Fragment>
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
