import React, { useState, useEffect, useRef } from 'react'
import Circle from './circle'
import Square from './square'
import Storage from './storage'
import Cloud from './cloud'

import useDebounce from '../../hooks/use-debounce'
import ToolTypes from '../../core/tool-types'

const Resizable = (props)=> {
  const [overflow, setOverflow] = useState('auto')
  const [svgDims, setSvgDims] = useState({ w:48, h:48 })
  const isSvg = props.shape === ToolTypes.STORAGE || props.shape === ToolTypes.CLOUD
  const element = useRef()
  let debouncedSvgDims = useDebounce(svgDims, 500)

  const getShape = () => {
    switch(props.shape) {
      case ToolTypes.CIRCLE:
        return Circle
      case ToolTypes.RECTANGLE:
        return Square
      case ToolTypes.STORAGE:
        return Storage
      case ToolTypes.CLOUD:
        return Cloud
    }
  }

  const onMouseOver = () => {
    setOverflow('visible')
  }

  const onMouseLeave = () => {
    setOverflow('auto')
  }

  const onMove = (e)  =>{
    // Elements initial width and height
    let elem = element.current
    const h = elem.offsetHeight
    const w = elem.offsetWidth
    // Elements original position
    const t = elem.offsetTop
    const l = elem.offsetLeft
    // Click position within element
    const y = t + h - e.pageY
    const x = l + w - e.pageX
    
    const follow = (e) => {
      // Set top/left of element according to mouse position
      elem.style.top = `${e.pageY + y - h}px`
      elem.style.left = `${e.pageX + x - w}px`
    }
    
    const resize = (e) => {
      // Set width/height of element according to mouse position
      const w = (e.pageX - l + x)
      const h = (e.pageY - t + y)
      elem.style.width = `${w}px`
      elem.style.height = `${h}px`
      if(isSvg && debouncedSvgDims){
        setSvgDims({
          w,
          h
        })
      }
    }
    const unresize = (e) => {
      // Remove listeners that were bound to document
      document.removeEventListener('mousemove', resize);
      document.removeEventListener("mouseup", unresize);
      e.preventDefault();
    }
    
    const unfollow = (e) => {
      // Remove listeners that were bound to document
      document.removeEventListener('mousemove', follow)
      document.removeEventListener("mouseup", unfollow)
      e.preventDefault();
    }
    
    // Add follow listener if not resizing
    if (x > 12 && y > 12) {
      document.addEventListener("mousemove", follow)
      document.addEventListener("mouseup", unfollow)
      e.preventDefault()
    } else {
      document.addEventListener("mousemove", resize)
      document.addEventListener("mouseup", unresize)
      e.preventDefault()
    }
  
  }
   const Comp = getShape()
    return (
    <Comp
      ref = {element}
      width={svgDims.w}
      height={svgDims.h}
      overflow={overflow}
      onMouseDown={onMove}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver} {...props}/>
  )
}

export default Resizable