import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Circle from './circle'
import Square from './square'
import Storage from './storage'
import Cloud from './cloud'
import { ContextMenu, ContextButton }  from './styles'
import Mutable from '../mutable'
import useDebounce from '../../hooks/use-debounce'
import useOnClickOutside from '../../hooks/use-on-click-outside'
import ToolTypes from '../../core/tool-types'

const Resizable = (props)=> {
  
  const [overflow, setOverflow] = useState('auto')
  const [svgDims, setSvgDims] = useState({ w:64, h:64 })
  const [visible, setVisible] = useState(false)
  let debouncedSvgDims = useDebounce(svgDims, 500)
  const ref = useRef()

  useOnClickOutside(ref, () => {
    setVisible(false)
  })


  const Shape = (shape, color, lineWidth, index) => {
    const prps = {
      color,
      index,
      lineWidth,
      overflow: overflow
    }
    const svgProps = {...prps, ...{
      width: svgDims.w,
      height: svgDims.h,
      scale: props.scale
    }} 

    switch(shape) {
      case ToolTypes.RECTANGLE:
        return <Square {...prps} />
      case ToolTypes.CIRCLE:
        return <Circle {...prps} />
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
    if(!visible) return
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
      {Shape(props.shape, props.color, props.lineWidth, props.index)}
      <ContextMenu visible={visible}> 
      <ContextButton ref={ref} onClick={deleteShape}> <FontAwesomeIcon icon={faTrash} /> Delete </ContextButton>
      </ContextMenu>
    </Mutable>
  )
}
export default Resizable