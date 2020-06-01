import React, { useState, useEffect, useRef} from 'react'
import MutableShape from './mutable-shape'
import ToolTypes from '../core/tool-types'

const debounce = (fn, time) => {
  let timeoutId = false
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(...args)
    }, time)
  }
}
const Whiteboard = (props) => {
  const [start, setStart] = useState(false)
  const [isDown, setIsDown] = useState(false)
  const [height, setHeight] = useState(1)
  const [width, setWidth] = useState(1)
  const canvas = useRef()

  useEffect(() => {
      const ctx = canvas.current.getContext('2d')
      setHeight(window.innerHeight)
      setWidth(window.innerWidth)      
      ctx.lineWidth = 3
    //  ctx.fillStyle = '#fff'
      ctx.fillStyle = "blue"
     ctx.fillRect(0, 0, 833, 722)
  }, [])

  useEffect(() => {
    const onScroll = e => {

     const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
     const body = document.body;
     const html = document.documentElement;
     const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
     const windowBottom = windowHeight + window.pageYOffset;

     const windowWidth = 'innerWidth' in window ? window.innerWidth : document.documentElement.offsetWidth
     const docWidth = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth)

     if (windowBottom >= docHeight) {
       setHeight(height + 50)
     } 
     if(windowWidth >= docWidth) {
       setWidth(width + 20)
     }
    }
    const debounced = debounce(onScroll,50)
    window.addEventListener("scroll", debounced);

    return () => window.removeEventListener("scroll", debounced) 
  }, [height, width])

  const startDraw = (evt) => {
    const ctx = canvas.current.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(evt.touches[0].pageX, evt.touches[0].pageY)
    setStart(true)
  }

  const move = (evt) => {
    const ctx = canvas.current.getContext('2d')
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
    console.log('ZIZZZ', props.selectedTool)
    if(props.selectedTool !== ToolTypes.MARKER && props.selectedTool !== ToolTypes.ERASER) return
    const canvasX = e.pageX - canvas.current.offsetLeft
    const canvasY = e.pageY - canvas.current.offsetTop
    const ctx = canvas.current.getContext('2d')
    if (props.selectedTool === ToolTypes.MARKER) {
      ctx.beginPath()
      ctx.moveTo(canvasX, canvasY)
    } else {
      ctx.clearRect(canvasX, canvasY, 20, 20)
    }
    setIsDown(true)
  }

  const mouseMove = (e) => {
    console.log('YEAH')
    const ctx = canvas.current.getContext('2d')
    const canvasX = e.pageX - canvas.current.offsetLeft
    const canvasY = e.pageY - canvas.current.offsetTop
    if (isDown && props.selectedTool === ToolTypes.MARKER) {
      ctx.lineTo(canvasX, canvasY)
      ctx.strokeStyle = '#000000'
      ctx.stroke()
    } else if (isDown && props.selectedTool === ToolTypes.ERASER) {
      ctx.clearRect(canvasX, canvasY, 40, 40)
    }
  }

  const mouseUp = () => {
     setIsDown(false)
     const ctx = canvas.current.getContext('2d')
    ctx.closePath()
  }

  console.log('jhhj',  props.selectedTool )
  let cursor = props.selectedTool && props.selectedTool === ToolTypes.ERASER ? `${props.selectedTool.toLowerCase()}.png` : 'default.png'
  // if(props.selectedTool === ToolTypes.BOMB) {
  //   const ctx = canvas.current.getContext('2d')
  //    ctx.clearRect(0,0, canvas.current.width, canvas.current.height)
  //   }

  return (
    <div style={{cursor: `url('/static/${cursor}'), auto`, scroll:'auto'}}>
      {/* {props.shapes.map((s, i) => {
        return <MutableShape 
        key={`shape_${i}`} 
        index={i} 
        style={{zIndex: 100+i}} 
        shape={s.shape} 
        onDelete={props.onRemoveShape} />
      })} */}
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
