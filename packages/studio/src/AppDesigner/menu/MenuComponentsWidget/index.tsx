import { Collapse } from "antd"
import { IPage, IPageCategory } from "../../../model";
import React, { memo, useMemo } from "react"
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { COLLAPSE_GROUP_ID, CUSTOMIZED_LINK_ID, DIVIDER_ID, HELPER_LIST_ID } from "../consts";
import DraggableLabel from "./DraggableLabel";
import PagesTree from "./PagesTree";
const { Panel } = Collapse;

const MenuComponentsWidget = memo((
  props: {
    categories: IPageCategory[],
    pages: IPage[]
  }
) => {
  const { categories, pages } = props;
  const { t } = useTranslation();
  const items = useMemo(() => [
    {
      id: COLLAPSE_GROUP_ID,
      title: t("Menu.CollapseGroup"),
    },
    {
      id: DIVIDER_ID,
      title: t("Menu.Divider"),
    },
    {
      id: CUSTOMIZED_LINK_ID,
      title: t("Menu.CustomizedLink"),
    },
  ], [t]);

  return (
    <div className="menu-components">
      <Collapse
        style={{ border: 0 }}
        defaultActiveKey={[]}
        expandIconPosition="end"
      >
        <Panel header={t("Menu.HelpItems")} key="1">
          <Droppable droppableId={HELPER_LIST_ID} isDropDisabled={true}>
            {(provided) => (
              <div ref={provided.innerRef}>
                {items.map((item, index) => {
                  return (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <>
                          <DraggableLabel
                            dragId={item.id}
                            title={item.title}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            float={snapshot.isDragging}
                            ref={provided.innerRef}
                          />
                          {snapshot.isDragging && (
                            <DraggableLabel
                              dragId={item.id}
                              title={item.title}
                            />
                          )}
                        </>
                      )}
                    </Draggable>
                  );
                })}
                <div style={{ display: "none" }}>{provided.placeholder}</div>
              </div>
            )}

          </Droppable>
        </Panel>
        <Panel header={t("Menu.Pages")} key="2">
          <PagesTree categories={categories} pages={pages} />
        </Panel>
      </Collapse>
    </div>
  )
})

export default MenuComponentsWidget

