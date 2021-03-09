import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { Base, Resizer } from './styles'

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

      props.onMove({
        index: props.index,
        top: e.pageY + y - h,
        left: e.pageX + x - w
      })
    }
    
    const resize = (e) => {
  
      const w = (e.pageX - l + x)
      const h = (e.pageY - t + y)
        props.onResize({
          index: props.index,
          w,
          h
        })
    }
    const unresize = (e) => {

      document.removeEventListener('mousemove', resize);
      document.removeEventListener("mouseup", unresize);
      e.preventDefault();
    }
    
    const unfollow = (e) => {
      document.removeEventListener('mousemove', follow)
      document.removeEventListener("mouseup", unfollow)
      e.preventDefault()
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