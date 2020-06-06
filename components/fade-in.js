import React from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
0%   { opacity: 0; left: 99px }
100% { opacity: 1; left: 72px; }
`
const Container = styled.div`
display: ${props => !props.show ? 'none' : 'block'};
font-size: 12px;
width: ${props => props.width}px;
height: ${props => props.height}px;
border-radius: 8px;
background-color: #f0f0f0;
border: solid 1px #dddddd;
padding: 5px;
white-space: nowrap;
position: absolute;
top: ${props => props.top}px;
left: 66px;
transition: transform 0.3s ease-out;
opacity: ${props => props.show ? 1 : 0};
z-index: 100;
box-shadow:0 2px 2px #ccc;
animation: ${fadeIn} ${props => props.speed || '0.35s'} ease-in-out;
animation-timing-function: ease-in-out;
animation-iteration-count: 1;
animation-direction: normal;
animation-fill-mode: none;
animation-play-state: running;
`

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
