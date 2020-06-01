import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Resizer = styled.div`
position: absolute;
right: 0px;
bottom: 0px;
width: 20px;
height: 20px;
cursor: nwse-resize;
z-index: 600;
`

const SquareBase = styled.div`
width: 100px; 
height:100px;
resize: both;
cursor: grab;
position: absolute;
top: 100px; 
left: 100px;
`
const Mutable = (props)=> {
  const element = useRef()

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
      console.log('YEAH>>>', props)
      if(props.onResize){
        console.log('IN HERE!!!!!', w, h)
        props.onResize({
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
    console.log(x,y)
    // Add follow listener if not resizing
    if (x > 12 && y > 12) {
      console.log('ADDDIT')
      document.addEventListener("mousemove", follow)
      document.addEventListener("mouseup", unfollow)
      e.preventDefault()
    } else {
      document.addEventListener("mousemove", resize)
      document.addEventListener("mouseup", unresize)
      e.preventDefault()
    }
  
  }

 return (
 <div
    style={{
      width: props.width || '100px',
      height: props.height || '100px',
      top: props.top || '100px',
      left: props.left || '100px',
      position: 'absolute',
      resize: 'both',
      cursor: 'grab'
    }}
    ref={element}
    onMouseDown={onMove}
    onMouseLeave={props.onMouseLeave}
    onMouseOver={props.onMouseOver}
    onMouseLeave={props.onMouseLeave}>
    {props.children}
    <div 
    onMouseDown={onMove}
    style={{
      position: 'absolute',
      right: '0px',
      bottom: '0px',
      width: '20px',
      height: '20px',
      cursor: 'nwse-resize',
      zIndex: 600
    }}/>
    {/* <Resizer onMouseDown={onMove} /> */}
</div>)
}

Mutable.propTypes = {
 onResize: PropTypes.func,
 onMouseDown: PropTypes.func,
 onMouseLeave: PropTypes.func,
 onMouseOver: PropTypes.func,
}

export default Mutable