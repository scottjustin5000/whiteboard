import React, { useState, useEffect, useRef } from 'react'
import Circle from './circle'
import Square from './square'
import Storage from './storage'
import Cloud from './cloud'

import useDebounce from '../../hooks/use-debounce'

const Resizable = (props)=> {
  const [display, setDisplay] = useState('none')
  const [svgDims, setSvgDims] = useState({ w:48, h:48 })
  const isSvg = props.shape === 'db' || props.shape === 'cloud'
  const element = useRef()
  let debouncedSvgDims = useDebounce(svgDims, 500)

  const getShape = () => {
    switch(props.shape) {
      case 'circle':
        return Circle
      case 'rectangle':
        return Square
      case 'db':
        return Storage
      case 'cloud':
        return Cloud
    }
  }

  const onMouseOver = () => {
    setDisplay('inline')
  }

  const onMouseLeave = () => {
    setDisplay('none')
  }

  const move = (e)  =>{
    // Elements initial width and height
    let elem = element.current
    const h = elem.offsetHeight;
    const w = elem.offsetWidth;
    // Elements original position
    const t = elem.offsetTop;
    const l = elem.offsetLeft;
    // Click position within element
    const y = t + h - e.pageY;
    const x = l + w - e.pageX;
    
    // const hasMoved = () =>
    //   !(t === elem.offsetTop && l === elem.offsetLeft);
    
    // const hasResized = () =>
    //   !(w === elem.offsetWidth && h === elem.offsetHeight);
    
    const follow = (e) => {
      // Set top/left of element according to mouse position
      elem.style.top = `${e.pageY + y - h}px`;
      elem.style.left = `${e.pageX + x - w}px`;
    }
    
    const resize = (e) => {
      // Set width/height of element according to mouse position
      const w = (e.pageX - l + x)
      const h = (e.pageY - t + y)
      elem.style.width = `${w}px`;
      elem.style.height = `${h}px`;
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
      // Emit events according to interaction
      // if (hasResized(e)) this.dispatchEvent(new Event('resized'));
      // else this.dispatchEvent(new Event('clicked'));
      e.preventDefault();
    }
    
    const unfollow = (e) => {
      // Remove listeners that were bound to document
      document.removeEventListener('mousemove', follow);
      document.removeEventListener("mouseup", unfollow);
      // Emit events according to interaction
      // if (hasMoved(e)) this.dispatchEvent(new Event('moved'));
      // else this.dispatchEvent(new Event('clicked'));
      e.preventDefault();
    }
    
    // Add follow listener if not resizing
    if (x > 12 && y > 12) {
      document.addEventListener("mousemove", follow);
      document.addEventListener("mouseup", unfollow);
      e.preventDefault()
    } else {
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", unresize);
      e.preventDefault()
    }
  
  }
   const Comp = getShape()
    return (
    <Comp
      ref = {element}
      width={svgDims.w}
      height={svgDims.h}
      display={display}
      onMouseDown={move}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver} {...props}/>
  )
}

export default Resizable