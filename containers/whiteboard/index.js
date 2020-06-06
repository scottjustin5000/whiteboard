import React, { useState } from 'react'
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

  const [shapes, setShapes] = useState([])

  const [color, setColor] = useState('#000')

  const [lineWidth, setLineWidth] = useState(2)

  const onClearShapes = () => {
    setSelectedTool('')
    setShapes([])
  }

  const onRemoveShape = (index) => {
    setShapes(prev => prev.filter((f, i) => { if (i !== index) return f }))
  }

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
             onAddShape={(shape) => setShapes(prev => prev.concat(shape))} />
        </ToolbarWrapper>
      </InnerWrapper>
      <Board
        lineWidth={lineWidth}
        color={color}
        clearShapes={onClearShapes}
        selectedTool={selectedTool}
        shapes={shapes}
        onRemoveShape={onRemoveShape} />
    </IndexWrapper>)
}

export default Index