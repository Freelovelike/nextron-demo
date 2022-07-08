import React, { useContext, useRef } from "react"
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFile,
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineSetting,
} from "react-icons/ai"
import { RiArrowDropDownFill, RiArrowDropRightFill } from "react-icons/ri"
import styled from "styled-components"
import { TreeContext } from "."

export interface TreeItemProps {
  treeChildren?: TreeItemProps[]
  name: string
  id: number
  type: "folder" | "file"
}

export const TreeItem: React.FC<TreeItemProps> = ({
  treeChildren,
  name,
  id,
  type,
}) => {
  const {
    expandedKeys,
    setExpandedKeys,
    currentSetting,
    setCurrentSetting,
    currentEdit,
    setCurrentEdit,
    onDelete,
    onRename,
    setting,
  } = useContext(TreeContext)!
  const isOpen = expandedKeys.includes(id)
  let currentName = useRef<string>(name).current

  const headClick = (): void => {
    const index = expandedKeys.findIndex((item) => item === id)
    index >= 0 ? expandedKeys.splice(index, 1) : expandedKeys.push(id)
    setExpandedKeys([...expandedKeys])
  }
  const rename = async () => {
    onRename?.({ id, type })
  }
  const delFolder = async () => {
    onDelete?.({ id, type })
  }
  return type === "folder" ? (
    <>
      <Folder>
        <span>
          {isOpen ? (
            <RiArrowDropDownFill size={30} />
          ) : (
            <RiArrowDropRightFill size={30} />
          )}
        </span>
        <span>
          {isOpen ? (
            <AiOutlineFolderOpen size={25} />
          ) : (
            <AiOutlineFolder size={25} />
          )}
        </span>
        {currentEdit === id ? (
          <input
            type='text'
            defaultValue={currentName}
            onChange={(e) => (currentName = e.target.value)}
          />
        ) : (
          <FileName onClick={headClick}>{name}</FileName>
        )}

        {currentEdit === id ? (
          <div>
            <Check onClick={rename} />
            <Close onClick={() => setCurrentEdit(-1)} />
          </div>
        ) : currentSetting === id ? (
          <Settings>
            <Eidt size={20} onClick={() => setCurrentEdit(id)} />
            <Delect size={20} onClick={delFolder} />
            <Close size={20} onClick={() => setCurrentSetting(-1)} />
          </Settings>
        ) : (
          <Setting
            onClick={() => {
              setCurrentSetting(id)
              setCurrentEdit(-1)
            }}
          />
        )}
      </Folder>

      {isOpen && (
        <ul>
          {treeChildren?.map((childProp) => {
            return <TreeItem key={childProp.id} {...childProp} />
          })}
        </ul>
      )}
    </>
  ) : (
    <div style={{ display: "flex" }}>
      <span>
        <AiOutlineFile />
      </span>
      <span>{name}</span>
      <span>{setting?.({ id })}</span>
    </div>
  )
}
const Check = styled(AiOutlineCheck)`
  :hover {
    color: #509edd;
  }
`
const Setting = styled(AiOutlineSetting)`
  :hover {
    color: #509edd;
  }
`
const Eidt = styled(AiOutlineEdit)`
  :hover {
    color: #509edd;
  }
`
const Delect = styled(AiOutlineDelete)`
  :hover {
    color: #509edd;
  }
`
const Close = styled(AiOutlineClose)`
  :hover {
    color: #509edd;
  }
`
const FileName = styled.div`
  :hover {
    color: #509edd;
  }
  margin: 0 5px;
`
const Folder = styled.div`
  display: flex;
  align-items: center;
`

const Settings = styled.span`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
