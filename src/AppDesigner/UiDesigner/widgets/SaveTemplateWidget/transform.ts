import { ITreeNode } from '@designable/core'
import { clone } from '@designable/shared'

export function transForm(node: ITreeNode): ITreeNode {
  const newNode = {
    componentName: node.componentName,
    props: clone(node.props),
    children: node?.children?.map(child => transForm(child))
  }

  if (newNode?.props?.["x-field-source"]) {
    delete newNode?.props?.["x-field-source"]
  }

  if (newNode?.props?.["x-auth"]) {
    delete newNode?.props?.["x-auth"]
  }

  if (newNode?.props?.["x-component-props"]?.["dataBind"]) {
    delete newNode?.props?.["x-component-props"]?.["dataBind"]
  }
  return newNode;
}