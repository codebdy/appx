import { ITreeNode } from '@designable/core'
import { clone } from '@designable/shared'

export function transForm(node: ITreeNode): ITreeNode {
  const newNode = {
    props: clone(node.props),
    children: node?.children?.map(child => transForm(child))
  }
  return newNode;
}