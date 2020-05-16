import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarker, faEraser } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCircle } from '@fortawesome/free-regular-svg-icons'
import StorageSvg from './icons/storage'
import CloudSvg from './icons/cloud'

const ToolbarComponent = styled.div`
  border: 1px solid #F8F8F8;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  width: 100%; 
  background-color:#F8F8F8;
  box-shadow: 2px 2px 2px 2px #efefefef;
  padding: 6px 8px;
`
const ToolbarButton = styled.button`
  cursor: pointer;
  height: 40px;
  border: none;
  border-radius: 6px;
  background-color: ${props=> props.selected ? '#D6D6D6;' : '#f8f8f8;'} 
  &:hover {
    background-color: #D6D6D6; 
  }
`

const Toolbar = (props) => {

  const [selected, setSelected] = useState('Marker')

  const onSelect = (item) => {
    setSelected(item)
    props.onToolChanged(item)
  }

  return (
    <ToolbarComponent>
      <ToolbarButton selected={selected === 'Marker'} onClick={() => { onSelect('Marker') }}>
        <FontAwesomeIcon icon={faMarker} />
      </ToolbarButton>
      <ToolbarButton selected={selected === 'Eraser'} onClick={() => { onSelect('Eraser') }}>
        <FontAwesomeIcon icon={faEraser} />
      </ToolbarButton>
      <ToolbarButton selected={selected === 'rectangle'} onClick={() => props.onAddShape({shape: 'rectangle'})}>
        <FontAwesomeIcon icon={faSquare} />
      </ToolbarButton>
      <ToolbarButton selected={selected === 'circle'} onClick={() => props.onAddShape({shape: 'circle'})}>
        <FontAwesomeIcon icon={faCircle} />
      </ToolbarButton>
      <ToolbarButton selected={selected === 'db'} onClick={() => props.onAddShape({shape: 'db'})}>
        <StorageSvg width={16} height={16} />
      </ToolbarButton>
      <ToolbarButton selected={selected === 'cloud'} onClick={() => props.onAddShape({shape: 'cloud'})}>
        <CloudSvg width={16} height={16} />
      </ToolbarButton>
    </ToolbarComponent>
  )
}
export default Toolbar
