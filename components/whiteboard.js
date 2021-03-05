import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import MutableShape from './mutable-shape'
import ToolTypes from '../core/tool-types'

 //might need to be state
 // const drawings = []
 let cursorX
 let cursorY
 let prevCursorX
 let prevCursorY
 let offsetX =  0
 let offsetY = 0

const Whiteboard = forwardRef((props, ref) => {
  const [start, setStart] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [height, setHeight] = useState(1)
  const [width, setWidth] = useState(1)
  const [scale, setScale] = useState(1)
  const [shapes, setShapes] = useState([])
  const [drawings, setDrawings] = useState([])
  const [cursorX, setCursorX] = useState()
  const [cursorY, setCursorY] = useState()
  const [prevCursorX, setPrevCursorX] = useState()
  const [prevCursorY, setPrevCursorY] = useState()
  const [offsetX, setOffSetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  const canvas = useRef()





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

  const toScreenX = (xTrue) => {
      return (xTrue + offsetX) * scale;
  }
  const toScreenY = (yTrue) => {
      return (yTrue + offsetY) * scale;
  }
  const toTrueX = (xScreen) => {
      return (xScreen / scale) - offsetX;
  }
  const toTrueY = (yScreen) => {
    return (yScreen / scale) - offsetY;
  }
  const trueHeight = () => {
      return canvas.current.clientHeight / scale;
  }
  const trueWidth =() =>{
    return canvas.current.clientWidth / scale;
  }

  useEffect(() => {
      const ctx = canvas.current.getContext('2d')
      setHeight(window.innerHeight)
      setWidth(window.innerWidth)      
      ctx.lineWidth = 3
      ctx.fillStyle = '#fff'
  }, [])

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
      ctx.strokeStyle = props.color
      ctx.lineWidth = 3
      ctx.stroke()
    }
  }

  const end = () => {
    setStart(false)
  }

  const drawLine = (color, lineWidth, x0, y0, x1, y1) => {
    const context = canvas.current.getContext('2d')
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color
    context.lineWidth = lineWidth
    context.stroke()
}

  const eraseLine = (x1, y1, v1, v2) => {
    const ctx = canvas.current.getContext('2d')
    ctx.clearRect(x1, y1, v1, v2) 
  }

  const mouseDown =  (e) => {
    if(props.selectedTool !== ToolTypes.MARKER && props.selectedTool !== ToolTypes.ERASER && props.selectedTool !== ToolTypes.HAND) return
    const ctx = canvas.current.getContext('2d')
    setCursorX(e.pageX)
    setCursorY(e.pageY)
    if (props.selectedTool === ToolTypes.MARKER) {
      setPrevCursorX(e.pageX)
      setPrevCursorY(e.pageY)
    } else {
      const ex = 20 * scale
      const ey = 20 * scale
      const prevScaledX = toTrueX(prevCursorX)
      const prevScaledY = toTrueY(prevCursorY)
      drawings.push({
        action: 'erase',
        x0: prevScaledX,
        y0: prevScaledY,
        ex,
        ey
      })
      ctx.clearRect(prevScaledX, prevScaledY, ex, ey)
    }
    setIsDrawing(true)
  }

  const mouseMove = (e) => {
    const ctx = canvas.current.getContext('2d')
    setCursorX(e.pageX)
    setCursorY(e.pageY)
    const scaledX = toTrueX(cursorX)
    const scaledY = toTrueY(cursorY)
    const prevScaledX = toTrueX(prevCursorX)
    const prevScaledY = toTrueY(prevCursorY)
    if (isDrawing && props.selectedTool === ToolTypes.MARKER) {
      drawings.push({
        lineWidth: props.lineWidth,
        color: props.color,
        x0: prevScaledX,
        y0: prevScaledY,
        x1: scaledX,
        y1: scaledY
    })

    drawLine(props.color, props.lineWidth, prevCursorX, prevCursorY, cursorX, cursorY)
    } else if (isDrawing && props.selectedTool === ToolTypes.ERASER) {
      const ex = 40 * scale
      const ey = 40 * scale
      drawings.push({
          action: 'erase',
          x0: prevScaledX,
          y0: prevScaledY,
          ex: 40,
          ey: 40
      })
      ctx.clearRect(prevScaledX, prevScaledY, ex, ey) 
    } else if((isDrawing && props.selectedTool === ToolTypes.HAND)) {
        offsetX += (cursorX - prevCursorX) / scale
        offsetY += (cursorY - prevCursorY) / scale
        redraw()
    }
    setPrevCursorX(cursorX)
    setPrevCursorY(cursorY)
  }

  const mouseUp = () => {
     setIsDrawing(false)
     const ctx = canvas.current.getContext('2d')
     ctx.closePath()
  }

  const redraw = () => {
    const ctx = canvas.current.getContext('2d')
    ctx.clearRect(0,0, canvas.current.width, canvas.current.height)
    for (let i = 0; i < drawings.length; i++) {
      const line = drawings[i];
      if(line.action === 'erase') {
        eraseLine(toScreenX(line.x0), toScreenY(line.y0),line.ex*scale, line.ey*scale)
      } else{
        drawLine(line.color, line.lineWidth, toScreenX(line.x0), toScreenY(line.y0), toScreenX(line.x1), toScreenY(line.y1))
      }
    }
  }

  useEffect(()=> {
    const onWheel = (event) => {
      event.preventDefault()
      event.stopPropagation()
       const deltaY = event.deltaY
       const scaleAmount = -deltaY / 500
       setScale(scale * (1 + scaleAmount))
 
       // zoom the page based on where the cursor is
       var distX = event.pageX / canvas.current.clientWidth;
       var distY = event.pageY / canvas.current.clientHeight;
 
       // calculate how much we need to zoom
       const unitsZoomedX = trueWidth() * scaleAmount;
       const unitsZoomedY = trueHeight() * scaleAmount;
       
       const unitsAddLeft = unitsZoomedX * distX;
       const unitsAddTop = unitsZoomedY * distY;
 
       setOffsetX(offsetX -unitsAddLeft)
       setOffsetY(offsetY-unitsAddTop)
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

  const onMoveShape = (e) => {
    const mapped = shapes.map((s,i) => {
      if(i === e.index) {
        return {...s, ...{ top: e.top, left: e.left }}
      }
      return {...s}
    })
    setShapes(mapped)
  }

  const onResizeShape = (e) => {
    const mapped = shapes.map((s,i) => {
      if(i === e.index) {
        return {...s, ...{ h:e.h, w: e.w }}
      }
      return {...s}
    })
    setShapes(mapped)
  }

  const onRemoveShape = (index) => {
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
     props.clearShapes()
    }

  return (

    <div style={{cursor: cursor, scroll:'auto'}}>
      {shapes.map((s, i) => {
        return <MutableShape 
        key={`shape_${i}`} 
        scale={props.scale}
        width={s.w ? s.w * scale : 100 * scale}
        height={s.h ? s.h * scale : 100 * scale}
        top={s.top ? toScreenY(s.top) : toScreenY(100)}
        left={s.left ? toScreenX(s.left) : toScreenX(100)}
        index={i} 
        style={{zIndex: 100+i}} 
        shape={s.shape} 
        lineWidth={s.lineWidth}
        color={s.color}
        onResize={onResizeShape}
        onMove={onMoveShape}
        onDelete={onRemoveShape} />
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
})

export default Whiteboard
