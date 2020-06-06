import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import FadeIn from './fade-in'

const SliderHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledSlider = styled.div`
  position: relative;
  border-radius: 3px;
  background: #dddddd;
  height: 10px;
`
 
const StyledThumb = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: relative;
  top: -5px;
  opacity: 0.5;
  background: ${props => props.color};
  left: ${props => props.left};
  cursor: pointer;
`

const getPercentage = (current, max) => (100 * current) / max
 
const getLeft = percentage => `calc(${percentage}% - 5px)`

const getValue = (percentage, max) => (max / 100) * percentage

const Slider = (props) => {

  const initialPercentage = getPercentage(props.val, props.max)
  const [left, setLeft] = useState(getLeft(initialPercentage))

  const slider = useRef()
  const thumb = useRef()
  const diff = useRef()
 
  const handleMouseMove = event => {
    let newX =
      event.clientX -
      diff.current -
      slider.current.getBoundingClientRect().left

    const end = slider.current.offsetWidth - thumb.current.offsetWidth
    const start = 1
  
    if (newX < start) {
      newX = 1
    }
  
    if (newX > end) {
      newX = end
    }
    const newPercentage = getPercentage(newX, end)
    const val = getValue(newPercentage, props.max)
    setLeft(getLeft(newPercentage))
    const newValue = val >= 1 ? val : 1
    props.onChange(parseInt(newValue.toFixed(0), 10))
  }
 
  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  }
 
  const handleMouseDown = event => {
    diff.current = event.clientX - thumb.current.getBoundingClientRect().left
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  return (
    <FadeIn
      show={props.show}
      leftFrom={99}
      leftTo={72}
      height={64}
      width={180}
      top={32}>
      <SliderHeader>
        <strong>{props.val}</strong>
      </SliderHeader>
      <StyledSlider ref={slider}>
        <StyledThumb 
         color={props.color} ref={thumb} 
        left={left}
        onMouseDown={handleMouseDown}
        />
      </StyledSlider>
      <div style={{textAlign:'center', padding:'8px'}}>Line Width</div>
    </FadeIn>
  )
}

export default Slider