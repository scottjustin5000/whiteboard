import React, { useState, useRef, Fragment }  from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarker, faEraser, faBomb, faPalette } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCircle, faHandRock } from '@fortawesome/free-regular-svg-icons'
import StorageSvg from './icons/storage'
import CloudSvg from './icons/cloud'
import ToolTypes from '../core/tool-types'
import Palette from './color-palette'
import Slider from './slider'

import useOnClickOutside from '../hooks/use-on-click-outside'

const ToolbarComponent = styled.div`
  border: 1px solid #F0F0F0;
  position: fixed;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  width: 56px; 
  background-color:#F0F0F0;
  box-shadow: 0 2px 2px #ccc;
  padding: 6px 8px;
`
const ToolbarButton = styled.button`
  cursor: pointer;
  height: 40px;
  border: none;
  border-radius: 6px;
  background-color: ${props=> props.selected ? '#D6D6D6;' : '#f0f0f0;'} 
  &:hover {
    background-color: #D6D6D6; 
  }
  &:active {
    outline: none;
    border: none;
    }
  &:focus {outline:0;}
`

const LineWrapper = styled.div`
 display: flex;
 justify-content: center;
`
const LineDisplay = styled.div`
display: flex;
width: 22px; 
justify-content: center; 
align-items:center;  
height: 22px;
border: 3px solid ${props=> props.color};
text-align: center;
vertical-align: middle; 
border-radius: 50%;
`

const Toolbar = (props) => {

  const [showPal, setShowPal] = useState(false)
  const [showSlider, setShowSlider] = useState(false)
  const ref = useRef()

  useOnClickOutside(ref, () => {
    if(showPal) {
      setShowPal(false)
    }
    if(showSlider) {
      setShowSlider(false)
    }
  })

  const onSelect = (item) => {
    const name = item.name 
    if(item.type) {
      props.onAddShape({shape: name, color:props.color, lineWidth: props.lineWidth})
    } 
    props.onToolChanged(name)
  }

  const onPaletteSelect =() =>{
    if(showSlider) setShowSlider(false)
    setShowPal(!showPal)
  }

  const selectLineSize = ()=> {
    if(showPal) setShowPal(false)
    setShowSlider(!showSlider)
  }


  return (
    <Fragment>
      <div ref={ref}>
        <Palette 
          onSelect={props.onColorChange} 
          color={props.color} 
          show={showPal} />
        <Slider
          color={props.color}
          show={showSlider}
          val={props.lineWidth}
          max={9}
          onChange={value => props.onWidthChange(value)} />
      </div>
    <ToolbarComponent>
      <ToolbarButton onClick={selectLineSize}>
        <LineWrapper>
        <LineDisplay color={props.color}>{props.lineWidth}</LineDisplay>
        </LineWrapper>
      </ToolbarButton>
       <ToolbarButton onClick={onPaletteSelect}>
        <FontAwesomeIcon color={props.color} icon={faPalette} />
      </ToolbarButton>
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
      <ToolbarButton selected={props.selected === ToolTypes.HAND} onClick={() => onSelect({ name: ToolTypes.HAND })}>
      <FontAwesomeIcon icon={faHandRock} />
      </ToolbarButton>
    </ToolbarComponent>
    </Fragment>
  )
}
export default Toolbar
