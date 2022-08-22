import { TreeSelect } from "antd";
import { useGetCategoryPages } from "../../../../AppDesigner/hooks/useGetCategoryPages";
import { useParseLangMessage } from "../../../../hooks/useParseLangMessage";
import React from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useCategories } from "../../../hooks/useCategories";
import { usePagesWithoutCategory } from "../../../hooks/usePagesWithoutCategory";
import { ID } from "../../../../shared";
const { TreeNode } = TreeSelect;

export const PageSelect = memo((
  props: {
    value?: ID,
    onChange?: (pageId?: ID) => void,
  }
) => {
  const { value, onChange } = props;
  const categories = useCategories();
  const getCategoryPages = useGetCategoryPages();
  const pagesWithoutCategory = usePagesWithoutCategory();

  const { t } = useTranslation();
  const p = useParseLangMessage();

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      placeholder={t("PageSelect.PleaseSelectPage")}
      allowClear={false}
      treeDefaultExpandAll
      value={value}
      onChange={onChange}
    >
      {
        categories.map(category => {
          return (
            <TreeNode value={category.title} title={p(category.title)} selectable={false}>
              {
                getCategoryPages(category.id)?.map(page => {
                  return (
                    <TreeNode value={page.id} title={p(page.title)} />
                  )
                })
              }
            </TreeNode>
          )
        })
      }
      {
        pagesWithoutCategory?.map(page => {
          return (
            <TreeNode value={page.id} title={p(page.title)} />
          )
        })
      }
    </TreeSelect>
  )
})
