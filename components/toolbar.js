import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarker, faEraser } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCircle } from '@fortawesome/free-regular-svg-icons'

const ToolbarComponent = styled.div`
  border: 1px solid;
  display: flex;
  border-radius: 3px;
  width: 100%; 
  background-color:#F8F8F8;
  box-shadow: 2px 2px 2px 2px #efefefef;
  padding: 6px 8px;
`
const ToolbarButton = styled.button`
  cursor: pointer;
`

const Toolbar = (props) => {
  return (
    <ToolbarComponent>
      <ToolbarButton onClick={() => { props.onToolChanged('Marker') }}>
        <FontAwesomeIcon icon={faMarker} />
      </ToolbarButton>
      <ToolbarButton onClick={() => { props.onToolChanged('Eraser') }}>
        <FontAwesomeIcon icon={faEraser} />
      </ToolbarButton>
      <ToolbarButton onClick={() => props.onAddShape({shape: 'rectangle'})}>
        <FontAwesomeIcon icon={faSquare} />
      </ToolbarButton>
      <ToolbarButton onClick={() => props.onAddShape({shape: 'circle'})}>
        <FontAwesomeIcon icon={faCircle} />
      </ToolbarButton>
    </ToolbarComponent>
  )
}
export default Toolbar
