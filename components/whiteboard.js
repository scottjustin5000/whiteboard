import React, { 
  useState, 
  useEffect, 
  useRef, 
  forwardRef, 
  useImperativeHandle } from 'react'
import MutableShape from './mutable-shape'
import ToolTypes from '../core/tool-types'

const Whiteboard = forwardRef((props, ref) => {
  const [start, setStart] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [height, setHeight] = useState(1)
  const [width, setWidth] = useState(1)
  const [scale, setScale] = useState(1)
  const [shapes, setShapes] = useState([])
  const drawings = useRef([])
  const cursorX = useRef()
  const cursorY = useRef()
  const prevCursorX = useRef()
  const prevCursorY = useRef()
  const offsetX = useRef(0)
  const offsetY = useRef(0)
  const isMoving = useRef(false)

  const canvas = useRef()

  const toScreenX = (xTrue) => {
    return (xTrue + offsetX.current) * scale
  }
  const toScreenY = (yTrue) => {
      return (yTrue + offsetY.current) * scale
  }
  const toTrueX = (xScreen) => {
      return (xScreen / scale) - offsetX.current
  }
  const toTrueY = (yScreen) => {
    return (yScreen / scale) - offsetY.current
  }
  const trueHeight = () => {
      return canvas.current.clientHeight / scale
  }
  const trueWidth =() =>{
    return canvas.current.clientWidth / scale
  }

  useImperativeHandle(
    ref,
    () => ({
        addShape(shape) {
          const copied = shapes.slice()
          copied.push(shape)
          setShapes(copied)
        }
    }),
  )

  useEffect(() => {
    const ctx = canvas.current.getContext('2d')
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)      
    ctx.lineWidth = 3
    ctx.fillStyle = '#fff'
  }, [])
  
  useEffect(()=> {
    const onWheel = (event) => {
      event.preventDefault()
      event.stopPropagation()
       const deltaY = event.deltaY
       const scaleAmount = -deltaY / 500
       setScale(scale * (1 + scaleAmount))
 
       // zoom the page based on where the cursor is
       const distX = event.pageX / canvas.current.clientWidth
       const distY = event.pageY / canvas.current.clientHeight
 
       // calculate how much we need to zoom
       const unitsZoomedX = trueWidth() * scaleAmount
       const unitsZoomedY = trueHeight() * scaleAmount
       
       const unitsAddLeft = unitsZoomedX * distX
       const unitsAddTop = unitsZoomedY * distY
       offsetX.current =- unitsAddLeft
       offsetY.current =- unitsAddTop
       const s = shapes.map(m=> {
        return {...m, ...{ moving:false } }
       })
       setShapes(s)
       redraw()
     }
     canvas.current.addEventListener('wheel', onWheel, {
      passive: false
    })

    canvas.current.addEventListener('contextmenu', (e)=> {
      e.preventDefault()
      e.stopPropagation()
    })
    return () => {
      canvas.current.removeEventListener('wheel', onWheel)
    }
  })


  const drawLine = (color, lineWidth, x0, y0, x1, y1) => {
    const context = canvas.current.getContext('2d')
    context.beginPath()
    context.moveTo(x0, y0)
    context.lineTo(x1, y1)
    context.strokeStyle = color
    context.lineWidth = lineWidth
    context.stroke()
}

  const eraseLine = (x1, y1, v1, v2) => {
    const ctx = canvas.current.getContext('2d')
    ctx.clearRect(x1, y1, v1, v2) 
  }

  const redraw = () => {
    const ctx = canvas.current.getContext('2d')
    ctx.clearRect(0,0, canvas.current.width, canvas.current.height)
    for (let i = 0; i < drawings.current.length; i++) {
      const line = drawings.current[i]
      if(line.action === 'erase') {
        eraseLine(toScreenX(line.x0), toScreenY(line.y0),line.ex*scale, line.ey*scale)
      } else{
        drawLine(line.color, line.lineWidth, toScreenX(line.x0), toScreenY(line.y0), toScreenX(line.x1), toScreenY(line.y1))
      }
    }
  }

  const startDraw = (evt) => {
    const ctx = canvas.current.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(evt.touches[0].pageX, evt.touches[0].pageY)
    setStart(true)
  }

  const end = () => {
    setStart(false)
  }

  const handleMouseDown =  (e) => {
    if(props.selectedTool !== ToolTypes.MARKER && props.selectedTool !== ToolTypes.ERASER && props.selectedTool !== ToolTypes.HAND) return
    const ctx = canvas.current.getContext('2d')
    cursorX.current = e.pageX
    cursorY.current = e.pageY
    if (props.selectedTool === ToolTypes.MARKER) {
      prevCursorX.current = e.pageX
      prevCursorY.current = e.pageY
    } else if(props.selectedTool === ToolTypes.ERASER) {
      const ex = 20 * scale
      const ey = 20 * scale
      const prevScaledX = toTrueX(prevCursorX.current)
      const prevScaledY = toTrueY(prevCursorY.current)
      const item = {
        action: 'erase',
        x0: prevScaledX,
        y0: prevScaledY,
        ex,
        ey
      }
      drawings.current.push(item)
      ctx.clearRect(prevScaledX, prevScaledY, ex, ey)
    }
    setIsDrawing(true)
  }

  const handleMouseMove = (e) => {
    const ctx = canvas.current.getContext('2d')
    cursorX.current = e.pageX
    cursorY.current = e.pageY
    const scaledX = toTrueX(cursorX.current)
    const scaledY = toTrueY(cursorY.current)
    const prevScaledX = toTrueX(prevCursorX.current)
    const prevScaledY = toTrueY(prevCursorY.current)
    if (isDrawing && props.selectedTool === ToolTypes.MARKER) {
      const item = {
        lineWidth: props.lineWidth,
        color: props.color,
        x0: prevScaledX,
        y0: prevScaledY,
        x1: scaledX,
        y1: scaledY
      }
     drawings.current.push(item)
      drawLine(props.color, props.lineWidth, prevCursorX.current, prevCursorY.current, cursorX.current, cursorY.current)
    } else if (isDrawing && props.selectedTool === ToolTypes.ERASER) {
      const ex = 40 * scale
      const ey = 40 * scale
      const item = {
        action: 'erase',
        x0: prevScaledX,
        y0: prevScaledY,
        ex: 40,
        ey: 40
      }
      drawings.current.push(item)
      ctx.clearRect(prevScaledX, prevScaledY, ex, ey) 
    } else if((isDrawing && props.selectedTool === ToolTypes.HAND)) {
      offsetX.current += (cursorX.current - prevCursorX.current)
      offsetY.current += (cursorY.current - prevCursorY.current)

      const s = shapes.map(m=> {
        return {...m, ...{ moving:false } }
     })
      setShapes(s)
      redraw()
    
    }
    prevCursorX.current = cursorX.current
    prevCursorY.current = cursorY.current

  }

  const handleMove = (evt) => {
    const ctx = canvas.current.getContext('2d')
    if (start) {
      ctx.lineTo(
        evt.touches[0].pageX,
        evt.touches[0].pageY
      )
      ctx.strokeStyle = props.color
      ctx.lineWidth = 3
      ctx.stroke()
    }
  }

  const handleMouseUp = () => {
     setIsDrawing(false)
     const ctx = canvas.current.getContext('2d')
     ctx.closePath()
     isMoving.current = false
  }

  const handleMoveShape = (e) => {
    isMoving.current = true
    const mapped = shapes.map((s,i) => {
      if(i === e.index) {
        return {...s, ...{ top: e.top, left: e.left, moving: true }}
      }
      return {...s}
    })
    setShapes(mapped)
  }

  const handleResizeShape = (e) => {
    const mapped = shapes.map((s,i) => {
      if(i === e.index) {
        return {...s, ...{ h:e.h, w: e.w, moving:false }}
      }
      return {...s}
    })
    setShapes(mapped)
  }

  const handleRemoveShape = (index) => {
    setShapes(prev => prev.filter((f, i) => { if (i !== index) return f }))
  }

  const getCursor = () => {
    if(props.selectedTool && props.selectedTool === ToolTypes.ERASER) {
      return `url('/static/${props.selectedTool.toLowerCase()}.png'), auto`
    } else if(props.selectedTool && props.selectedTool === ToolTypes.HAND) {
      return 'grab'
    } else {
      return 'default'
    }
  }

  let cursor = getCursor()
  if(props.selectedTool === ToolTypes.BOMB) {
    const ctx = canvas.current.getContext('2d')
     ctx.clearRect(0,0, canvas.current.width, canvas.current.height)
     if(shapes.length) {
      setShapes([])
      drawings.current = []
     }
  }
  
  const getTop = (s) => {
    if(s.moving) {
      return s.top
    }
    return toScreenY(s.top)
  }

  const getLeft = (s) => {
    if(s.moving) {
      return s.left
    }
    return toScreenX(s.left)

  }

  return (
    <div style={{cursor: cursor, scroll:'auto'}}>
      {shapes.map((s, i) => {
        return <MutableShape 
          key={`shape_${i}`} 
          scale={scale}
          width={s.w ? s.w * scale : 100 * scale}
          height={s.h ? s.h * scale : 100 * scale}
          top={s.top ? getTop(s) : toScreenY(100)}
          left={s.left ? getLeft(s) : toScreenX(100)}
          index={i} 
          style={{zIndex: 100+i}} 
          shape={s.shape} 
          lineWidth={s.lineWidth}
          color={s.color}
          onResize={handleResizeShape}
          onMove={handleMoveShape}
          onDelete={handleRemoveShape} />
      })}
      <canvas
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={canvas}
        onTouchMove={handleMove}
        onTouchStart={startDraw}
        onTouchEnd={end}
        width={width}
        height={height} />
    </div>
  )
})

export default Whiteboard
