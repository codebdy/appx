import { Box, Grid, TextField, useTheme } from "@mui/material";
import intl from "react-intl-universal";
import { MultiSelectBox } from "packages/rx-components/Inputs/Select/MultiSelectBox";
import { RxAuth } from "packages/rx-entity-interfaces/RxAuth";
import { useCallback } from "react";
import { useMenuNode } from "../hooks/useMenuNode";
import { useSetMeta } from "../hooks/useSetMeta";
import { useRecoilValue } from "recoil";
import { navigationSelectedIdState } from "../atoms";
import { MenuItemType } from "components/Workspace/NavDrawer/NavList/IMenuItem";
import { useScrollbarStyles } from "theme/useScrollbarStyles";
import { PageSelect } from "components/Studio/common/PageSelect";

export const NodePanel = () => {
  const theme = useTheme();
  const selectedId = useRecoilValue(navigationSelectedIdState);
  const node = useMenuNode(selectedId);
  const setMeta = useSetMeta();
  const scrollbarStyles = useScrollbarStyles();
  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const title = event.target.value as any;
      if (node) {
        setMeta(node.id, { ...node.meta, title });
      }
    },
    [node, setMeta]
  );

  const handleIconChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const icon = event.target.value as any;
      if (node) {
        setMeta(node.id, { ...node.meta, icon });
      }
    },
    [node, setMeta]
  );
  const handleChangeAuths = useCallback(
    (auths: RxAuth[] | undefined) => {
      if (node) {
        setMeta(node.id, { ...node.meta, auths });
      }
    },
    [node, setMeta]
  );

  const handlePageChange = useCallback((pageUuid) => {
    if (node) {
      setMeta(node.id, {
        ...node.meta,
        route: { ...(node.meta.route || {}), pageUuid },
      });
    }
  }, [node, setMeta]);

  return (
    <Box
      sx={{
        mt: 0,
        flex: 1,
        p: 2,
        border: theme.palette.divider + " solid 1px",
        width: theme.spacing(40),
        display: "flex",
        flexFlow: "column",
        bgcolor: "background.paper",
        borderRadius: theme.spacing(1),
        overflowY: "auto",
        ...scrollbarStyles,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label={intl.get("name")}
            size="small"
            value={node?.meta.title || ""}
            onChange={handleTitleChange}
          />
        </Grid>

        {node?.meta?.type !== MenuItemType.Subheader && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label={intl.get("icon")}
              size="small"
              multiline
              rows={6}
              value={node?.meta.icon || ""}
              helperText={intl.get("please-input-jsx")}
              onChange={handleIconChange}
            />
          </Grid>
        )}
        {node?.meta?.type === MenuItemType.Item && (
          <Grid item xs={12}>
            <PageSelect
              label={intl.get("page")}
              value={node?.meta.route?.pageUuid}
              onChange={handlePageChange}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <MultiSelectBox
            fullWidth
            label={intl.get("authority")}
            variant="outlined"
            size="small"
            // items={app?.auths || []}
            value={node?.meta.auths || []}
            onChange={(e: any) => handleChangeAuths(e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
