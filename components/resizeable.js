import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faArrowsAlt, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons'

export default class ResizeDiv extends Component {
  constructor (props) {
    super(props)
    this.state = {
      minimum_size: 20,
      original_width: 0,
      original_height: 0,
      original_x: 0,
      original_y: 0,
      original_mouse_x: 0,
      original_mouse_y: 0
    }
    this.mouseDown =false
    this.pos1 = 0
    this.pos2 = 0
    this.pos3 = 0
    this.pos4 = 0
    this.element = React.createRef()
    this.onMouseDown = this.onMouseDown.bind(this)
    this.resize = this.resize.bind(this)
    this.stopResize = this.stopResize.bind(this)
    this.initResize = this.initResize.bind(this)
    this.initDrag = this.initDrag.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.elementDrag = this.elementDrag.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  initResize (e) {
   let original_width = parseFloat(getComputedStyle(this.element.current, null).getPropertyValue('width').replace('px', ''))
    let original_height = parseFloat(getComputedStyle(this.element.current, null).getPropertyValue('height').replace('px', ''))
    let original_x = this.element.current.getBoundingClientRect().left
    let original_y = this.element.current.getBoundingClientRect().top
    let original_mouse_x = e.pageX
    let original_mouse_y = e.pageY
    this.setState({
      original_width,
      original_height,
      original_x,
      original_y,
      original_mouse_x,
      original_mouse_y
    })
    window.addEventListener('mousemove', this.resize)
   window.addEventListener('mouseup', this.stopResize)
  // document.onmouseup = this.stopResize
  }
//context menu
// https://www.sitepoint.com/building-custom-right-click-context-menu-javascript/
 onMouseDown (e) {
  e.preventDefault()
  e.stopPropagation()
    const c = e.target.classList
    this.mouseDown = true
    if (c.contains('FUBU')) {
    return this.initResize(e)
    } else if (c.contains('BOO')) {
      return this.initDrag(e)
    }
  }

  onMouseMove (e) {
    //temp comment out
    // if (!e.target.classList.contains('BOO')) return
    const c = e.target.classList
     if(this.mouseDown && c.contains('BOO')){
      this.elementDrag(e)
     }
    // console.log(this.mouseDown, 'word?')
    
  }

  // componentDidMount() {
  //   // window.addEventListener('mousemove', this.resize)
  //   // window.addEventListener('mouseup', this.stopResize)
  // }

  componentWillUnmount () {
    window.removeEventListener('mousemove', this.resize)
    window.removeEventListener('mouseup', this.stopResize)
  }

  resize (e) {

  //  if(1===1) return
    if (!e.target.classList.contains('FUBU')) return
    // if (currentResizer.classList.contains('bottom-right')) {
    //   const width = original_width + (e.pageX - original_mouse_x);
    //   const height = original_height + (e.pageY - original_mouse_y)
    //   if (width > minimum_size) {
    //     element.style.width = width + 'px'
    //   }
    //   if (height > minimum_size) {
    //     element.style.height = height + 'px'
    //   }
    // }
    // else if (currentResizer.classList.contains('bottom-left')) {
    //   const height = original_height + (e.pageY - original_mouse_y)
    //   const width = original_width - (e.pageX - original_mouse_x)
    //   if (height > minimum_size) {
    //     element.style.height = height + 'px'
    //   }
    //   if (width > minimum_size) {
    //     element.style.width = width + 'px'
    //     element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
    //   }
    // }
    // else if (currentResizer.classList.contains('top-right')) {
    //   const width = original_width + (e.pageX - original_mouse_x)
    //   const height = original_height - (e.pageY - original_mouse_y)
    //   if (width > minimum_size) {
    //     element.style.width = width + 'px'
    //   }
    //   if (height > minimum_size) {
    //     element.style.height = height + 'px'
    //     element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
    //   }
    // }
    // else {

    const width = this.state.original_width + (e.pageX - this.state.original_mouse_x)
    const height = this.state.original_height + (e.pageY - this.state.original_mouse_y)
    // if (width > this.state.minimum_size) {
    //   this.element.current.style.width = width + 'px'
    //   this.element.current.style.left = this.state.original_x + (e.pageX - this.state.original_mouse_x) + 'px'
    // }
    // if (height > this.state.minimum_size) {
    //   this.element.current.style.height = height + 'px'
    //   this.element.current.style.top = this.state.original_y + (e.pageY - this.state.original_mouse_y) + 'px'
    // }

    // const width = original_width + (e.pageX - original_mouse_x);
    // const height = original_height + (e.pageY - original_mouse_y)
    if (width > this.state.minimum_size) {
      this.element.current.style.width = width + 'px'
    }
    if (height > this.state.minimum_size) {
      this.element.current.style.height = height + 'px'
    }
    // }
  }

  stopResize () {
    console.log('calling you know!!!!')
    this.mouseDown = false
    window.removeEventListener('mousemove', this.resize)
  }

  // dragElement(elmnt) {

  //   if (document.getElementById(elmnt.id + "header")) {
  //     // if present, the header is where you move the DIV from:
  //     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  //   } else {
  //     // otherwise, move the DIV from anywhere inside the DIV:
  //     elmnt.onmousedown = dragMouseDown;
  //   }
  // }

  initDrag (e) {
    // e = e || window.event;
    // e.preventDefault();
    // get the mouse cursor position at startup:
    this.pos3 = e.clientX
    this.pos4 = e.clientY
    window.addEventListener('mouseup', this.stopResize)
    // document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    // document.onmousemove = elementDrag;
  }

  elementDrag (e) {
    if (!e.target.classList.contains('BOO')) return
    if(!this.mouseDown) return
    // e = e || window.event;
    // e.preventDefault();
    // calculate the new cursor position:
    this.pos1 = this.pos3 - e.clientX
    this.pos2 = this.pos4 - e.clientY
    this.pos3 = e.clientX
    this.pos4 = e.clientY
    // set the element's new position:
    this.element.current.style.top = (this.element.current.offsetTop - this.pos2) + 'px'
    this.element.current.style.left = (this.element.current.offsetLeft - this.pos1) + 'px'
  }

  closeDragElement () {
    // stop moving when mouse button is released:
    document.onmouseup = null
    document.onmousemove = null
  }

  onMouseUp () {
    console.log('mup')
   this.mouseDown = false
  }
//borderRadius: '50%', circle
//, position: 'absolute', top: '100px', left: '100px'
//
  render () {
//     if(1===1) {
//       return (

//   <div style={{border: '1px solid black',  borderRadius: '50%',  width: '100px', height: '100px', overflow:'auto', resize:'both', cursor: 'grab', position: 'absolute', top: '100px', left: '100px'}}  className='BOO' onMouseUp={this.onMouseUp} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove}  ref={this.element}>
//    <div >Resize me!</div> 
//     <div className='FUBU' style={{ border: '1px solid red', position: 'absolute', right: '0px', bottom: '0px', width: '20px', height: '20px', cursor: 'nwse-resize'}} />
// </div>
//       )
//     }
    if(this.props.shape === 'circle') {
      return (
        <div style={{ border: '1px solid black', borderRadius: '50%', width: '100px', height: '100px', overflow:'auto', resize:'both', cursor: 'grab', position: 'absolute', top: '100px', left: '100px'}} ref={this.element} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} >
        <div className='BOO' style={{width: '100%', height: '100%', border: '1px solid #000', borderRadius: '50%', boxSizing: 'border-box', cursor: 'grab'}}>
          <div className='FUBU' style={{ border: '1px solid black', position: 'absolute', right: '0px', bottom: '0px', width: '10px', height: '10px', cursor: 'nwse-resize'}}>
          </div>
        </div>
      </div>
      )
    }
    return (
      <div style={{ border: '1px solid black', width: '100px', height: '100px', overflow:'auto', resize:'both', cursor: 'grab', position: 'absolute', top: '100px', left: '100px'}} ref={this.element} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} >
        <div className='BOO' style={{width: '100%', height: '100%', border: '1px solid #000', boxSizing: 'border-box', cursor: 'grab'}}>
          <div className='FUBU' style={{ position: 'absolute', right: '0px', bottom: '0px', width: '20px', height: '20px', cursor: 'nwse-resize'}} />
        </div>
      </div>
    )
  }
}
