import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import classNames from "classnames";
import AttributeView from "./AttributeView";
import { ClassNodeData } from "./ClassNodeData";
import MethodView from "./MethodView";
import { canStartLink } from "../canStartLink";
import {
  EVENT_CLASS_CHANGED,
  EVENT_PREPARE_LINK_TO,
  EVENT_PRESSED_LINE_TYPE,
  EVENT_UNDO_REDO,
  offCanvasEvent,
  onCanvasEvent,
} from "../events";
import { useMountRef } from "./useMountRef";
import "./index.less"
import { RelationType } from "../../meta/RelationMeta";
import { StereoType } from "../../meta/ClassMeta";
import { CONST_ID } from "../../meta/Meta";
import { CLASS_BACKGROUND_COLOR } from "../../consts";
import ClassActions from "./ClassActions";
import PlugIcon from "../../../icons/PlugIcon";

export const ClassView = memo(
  (props: {
    onAttributeSelect?: (attrId: string) => void;
    onAttributeDelete?: (clsId: string, attrId: string) => void;
    onAttributeCreate?: (clsId: string) => void;
    onMethodSelect?: (methodId: string) => void;
    onMethodDelete?: (clsId: string, methodId: string) => void;
    onMethodCreate?: (clsId: string) => void;
    onHide?: (clsId: string) => void;
    onDelete?: (uuid: string) => void;
    node?: any;
  }) => {
    const {
      node,
      onAttributeSelect,
      onAttributeDelete,
      onAttributeCreate,
      onMethodSelect,
      onMethodDelete,
      onMethodCreate,
      onDelete,
      onHide,
    } = props;
    const [hover, setHover] = useState(false);
    const [showLinkTo, setShowLinkTo] = React.useState(false);
    const mountRef = useMountRef();
    const [data, setData] = useState<ClassNodeData>();
    const [menuOpened, setMenuOpend] = useState(false);
    const [pressedLineType, setPressedLineType] = useState<RelationType>();

    useEffect(() => {
      setData(node?.data);
    }, [node?.data]);

    const handleChangePrepareToLink = useCallback(
      (event: Event) => {
        const showId = (event as CustomEvent).detail;
        if (mountRef.current) {
          setShowLinkTo(showId === data?.id);
        }
      },
      [data?.id, mountRef]
    );

    const pressedLineTypeChanged = useCallback(
      (event: Event) => {
        const newData = (event as CustomEvent).detail;
        if (mountRef.current) {
          setPressedLineType(newData);
        }
      },
      [mountRef]
    );
    const handleNodeChanged = useCallback(
      (event: Event) => {
        const newData = (event as CustomEvent).detail;
        if (mountRef.current && newData.uuid === data?.id) {
          setData({ ...data, ...newData });
        }
      },
      [data, mountRef]
    );

    const handleUndoRedo = useCallback(
      (event: Event) => {
        if (mountRef.current) {
          setData((data) => ({ ...data } as any));
        }
      },
      [mountRef]
    );

    useEffect(() => {
      onCanvasEvent(EVENT_PREPARE_LINK_TO, handleChangePrepareToLink);
      onCanvasEvent(EVENT_PRESSED_LINE_TYPE, pressedLineTypeChanged);
      onCanvasEvent(EVENT_CLASS_CHANGED, handleNodeChanged);
      onCanvasEvent(EVENT_UNDO_REDO, handleUndoRedo);
      return () => {
        offCanvasEvent(EVENT_PREPARE_LINK_TO, handleChangePrepareToLink);
        offCanvasEvent(EVENT_PRESSED_LINE_TYPE, pressedLineTypeChanged);
        offCanvasEvent(EVENT_CLASS_CHANGED, handleNodeChanged);
        offCanvasEvent(EVENT_UNDO_REDO, handleUndoRedo);
      };
    }, [
      handleChangePrepareToLink,
      handleNodeChanged,
      handleUndoRedo,
      pressedLineTypeChanged,
    ]);

    const canLinkFrom = useMemo(
      () => data && pressedLineType && canStartLink(pressedLineType, data),
      [data, pressedLineType]
    );
    const disableHover = useMemo(() => !!pressedLineType, [pressedLineType]);

    const handleHidden = useCallback(() => {
      onHide && onHide(node.id);
    }, [node.id, onHide]);

    const handleAttributeClick = useCallback(
      (id: string) => {
        onAttributeSelect && onAttributeSelect(id);
      },
      [onAttributeSelect]
    );

    const handleAttributeDelete = useCallback(
      (id: string) => {
        onAttributeDelete && onAttributeDelete(node.id, id);
      },
      [node.id, onAttributeDelete]
    );

    const handleAttributeCreate = useCallback(() => {
      onAttributeCreate && onAttributeCreate(node.id);
    }, [node.id, onAttributeCreate]);

    const handleMethodClick = useCallback(
      (id: string) => {
        onMethodSelect && onMethodSelect(id);
      },
      [onMethodSelect]
    );

    const handleMethodDelete = useCallback(
      (id: string) => {
        onMethodDelete && onMethodDelete(node.id, id);
      },
      [node.id, onMethodDelete]
    );
    const handleMethodCreate = useCallback(() => {
      onMethodCreate && onMethodCreate(node.id);
    }, [node.id, onMethodCreate]);

    const handleMouseOver = useCallback(() => {
      setHover(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setHover(false);
    }, []);

    const handleDelete = useCallback(() => {
      onDelete && onDelete(data?.uuid || "");
    }, [data?.uuid, onDelete]);

    const handleMenuVisible = useCallback((visable: boolean) => {
      setMenuOpend(visable)
    }, []);

    const boxShadow = useMemo(() => {
      const shadowConst = "0 0 0 3px ";
      const greenShadow = shadowConst + "rgba(93, 120, 255, 0.2)";
      if (hover) {
        if (!pressedLineType) {
          return (shadowConst + "rgba(93, 120, 255, 0.2)");
        } else {
          return canLinkFrom ? greenShadow : "";
        }
      } else {
        if (showLinkTo) {
          return greenShadow;
        }
      }

      return "";
    }, [
      canLinkFrom,
      hover,
      pressedLineType,
      showLinkTo,
    ]);

    return (
      <div
        className="model-class-view"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexFlow: "column",
          //background: theme.palette.background.paper,
          overflow: "hidden",
          cursor: canLinkFrom ? "crosshair" : undefined,
          boxShadow: boxShadow,
          borderRadius: "5px",
        }}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <div
          style={{
            flex: 1,
            border: "solid 2px",
            borderRadius: "5px",
            display: "flex",
            flexFlow: "column",
            background: CLASS_BACKGROUND_COLOR,
            // color: data?.root
            //   ? theme.palette.primary.main
            //   : theme.palette.text.primary,
            fontStyle:
              data?.stereoType === StereoType.Abstract ? "italic" : undefined,
            overflow: "hidden",
          }}
        >
          {
            data?.root &&
            <div style={{
              position: "absolute",
              left: "4px",
              top: "4px",
              color: "#5d78ff"
            }}>
              <PlugIcon size="20px" />
            </div>
          }

          <div
            style={{
              width: "100%",
              padding: "2px 0",
              display: "flex",
              flexFlow: "column",
              position: "relative",
            }}
          >
            {data?.stereoType !== StereoType.Entity && (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  opacity: 0.8,
                }}
              >
                &lt;&lt; {data?.stereoType} &gt;&gt;
              </div>
            )}

            <div className={"nameItem"}>{data?.name}</div>
            {data?.packageName && (
              <div className={classNames("nameItem", "smFont")}>
                <em>{data?.packageName}</em>
              </div>
            )}
            {((hover && !disableHover) || menuOpened) && (
              <ClassActions
                cls={data}
                onAddAttribute={handleAttributeCreate}
                onAddMethod={handleMethodCreate}
                onHidden={handleHidden}
                onDelete={handleDelete}
                onVisible={handleMenuVisible}
              />
            )}
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              flexFlow: "column",
              cursor: canLinkFrom ? "crosshair" : "default",
            }}
          >

            <div
              style={{
                display: "flex",
                flexFlow: "column",
                borderTop: "solid 1px",
                minHeight: "8px",
              }}
            >
              {data?.attributes?.map((attr) => {
                return attr.name === CONST_ID &&
                  data?.stereoType === StereoType.Abstract &&
                  !data?.root ? (
                  <Fragment key={attr.uuid}></Fragment>
                ) : (
                  <AttributeView
                    key={attr.uuid}
                    attr={attr}
                    stereoType={data.stereoType}
                    onClick={handleAttributeClick}
                    onDelete={handleAttributeDelete}
                    readOnly={disableHover}
                  />
                );
              })}
            </div>


            {data?.stereoType !== StereoType.Enum &&
              data?.stereoType !== StereoType.ValueObject && (
                <div
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    borderTop: "solid 1px",
                    minHeight: "24px",
                  }}
                >
                  {data?.methods?.map((method) => {
                    return (
                      <MethodView
                        key={method.uuid}
                        method={method}
                        onClick={handleMethodClick}
                        onDelete={handleMethodDelete}
                      />
                    );
                  })}
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
);
