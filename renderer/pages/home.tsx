import { ipcRenderer } from "electron"
import { NextPage } from "next"

import Head from "next/head"
import Router from "next/router"
import { useEffect } from "react"
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai"
import styled from "styled-components"
import { Tree } from "../components/Tree"

interface test1Props {}

const test1: NextPage<test1Props> = () => {
  useEffect(() => {
    console.log(Router.pathname)
  }, [])
  return (
    <>
      <Head>
        <title>文件夹树</title>
      </Head>

      <Tree
        treeData={[
          {
            treeChildren: [
              {
                treeChildren: [
                  {
                    id: 1,
                    name: "文件",
                    type: "file",
                  },
                ],
                id: 2,
                name: "文件夹2",
                type: "folder",
              },
            ],
            id: 1,
            name: "文件夹1",
            type: "folder",
          },
        ]}
        setting={({ id }) => (
          <div style={{ display: "flex" }}>
            <View
              onClick={() => {
                ipcRenderer.postMessage("newview", { path: "test" })
              }}
            />
            <Edit
              onClick={() => {
                Router.push("test")
              }}
            />
          </div>
        )}
      ></Tree>
    </>
  )
}

export default test1
const UploadPreview = styled.div``

const View = styled(AiOutlineEye)`
  :hover {
    color: skyblue;
  }
`
const Edit = styled(AiOutlineEdit)`
  :hover {
    color: skyblue;
  }
`
