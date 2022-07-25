import * as React from "react";
import { Button, Divider, SvgIcon } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { memo } from "react";
import { LoadingButton } from "@mui/lab";
import intl from "react-intl-universal";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import { changedState, publishedIdState, metaState } from "../recoil/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useShowServerError } from "hooks/useShowServerError";
import { usePublishMeta } from "do-ents/usePublishMeta";
import { successAlertState } from "recoil/atoms";
import { Meta, MetaStatus } from "../meta/Meta";
import { useSelectedServiceId } from "../hooks/useSelectedServiceId";
import { useSelectedService } from "../hooks/useSelectedService";
import {
  diagramsState,
  classesState,
  relationsState,
  x6EdgesState,
  x6NodesState,
} from "../recoil/atoms";

const downloadFile = function (filename: string, content: string) {
  // 创建隐藏的可下载链接
  var eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  var blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};


export const SyncButton = memo(() => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const setSuccessAlertState = useSetRecoilState(successAlertState);
  const serviceId = useSelectedServiceId();
  const service = useSelectedService();
  const publishedId = useRecoilValue(publishedIdState(serviceId));
  const changed = useRecoilValue(changedState(serviceId));
  const [meta, setMeta] = useRecoilState(metaState(serviceId));
  const classeMetas = useRecoilValue(classesState(serviceId));
  const relations = useRecoilValue(relationsState(serviceId));
  const diagrams = useRecoilValue(diagramsState(serviceId));
  const x6Nodes = useRecoilValue(x6NodesState(serviceId));
  const x6Edges = useRecoilValue(x6EdgesState(serviceId));

  const setPublishedId = useSetRecoilState(publishedIdState(serviceId));

  const [publish, { loading, error }] = usePublishMeta({
    onCompleted() {
      setPublishedId(meta?.id);
      setMeta(meta => (meta ? { ...meta, status: MetaStatus.META_STATUS_PUBLISHED } : undefined));
      setSuccessAlertState(true);
    },
  });

  useShowServerError(error);
  const handleToggle = React.useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleClose = React.useCallback((event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  }, []);

  const disableIncreasePublished = React.useMemo(() => {
    return !!meta?.publishedAt || (publishedId === meta?.id && !changed);
  }, [changed, meta?.id, meta?.publishedAt, publishedId]);

  const handlePublish = React.useCallback(() => {
    publish(service?.url);
  }, [publish, service?.url]);

  const handleExport = React.useCallback(() => {
    const content = {
      classes: classeMetas,
      relations,
      diagrams,
      x6Nodes,
      x6Edges,
    };

    const data: Meta =
      meta?.status === MetaStatus.META_STATUS_PUBLISHED || !meta
        ? {
          content,
        }
        : {
          ...meta,
          content,
        };
    downloadFile(service?.name + '.json', JSON.stringify(data, null, 2));
  }, [classeMetas, diagrams, meta, relations, service, x6Edges, x6Nodes]);

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        sx={{ ml: 1 }}
        ref={anchorRef}
        disabled={changed || loading}
      >
        <LoadingButton
          variant="contained"
          color="primary"
          size="medium"
          disabled={disableIncreasePublished}
          loading={loading}
          sx={{
            "&.MuiButtonGroup-grouped:not(:last-of-type)": {
              borderRight: !changed
                ? "rgba(255, 255, 255, 0.15) solid 1px"
                : "rgba(0, 0, 0, 0.15) solid 1px !important",
            },
            fontSize: "0.9rem",
          }}
          startIcon={
            <SvgIcon fontSize="small">
              <path
                fill="currentColor"
                d="M20 13.09V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.21 7.59 21 12 21C12.46 21 12.9 21 13.33 20.94C13.12 20.33 13 19.68 13 19L13 18.95C12.68 19 12.35 19 12 19C8.13 19 6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16C12.65 16 13.27 15.96 13.88 15.89C14.93 14.16 16.83 13 19 13C19.34 13 19.67 13.04 20 13.09M18 12.45C16.7 13.4 14.42 14 12 14S7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V12.45M12 9C8.13 9 6 7.5 6 7S8.13 5 12 5 18 6.5 18 7 15.87 9 12 9M22 18H20V22H18V18H16L19 15L22 18Z"
              />
            </SvgIcon>
          }
          onClick={handlePublish}
        >
          {intl.get("publish")}
        </LoadingButton>

        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          sx={{
            "&.MuiButtonGroup-grouped": {
              width: (theme) => theme.spacing(3),
              minWidth: (theme) => theme.spacing(3),
            },
          }}
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "center top",
            }}
          >
            <Paper elevation={5}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  <MenuItem disabled={disableIncreasePublished}>
                    <SvgIcon fontSize="small" sx={{ mr: 1 }}>
                      <path
                        fill="currentColor"
                        d="M20 13.09V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.21 7.59 21 12 21C12.46 21 12.9 21 13.33 20.94C13.12 20.33 13 19.68 13 19L13 18.95C12.68 19 12.35 19 12 19C8.13 19 6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16C12.65 16 13.27 15.96 13.88 15.89C14.93 14.16 16.83 13 19 13C19.34 13 19.67 13.04 20 13.09M18 12.45C16.7 13.4 14.42 14 12 14S7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V12.45M12 9C8.13 9 6 7.5 6 7S8.13 5 12 5 18 6.5 18 7 15.87 9 12 9M22 18H20V22H18V18H16L19 15L22 18Z"
                      />
                    </SvgIcon>
                    发布
                  </MenuItem>
                  <MenuItem onClick={handleExport}>
                    <SvgIcon fontSize="small" sx={{ mr: 1 }}>
                      <path fill="currentColor" d="M5,3H7V5H5V10A2,2 0 0,1 3,12A2,2 0 0,1 5,14V19H7V21H5C3.93,20.73 3,20.1 3,19V15A2,2 0 0,0 1,13H0V11H1A2,2 0 0,0 3,9V5A2,2 0 0,1 5,3M19,3A2,2 0 0,1 21,5V9A2,2 0 0,0 23,11H24V13H23A2,2 0 0,0 21,15V19A2,2 0 0,1 19,21H17V19H19V14A2,2 0 0,1 21,12A2,2 0 0,1 19,10V5H17V3H19M12,15A1,1 0 0,1 13,16A1,1 0 0,1 12,17A1,1 0 0,1 11,16A1,1 0 0,1 12,15M8,15A1,1 0 0,1 9,16A1,1 0 0,1 8,17A1,1 0 0,1 7,16A1,1 0 0,1 8,15M16,15A1,1 0 0,1 17,16A1,1 0 0,1 16,17A1,1 0 0,1 15,16A1,1 0 0,1 16,15Z" />
                    </SvgIcon>
                    导出JSON
                  </MenuItem>
                  <Divider />
                  <MenuItem disabled>
                    <UndoOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                    导入JSON
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
});
