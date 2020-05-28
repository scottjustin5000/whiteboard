import React  from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarker, faEraser, faBomb } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCircle } from '@fortawesome/free-regular-svg-icons'
import StorageSvg from './icons/storage'
import CloudSvg from './icons/cloud'
import ToolTypes from '../core/tool-types'

const ToolbarComponent = styled.div`
  border: 1px solid #F8F8F8;
  position: fixed;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  width: 64px; 
  background-color:#F8F8F8;
  box-shadow: 0 2px 2px #ccc;
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
  &:active {
    outline: none;
    border: none;
    }
  &:focus {outline:0;}
`

const Toolbar = (props) => {

  const onSelect = (item) => {
    const name = item.name 
    if(item.type) {
      props.onAddShape({shape: name})
    } 
    props.onToolChanged(name)
  }


  return (
    <ToolbarComponent>
      <ToolbarButton selected={props.selected === ToolTypes.MARKER} onClick={() => { onSelect( { name: ToolTypes.MARKER } ) }}>
        <FontAwesomeIcon icon={faMarker} />
      </ToolbarButton>
      <ToolbarButton selected={props.selected === ToolTypes.ERASER} onClick={() => { onSelect( {name: ToolTypes.ERASER } ) }}>
        <FontAwesomeIcon icon={faEraser} />
      </ToolbarButton>
      <ToolbarButton selected={props.selected ===  ToolTypes.RECTANGLE} onClick={() =>{ onSelect({name: ToolTypes.RECTANGLE, type: 'shape' }) }}>
        <FontAwesomeIcon icon={faSquare} />
      </ToolbarButton>
      <ToolbarButton selected={props.selected === ToolTypes.CIRCLE} onClick={() => onSelect({name: ToolTypes.CIRCLE, type: 'shape'})}>
        <FontAwesomeIcon icon={faCircle} />
      </ToolbarButton>
      <ToolbarButton selected={props.selected === ToolTypes.STORAGE} onClick={() => onSelect({ name: ToolTypes.STORAGE, type: 'shape'})}>
        <StorageSvg width={16} height={16} />
      </ToolbarButton>
      <ToolbarButton selected={props.selected === ToolTypes.CLOUD} onClick={() => onSelect({name: ToolTypes.CLOUD, type: 'shape'})}>
        <CloudSvg width={16} height={16} />
      </ToolbarButton>
      <ToolbarButton selected={props.selected === ToolTypes.BOMB} onClick={() => onSelect({ name: ToolTypes.BOMB })}>
      <FontAwesomeIcon icon={faBomb} />
      </ToolbarButton>
    </ToolbarComponent>
  )
}
export default Toolbar
