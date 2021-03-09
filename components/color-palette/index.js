import React from 'react'
import Colors from '../../core/colors'
import FadeIn from '../fade-in'

import { ColorCircle, ToolbarButton } from './styles'

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