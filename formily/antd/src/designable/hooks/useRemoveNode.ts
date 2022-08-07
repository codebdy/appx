import { AppendNodeEvent, RemoveNodeEvent, TreeNode } from '@designable/core'
import { useDesigner } from '@designable/react'
import { matchChildComponent, matchComponent } from '../../shared'

export const useRemoveNode = (
  name: string,
  onRemove: (target: TreeNode|TreeNode[]) => void
) => {
  return useDesigner((designer) => {
    return designer.subscribeTo(RemoveNodeEvent, (event) => {
      const { target } = event.data
      onRemove(target)
    })
  })
}
