import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Circle from './circle'
import Square from './square'
import Storage from './storage'
import Cloud from './cloud'
import Mutable from '../mutable'
import useDebounce from '../../hooks/use-debounce'
import useOnClickOutside from '../../hooks/use-on-click-outside'
import ToolTypes from '../../core/tool-types'


//move into styles???
//  margin-top: ${props => props.visible ? `-${props.top}px` : null};
import styled from 'styled-components'
const ContextMenu = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  margin-top: -5px;
  margin-left: -5px;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  z-index: 100;
  cursor: default;
  transition: 100ms;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'scale(1)' : 'scale(0.9)'};`

  //  background-color:  ${props=> props.selected ? '#D6D6D6;' : '#f0f0f0;'} 
  const ToolbarButton = styled.button`
    cursor: pointer;
    height: 40px;
    border: none;
    border-radius: 6px;
    width: 100%;
    background-color: #f0f0f0;
    &:hover {
      background-color: #D6D6D6; 
    }
    &:active {
      outline: none;
      border: none;
      }
    &:focus {outline:0;}
`

const Resizable = (props)=> {
  
  const [overflow, setOverflow] = useState('auto')
  const [svgDims, setSvgDims] = useState({ w:64, h:64 })
  const [visible, setVisible] = useState(false)
  let debouncedSvgDims = useDebounce(svgDims, 500)
  const ref = useRef()

  useOnClickOutside(ref, () => {
    setVisible(false)
  })


  const Shape = (shape, onDelete, color, lineWidth, index) => {
    const props = {
      color,
      index,
      lineWidth,
      overflow: overflow,
      onDelete: onDelete
    }
    const svgProps = {...props, ...{
      width: svgDims.w,
      height: svgDims.h
    }} 

    switch(shape) {
      case ToolTypes.RECTANGLE:
        return <Square {...props} />
      case ToolTypes.CIRCLE:
        return <Circle {...props} />
      case ToolTypes.STORAGE:
        return <Storage {...svgProps} />
      case ToolTypes.CLOUD:
        return <Cloud {...svgProps} />
    }
  }

  const onMouseOver = () => {
    setOverflow('visible')
  }

  const onMouseLeave = () => {
    setOverflow('auto')
  }

  const onResize =(e) => {
    if(props.onResize) {
      props.onResize(e)
    }
    if(!debouncedSvgDims) return
    const {w,h} = e
    setSvgDims({
      w,
      h
    })
  }

  const onContextMenu = (e) => {
    e.preventDefault()
    setVisible(true)
  }

  const deleteShape = () => {
    setVisible(false)
    props.onDelete(props.index)
  }

    return (
    <Mutable
      onContextMenu={onContextMenu}
      scale={props.scale}
      width={props.width}
      height={props.height}
      top={props.top}
      left={props.left}
      index={props.index}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onMove={props.onMove}
      onResize={onResize}>
      {Shape(props.shape, props.onDelete, props.color, props.lineWidth, props.index)}
      <ContextMenu visible={visible}> 
      <ToolbarButton ref={ref} onClick={deleteShape}> <FontAwesomeIcon icon={faTrash} /> Delete </ToolbarButton>
      </ContextMenu>
      </Mutable>
  )
}
export default Resizable