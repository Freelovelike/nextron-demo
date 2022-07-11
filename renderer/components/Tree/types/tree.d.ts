import { TreeItemProps } from "../treeItem"

export interface TreeRefType {
  test: number
}
export type TreeNode = {
  id: number
  name: string
  children: TreeNode[] | []
}
export type onDeleteType = ({
  id,
  type,
}: {
  id: number
  type: "folder" | "file"
}) => void
export type onRenameType = onDeleteType
export interface TreeProps {
  treeData: TreeItemProps[]
  onDelete?: onDeleteType
  onRename?: onRenameType
  setting?: ({ id }: { id: number }) => ReactNode
}
export interface TreeContextType {
  setting?: ({ id }: { id: number }) => ReactNode
  expandedKeys: number[]
  setExpandedKeys: Dispatch<SetStateAction<number[]>>
  currentSetting: number | null
  setCurrentSetting: Dispatch<SetStateAction<number>>
  currentEdit: number | null
  setCurrentEdit: Dispatch<SetStateAction<number | null>>
  onDelete?: onDeleteType
  onRename?: onRenameType
}
