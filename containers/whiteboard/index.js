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

  return (
    <IndexWrapper>
      <InnerWrapper>
        <ToolbarWrapper>
          <Toolbar 
             selected={selectedTool} 
             onToolChanged={setSelectedTool} onAddShape={(shape) => setShapes(prev => prev.concat(shape))} />
        </ToolbarWrapper>
      </InnerWrapper>
      <Board
        selectedTool={selectedTool}
        shapes={shapes}
        onRemoveShape={(index) => setShapes(prev => prev.filter((f, i) => { if (i !== index) return f }))} />
    </IndexWrapper>)
}

export default Index