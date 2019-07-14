import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const Circle = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  width: 100px; 
  height:100px;
  resize: both;
  cursor: grab;
  overflow: ${props => props.overflow ? props.overflow : 'auto'};
  position: absolute;
  top: 100px; 
  left: 100px;
`
const CircleDragger = styled.div`
width: 100%;
height:100%;
border: 1px solid #000;
border-radius: 50%;
box-sizing: border-box;
cursor: grab
`
const Resizer = styled.div`
position: absolute;
right: 0px;
bottom: 0px;
width: 20px;
height: 20px;
cursor: nwse-resize;
`

const Closer = styled.div`
position: absolute;
right: 0px;
top: -5px;
width: 20px;
height: 20px;
cursor: pointer;
`

const Square = styled.div`
border: 1px solid black;
width: 100px; 
height:100px;
overflow: ${props => props.overflow ? props.overflow : 'auto'};
resize: both;
cursor: grab;
position: absolute;
top: 100px; 
left: 100px;
`
const SquareDragger = styled.div`
width: 100%;
height:100%;
border: 1px solid #000;
box-sizing: border-box;
cursor: grab
`
const SquareCloser = styled.div`
position: absolute;
right: 0px;
top: -18px;
width: 20px;
height: 20px;
cursor: pointer;
`

const Resizeable = (props) => {
  const [overflow, setOverflow] = useState('auto')

  // const [shapes, setShapes] = useState([])
  const element = useRef()

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', stopResize)
    }
  }, [])

  let minimumSize = 20
  let originalWidth = 0
  let originalHeight = 0
  // let originalX = 0
  // let originalY = 0
  let originalMouseX = 0
  let originalMouseY = 0

  let mouseDown = false
  let pos1 = 0
  let pos2 = 0
  let pos3 = 0
  let pos4 = 0

  const initResize = (e) => {
    /* global getComputedStyle:true */
    /* eslint no-undef: "error" */
    originalWidth = parseFloat(getComputedStyle(element.current, null).getPropertyValue('width').replace('px', ''))
    originalHeight = parseFloat(getComputedStyle(element.current, null).getPropertyValue('height').replace('px', ''))
    // originalX = element.current.getBoundingClientRect().left
    // originalY = element.current.getBoundingClientRect().top
    originalMouseX = e.pageX
    originalMouseY = e.pageY

    window.addEventListener('mousemove', resize)
    window.addEventListener('mouseup', stopResize)
  }

  const onMouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const c = e.target.classList
    mouseDown = true
    if (c.contains('resizer')) {
      return initResize(e)
    } else if (c.contains('dragger')) {
      return initDrag(e)
    }
  }

  const onMouseMove = (e) => {
    const c = e.target.classList
    if (mouseDown && c.contains('dragger')) {
      elementDrag(e)
    }
  }

  const onMouseOver = (e) => {
    const c = e.target.classList
    if (c.contains('closer')) {
      setOverflow('visible')
    }
  }

  const onMouseLeave = (e) => {
    const c = e.target.classList
    if (c.contains('closer')) {
      setOverflow('auto')
    }
  }

  const resize = (e) => {
    if (!e.target.classList.contains('resizer')) return

    const width = originalWidth + (e.pageX - originalMouseX)
    const height = originalHeight + (e.pageY - originalMouseY)

    if (width > minimumSize) {
      element.current.style.width = width + 'px'
    }
    if (height > minimumSize) {
      element.current.style.height = height + 'px'
    }
  }

  const stopResize = () => {
    mouseDown = false
    window.removeEventListener('mousemove', resize)
  }

  const initDrag = (e) => {
    pos3 = e.clientX
    pos4 = e.clientY
    window.addEventListener('mouseup', stopResize)
  }

  const elementDrag = (e) => {
    if (!e.target.classList.contains('dragger')) return
    if (!mouseDown) return

    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY

    element.current.style.top = (element.current.offsetTop - pos2) + 'px'
    element.current.style.left = (element.current.offsetLeft - pos1) + 'px'
  }

  const onMouseUp = () => {
    mouseDown = false
  }

  if (props.shape === 'circle') {
    return (

      <Circle
        ref={element}
        overflow={overflow}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}>
        <Closer className='closer'>
          <FontAwesomeIcon icon={faTimesCircle} onClick={() => { props.onDelete(props.index) }} />
        </Closer>
        <CircleDragger className='dragger'>
          <Resizer className='resizer' />
        </CircleDragger>
      </Circle>
    )
  }
  return (
    <Square
      ref={element}
      overflow={overflow}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}>
      <SquareCloser className='closer'>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => { props.onDelete(props.index) }} />
      </SquareCloser>
      <SquareDragger className='dragger'>
        <Resizer className='resizer' />
      </SquareDragger>
    </Square>
  )
}

export default Resizeable
