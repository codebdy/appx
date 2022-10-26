import { TreeSelect } from "antd";
import { useGetCategoryPages } from "../../../hooks/useGetCategoryPages";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
import React, { useCallback } from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useCategories } from "../../../hooks/useCategories";
import { usePagesWithoutCategory } from "../../../hooks/usePagesWithoutCategory";
import { ID } from "~/shared";
const { TreeNode } = TreeSelect;

export const PageSelect = memo((
  props: {
    value?: ID,
    onChange?: (value?: ID) => void,
  }
) => {
  const { value, onChange } = props;
  const categories = useCategories();
  const getCategoryPages = useGetCategoryPages();
  const pagesWithoutCategory = usePagesWithoutCategory();

  const { t } = useTranslation();
  const p = useParseLangMessage();
  const handleChange = useCallback((value?: string) => {
    onChange && onChange(value)
  }, [onChange])

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      placeholder={t("PageSelect.PleaseSelectPage")}
      allowClear={false}
      treeDefaultExpandAll
      value={value}
      onChange={handleChange}
    >
      {
        categories.map(category => {
          return (
            <TreeNode value={category.title} title={p(category.title)} selectable={false}>
              {
                getCategoryPages(category.uuid)?.map(page => {
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
