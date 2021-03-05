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

const Base = styled.div.attrs({
  style: ({width, height, top, left }) => ({
    width,
    height,
    top,
    left
  }),
})`resize: both;
   cursor: grab;
   position: absolute;`

const Mutable =  (props)=> {

  const element = useRef()

  const onMove = (e)  =>{
    let elem = element.current
    const h = elem.offsetHeight
    const w = elem.offsetWidth

    const t = elem.offsetTop
    const l = elem.offsetLeft

    const y = t + h - e.pageY
    const x = l + w - e.pageX
    
    const follow = (e) => {

      // elem.style.top = `${e.pageY + y - h}px`
      // elem.style.left = `${e.pageX + x - w}px`
      props.onMove({
        index: props.index,
        top: e.pageY + y - h,
        left: e.pageX + x - w
      })
    }
    
    const resize = (e) => {
  
      const w = (e.pageX - l + x)
      const h = (e.pageY - t + y)
      // elem.style.width = `${w}px`
      // elem.style.height = `${h}px`
      if(props.onResize){
        props.onResize({
          index: props.index,
          w,
          h
        })
      }
    }
    const unresize = (e) => {

      document.removeEventListener('mousemove', resize);
      document.removeEventListener("mouseup", unresize);
      e.preventDefault();
    }
    
    const unfollow = (e) => {

      document.removeEventListener('mousemove', follow)
      document.removeEventListener("mouseup", unfollow)
      e.preventDefault();
    }

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
 return (
 <Base
    width={props.width}
    height={props.height}
    top={props.top}
    left={props.left}
    ref={element}
    onContextMenu={props.onContextMenu}
    onMouseDown={onMove}
    onMouseLeave={props.onMouseLeave}
    onMouseOver={props.onMouseOver}
    onMouseLeave={props.onMouseLeave}>
    {props.children}
    <Resizer onMouseDown={onMove} />
</Base>)
}

Mutable.propTypes = {
 onResize: PropTypes.func,
 onMouseDown: PropTypes.func,
 onMouseLeave: PropTypes.func,
 onMouseOver: PropTypes.func,
}

export default Mutable