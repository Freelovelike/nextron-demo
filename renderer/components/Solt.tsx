import React, { ReactNode } from "react"
import styled from "styled-components"

interface SoltProps {
  Setting: ({ id }: { id: number }) => ReactNode
}

export const Solt: React.FC<SoltProps> = ({ Setting }) => {
  return (
    <Main>
      <Left>{Setting({ id: 1 })}</Left>
      <Right />
    </Main>
  )
}

const Main = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid #000;
  display: flex;
  flex: 1;
`
const Left = styled.div`
  width: 50%;
  background: yellow;
`
const Right = styled.div`
  width: 50%;
  background: red;
`
