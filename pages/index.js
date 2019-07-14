import React, { useState } from 'react'
import styled from 'styled-components'
import Whiteboard from '../components/whiteboard'
import Toolbar from '../components/toolbar'

const IndexWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const InnerWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: column;
`
const ToolbarWrapper = styled.div`
  width: 90%;
`
const Index = () => {
  const [selectedTool, setSelectedTool] = useState('Marker')

  const [shapes, setShapes] = useState([])

  return (
    <IndexWrapper>
      <InnerWrapper>
        <ToolbarWrapper>
          <Toolbar onToolChanged={setSelectedTool} onAddShape={(shape) => setShapes(prev => prev.concat(shape))} />
        </ToolbarWrapper>
      </InnerWrapper>
      <Whiteboard
        selectedTool={selectedTool}
        shapes={shapes}
        onRemoveShape={(index) => setShapes(prev => prev.filter((f, i) => { if (i !== index) return f }))} />
    </IndexWrapper>)
}

export default Index
