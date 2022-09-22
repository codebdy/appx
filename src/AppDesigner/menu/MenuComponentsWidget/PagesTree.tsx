import { Collapse } from 'antd';
import React, { memo } from 'react';
import { DraggableLabel } from '../../common/DraggableLabel';
import { usePagesWithoutCategory } from '../../hooks/usePagesWithoutCategory';
import { useGetCategoryPages } from '../../hooks/useGetCategoryPages';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { OTHER_PAGES_ID, PAGE_LIST_ID } from '../consts';
import { useParseLangMessage } from '../../../hooks/useParseLangMessage';
import { useCategories } from '../../hooks/useCategories';
const { Panel } = Collapse;

const PagesTree = memo((
  props: {
  }
) => {
  const categories = useCategories();
  const pagesWithoutCategory = usePagesWithoutCategory();
  const getCategoryPage = useGetCategoryPages();
  const p = useParseLangMessage();

  return (
    <Collapse
      bordered={false}
      ghost
      defaultActiveKey={[]}
    >
      {
        categories?.map((category) => {
          return (
            <Panel key={category.id} header={p(category.title)}>
              <Droppable droppableId={PAGE_LIST_ID + category.id} isDropDisabled={true}>
                {(provided) => (
                  <div ref={provided.innerRef}>
                    {
                      getCategoryPage(category.id)?.map((page, index) => {
                        return (
                          <Draggable key={page.id} draggableId={page.id} index={index}>
                            {(provided, snapshot) => (
                              <>
                                <DraggableLabel
                                  title={p(page.title)}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  float={snapshot.isDragging}
                                  ref={provided.innerRef}
                                />
                                {snapshot.isDragging && (
                                  <DraggableLabel
                                    key={page.id}
                                    title={p(page.title)}
                                    fixed
                                  />
                                )}
                              </>
                            )}
                          </Draggable>
                        )
                      })
                    }
                    <div style={{ display: "none" }}>{provided.placeholder}</div>
                  </div>)}
              </Droppable>
            </Panel>
          )
        })
      }
      <Droppable droppableId={PAGE_LIST_ID + OTHER_PAGES_ID} isDropDisabled={true}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {
              pagesWithoutCategory?.map((page, index) => {
                return (
                  <Draggable key={page.id} draggableId={page.id} index={index}>
                    {(provided, snapshot) => (
                      <>
                        <DraggableLabel
                          title={p(page.title)}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          float={snapshot.isDragging}
                        />
                        {snapshot.isDragging && (
                          <DraggableLabel key={page.id} title={p(page.title)} />
                        )}
                      </>
                    )}
                  </Draggable>
                )
              })
            }
            <div style={{ display: "none" }}>{provided.placeholder}</div>
          </div>)}
      </Droppable>
    </Collapse>
  );
});

export default PagesTree;