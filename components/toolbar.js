import React, { Component } from 'react';
//import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarker, faEraser } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCircle } from '@fortawesome/free-regular-svg-icons'

const toolbarStyle = {
  display: 'flex',
  width: '100%',
  border: 'solid 1px',
  backgroundColor: '#F8F8F8',
  borderRadius: '3px',
  boxShadow: `2px 2px 2px 2px #efefefef`,
  padding: '6px 8px'
}

//library.add(faSquare, fal);

class Toolbar extends Component {

constructor (props) {
    super(props)
  //this.mouseDown = this.mouseDown.bind(this)
  this.onAddShape = this.onAddShape.bind(this)
}
onAddShape(shape) {
  this.props.onAddShape({shape})
}
  render() {
    return (
      <div style={toolbarStyle}>
         <button style={{cursor: 'pointer'}} onClick={()=> { this.props.onToolChanged('Marker')}}>
       <FontAwesomeIcon icon={faMarker} />
       </button>
        <button style={{cursor: 'pointer'}} onClick={()=> { this.props.onToolChanged('Eraser')}}>
        <FontAwesomeIcon icon={faEraser} />
        </button>
        <button style={{cursor: 'pointer'}} onClick={() => this.onAddShape('rectangle')}>
        <FontAwesomeIcon icon={faSquare} />
        </button>
        <button style={{cursor: 'pointer'}} onClick={() => this.onAddShape('circle')}>
        <FontAwesomeIcon icon={faCircle} />
        </button>
      </div>
    );
  }
}

export default Toolbar