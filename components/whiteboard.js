import React, { useState, useEffect, useRef } from 'react'
import ResizableShape from './resizable'

const Whiteboard = (props) => {
  const [start, setStart] = useState(false)
  const [isDown, setIsDown] = useState(false)
  const [height, setHeight] = useState(1)
  const [width, setWidth] = useState(1)
  const canvas = useRef()
  let ctx = null

  useEffect(() => {
    ctx = canvas.current.getContext('2d')
    setHeight(window.innerHeight - 50)
    setWidth(window.innerWidth - 10)
    ctx.lineWidth = 3
    ctx.fillStyle = '#fff'
  })

  const startDraw = (evt) => {
    ctx.beginPath()
    ctx.moveTo(evt.touches[0].pageX, evt.touches[0].pageY)
    setStart(true)
  }

  const move = (evt) => {
    if (start) {
      ctx.lineTo(
        evt.touches[0].pageX,
        evt.touches[0].pageY
      )

      ctx.strokeStyle = '#000'
      ctx.lineWidth = 3
      ctx.stroke()
    }
  }

  const end = () => {
    setStart(false)
  }

  const mouseDown =  (e) => {
    const canvasX = e.pageX - canvas.current.offsetLeft
    const canvasY = e.pageY - canvas.current.offsetTop
    if (props.selectedTool === 'Marker') {
      ctx.beginPath()
      ctx.moveTo(canvasX, canvasY)
    } else {
      ctx.clearRect(canvasX, canvasY, 20, 20)
    }
    setIsDown(true)
  }

  const mouseMove = (e) => {
    const canvasX = e.pageX - canvas.current.offsetLeft
    const canvasY = e.pageY - canvas.current.offsetTop
    if (isDown && props.selectedTool === 'Marker' && ctx) {
      ctx.lineTo(canvasX, canvasY)
      ctx.strokeStyle = '#000000'
      ctx.stroke()
    } else if (isDown && props.selectedTool === 'Eraser' && ctx) {
      ctx.clearRect(canvasX, canvasY, 40, 40)
    }
  }

  const mouseUp = () => {
     setIsDown(false)
    ctx.closePath()
  }

  let cursor = props.selectedTool && props.selectedTool.toLowerCase() === 'eraser' ? `${props.selectedTool.toLowerCase()}.png` : 'default.png'
  return (
    <div style={{cursor: `url('/static/${cursor}'), auto`}}>
      {props.shapes.map((s, i) => {
        return <ResizableShape 
        key={`shape_${i}`} 
        index={i} 
        style={{zIndex: 100+i}} 
        shape={s.shape} 
        onDelete={props.onRemoveShape} />
      })}
      <canvas
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
        ref={canvas}
        onTouchMove={move}
        onTouchStart={startDraw}
        onTouchEnd={end}
        width={width}
        height={height} />
    </div>
  )
}

export default Whiteboard
