import React, { useState, useEffect } from 'react'
import Circle from './circle'
import Square from './square'
import Storage from './storage'
import Cloud from './cloud'
import Mutable from '../mutable'
import useDebounce from '../../hooks/use-debounce'
import ToolTypes from '../../core/tool-types'

const Resizable = (props)=> {
  
  const [overflow, setOverflow] = useState('auto')
  const [svgDims, setSvgDims] = useState({ w:64, h:64 })
  let debouncedSvgDims = useDebounce(svgDims, 500)

  const Shape = (shape, onDelete, index) => {
    const props = {
      index,
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
    console.log('DOH')
    setOverflow('visible')
  }

  const onMouseLeave = () => {
    setOverflow('auto')
  }

  const onResize =(e) => {
    if(!debouncedSvgDims) return
    const {w,h} = e
    setSvgDims({
      w,
      h
    })
  }
    return (
      <Mutable 
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onResize={onResize}>
      {Shape(props.shape, props.onDelete, props.index)}
      </Mutable>
  )
}
export default Resizable