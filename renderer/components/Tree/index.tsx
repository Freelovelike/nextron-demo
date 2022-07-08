import {
  createContext,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from "react"
import { TreeItem } from "./treeItem"
import { TreeContextType, TreeProps, TreeRefType } from "./types/tree"

export const TreeContext = createContext<TreeContextType | null>(null)
const TreeForWordRef: ForwardRefRenderFunction<TreeRefType, TreeProps> = (
  { treeData, onDelete, onRename, setting },
  ref
) => {
  const [expandedKeys, setExpandedKeys] = useState<number[]>([])
  const [currentSetting, setCurrentSetting] = useState<number>(-1)
  const [currentEdit, setCurrentEdit] = useState<number | null>(null)
  useImperativeHandle(ref, () => ({
    test: 1,
  }))

  return (
    <TreeContext.Provider
      value={{
        expandedKeys,
        setExpandedKeys,
        currentSetting,
        setCurrentSetting,
        currentEdit,
        setCurrentEdit,
        onDelete,
        onRename,
        setting,
      }}
    >
      {treeData.map((props) => {
        return <TreeItem key={props.id} {...props} />
      })}
    </TreeContext.Provider>
  )
}

export const Tree = forwardRef(TreeForWordRef)
