// import Link from 'next/link'
import React, { useState } from "react";
import Whiteboard from '../components/whiteboard'
import Toolbar from '../components/toolbar'
const Index = () => {

  const [selectedTool, setSelectedTool] = useState('Marker')

  const [shapes, setShapes] = useState([])

  return (<div>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
        <div style={{width: '90%'}} >
        <Toolbar onToolChanged={setSelectedTool} onAddShape={(shape)=>setShapes(prev=> prev.concat(shape))} />
        </div>
      </div>
      <Whiteboard selectedTool={selectedTool} shapes={shapes}/>
    </div>
  </div>)
   
  }

export default Index
