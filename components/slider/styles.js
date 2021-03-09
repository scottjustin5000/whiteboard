import styled from 'styled-components'

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

export {
  SliderHeader,
  StyledSlider,
  StyledThumb
}