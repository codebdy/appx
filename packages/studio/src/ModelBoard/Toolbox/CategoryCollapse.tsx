import React from "react";
import { memo, useCallback, useMemo, useState } from "react";

export const CategoryCollapse = memo(
  (props: {
    title: string;
    children: React.ReactNode;
    disabled?: boolean;
    defaultOpen?: boolean;
  }) => {
    const { title, children, disabled, defaultOpen } = props;
    const [expanded, setExpanded] = useState(defaultOpen);
    const handleToggle = useCallback(() => {
      setExpanded((a) => !a);
    }, []);

    // const color = useMemo(() => {
    //   return disabled
    //     ? theme.palette.action.disabled
    //     : theme.palette.text.secondary;
    // }, [disabled, theme.palette.action.disabled, theme.palette.text.secondary]);

    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "column",
        }}
      >
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
            padding: 4,
            paddingRight: 8,
          }}
          //square
          onClick={handleToggle}
        >
          <div
            //variant="subtitle1"
            // sx={{
            //   color: color,
            // }}
          >
            {title}
          </div>
          {/* {expanded && !disabled ? (
            <KeyboardArrowDownIcon
              sx={{
                color: color,
              }}
              fontSize="small"
            />
          ) : (
            <ChevronRightIcon
              sx={{
                color: color,
              }}
              fontSize="small"
            />
          )} */}
        </div>
        <div
          //in={expanded && !disabled}
          //timeout="auto"
          //unmountOnExit
          style={{ padding: "16px" }}
        >
          {children}
        </div>
      </div>
    );
  }
);
