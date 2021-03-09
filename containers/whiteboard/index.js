import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Board from '../../components/whiteboard'
import Toolbar from '../../components/toolbar'

const IndexWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`
const InnerWrapper = styled.div`
  display: flex;
  justify-content: column;
`
const ToolbarWrapper = styled.div`
  margin: 20;
`
const Index = () => {
  const [selectedTool, setSelectedTool] = useState('')
  const canvas = useRef()
  const [color, setColor] = useState('#000')
  const [lineWidth, setLineWidth] = useState(2)

  return (
    <IndexWrapper>
      <InnerWrapper>
        <ToolbarWrapper>
          <Toolbar 
            color={color}
            lineWidth={lineWidth}
             onColorChange = {(color) => setColor(color)}
             onWidthChange={(w) => setLineWidth(w)}
             selected={selectedTool} 
             onToolChanged={setSelectedTool} 
             onAddShape={(shape) => canvas.current.addShape(shape)} />
        </ToolbarWrapper>
      </InnerWrapper>
      <Board
        ref={canvas} 
        lineWidth={lineWidth}
        color={color}
        selectedTool={selectedTool}
         />
    </IndexWrapper>)
}

export default Index