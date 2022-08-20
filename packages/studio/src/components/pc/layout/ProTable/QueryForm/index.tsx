import React, { useMemo, useState, useCallback, CSSProperties } from 'react'
import { observer } from '@formily/react'
import {
  FormGrid,
  FormLayout,
} from '@formily/antd'
import { ButtonsGridColum } from './ButtonsGridColum'
import { Card } from 'antd'

type formilyGrid = typeof FormGrid

export type IQueryFormProps = {
  maxRowsOnCollapsed?: number,
  maxColumns?: number,
  maxWidth?: number,
  layout?: "horizontal" | "vertical",
  collapsiable?: boolean,
  className?: string,
  children?: React.ReactNode,
  style?: CSSProperties,
} & React.ComponentProps<formilyGrid>

export const QueryForm: React.FC = observer((props: IQueryFormProps) => {
  const {
    layout = "horizontal",
    collapsiable = true,
    maxRowsOnCollapsed = 1,
    minWidth,
    maxWidth,
    minColumns,
    maxColumns,
    breakpoints,
    columnGap,
    rowGap,
    colWrap,
    strictAutoFit,
    children,
    style,
    ...other
  } = props;
  const [expanded, setExpanded] = useState(false);


  const grid = useMemo(
    () => {
      return FormGrid.createFormGrid({
        maxColumns: maxColumns,
        maxWidth: maxWidth,
        maxRows: expanded ? maxRowsOnCollapsed : Infinity,
        shouldVisible: (node, grid) => {
          if (!collapsiable) return true;
          if (node.index === grid.childSize - 1) return true
          if (grid.maxRows === Infinity) return true
          return node.shadowRow < maxRowsOnCollapsed + 1 && node.index < maxColumns - 1
        },
      })
    },
    [collapsiable, expanded, maxColumns, maxRowsOnCollapsed, maxWidth]
  )

  const handleToggle = useCallback(() => {
    setExpanded(expanded => !expanded)
  }, [])

  return (
    <Card {...other} style={{ ...style || {}, marginTop: "16px" }}>
      <FormLayout layout={layout} feedbackLayout="terse">
        <FormGrid
          grid={grid}
          minWidth={minWidth}
          maxWidth={maxWidth}
          minColumns={minColumns}
          maxColumns={maxColumns}
          breakpoints={breakpoints}
          columnGap={columnGap}
          rowGap={rowGap}
          colWrap={colWrap}
          strictAutoFit={strictAutoFit}
          maxRows={expanded ? maxRowsOnCollapsed : Infinity}
        >
          {children}
          {
            !collapsiable && <ButtonsGridColum collapsiable={collapsiable} layout = {layout} expanded={expanded} onToggle={handleToggle} />
          }
        </FormGrid>
        {
          collapsiable && <ButtonsGridColum collapsiable={collapsiable} layout={layout} expanded={expanded} onToggle={handleToggle} />
        }
      </FormLayout>
    </Card>
  )
})
