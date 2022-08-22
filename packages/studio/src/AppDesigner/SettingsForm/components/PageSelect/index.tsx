import { Select, TreeSelect } from "antd";
import { useGetCategoryPages } from "../../../../AppDesigner/hooks/useGetCategoryPages";
import { useParseLangMessage } from "../../../../hooks/useParseLangMessage";
import React from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useCategories } from "../../../hooks/useCategories";
import { usePages } from "../../../hooks/usePages";
import { useGetPage } from "../../../hooks/useGetPage";
const { Option } = Select;
const { TreeNode } = TreeSelect;

export const PageSelect = memo((
  props: {
    pageUuid?: string,
    onChange?: (pageUuid?: string) => void,
  }
) => {
  const {pageUuid, onChange} = props;
  const categories = useCategories();
  const pages = usePages();
  const getCategoryPages = useGetCategoryPages();
  const getPge = useGetPage(pages);

  const { t } = useTranslation();
  const p = useParseLangMessage();

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      placeholder={t("PageSelect.PleaseSelectPage")}
      allowClear={false}
      treeDefaultExpandAll
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
