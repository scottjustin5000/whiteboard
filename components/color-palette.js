import React from 'react'
import styled from 'styled-components'
import Colors from '../core/colors'
import FadeIn from './fade-in'

const ColorCircle = styled.div`
padding: 8px;
div {
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background-color: ${props => props.color};
  cursor: pointer;
}
`

const ToolbarButton = styled.button`
  cursor: pointer;
  height: 40px;
  border: none;
  border-radius: 6px;
  background-color: ${props=> props.selected ? '#D6D6D6;' : '#f0f0f0;'} 
  &:hover {
    background-color: #D6D6D6; 
  }
  &:active {
    outline: none;
    border: none;
    }
  &:focus {outline:0;}
`
const Palette = (props) => {
   return (
   <FadeIn
      show={props.show}
      top={56}>
     {
       Object.values(Colors).map((c) => {
        return (
          <ToolbarButton key={c} onClick={()=>{ props.onSelect(c)}} selected={props.color === c}>
          <ColorCircle color={c}> <div/></ColorCircle>
        </ToolbarButton>
        )
       })
     }
   </FadeIn>)
}

export default Palette