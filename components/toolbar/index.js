import React, { useState, useRef, Fragment }  from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarker, faEraser, faBomb, faPalette } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCircle, faHandRock } from '@fortawesome/free-regular-svg-icons'
import StorageSvg from '../icons/storage'
import CloudSvg from '../icons/cloud'
import ToolTypes from '../../core/tool-types'
import Palette from '../color-palette'
import Slider from '../slider'
import {
  ToolbarComponent,
  ToolbarButton,
  LineWrapper,
  LineDisplay
} from './styles'

import useOnClickOutside from '../../hooks/use-on-click-outside'



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

Toolbar.propTypes = {
  selected: PropTypes.string,
  lineWidth: PropTypes.number,
  color: PropTypes.string,
  onAddShape: PropTypes.func,
  onWidthChange: PropTypes.func,
  onToolChanged: PropTypes.func
 }
export default Toolbar
