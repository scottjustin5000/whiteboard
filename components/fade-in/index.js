import React from 'react'
import Container from './styles'

const FadeIn = (props)=> {
  return(
  <Container
    speed={props.speed} 
    show={props.show}
    height={props.height}
    width={props.width}
    top={props.top}
    >
    {props.children}
    </Container>)
}

export default FadeIn
