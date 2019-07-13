import React, {Component} from 'react'
import ResizableShape from './resizeable'
class Canvas extends Component {
  constructor (props) {
    super(props)
    this.canvas = React.createRef()
    this.state = {
      width: 1,
      height: 1,
      started: false,
      down: false,
      shapes: []
    }
    this.ctx = null
    this.startDraw = this.startDraw.bind(this)
    this.move = this.move.bind(this)
    this.end = this.end.bind(this)

    this.mouseDown = this.mouseDown.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
  }

  componentDidMount () {
    this.ctx = this.canvas.current.getContext('2d')
    this.setState({
      width: window.innerWidth - 10,
      height: window.innerHeight - 50
    })
    // https://codepen.io/michaelsboost/pen/cnCAL
    // Set Background Color
    this.ctx.lineWidth = 5;
    this.ctx.fillStyle = '#fff'
  //  this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
  }
//https://codepen.io/michaelsboost/pen/cnCAL
  // componentDidUpdate(prevProps) {
  //   if(prevProps.selectedTool !== this.props.selectedTool) {

  //   }
  // }

  async startDraw(evt) {
   // await this.setState({ start: false })

			this.ctx.beginPath();
			this.ctx.moveTo(evt.touches[0].pageX,evt.touches[0].pageY)
			this.setState({ start: true })
  }

  move(evt) {
		if (this.state.started) {
				this.ctx.lineTo(
					evt.touches[0].pageX,
					evt.touches[0].pageY
				);

				this.ctx.strokeStyle = "#000";
				this.ctx.lineWidth = 5;
				this.ctx.stroke();
			}
  }

  end() {
    this.setState({ start: false })
  }

   async mouseDown(e) {
    const canvasX = e.pageX - this.canvas.current.offsetLeft;
		const canvasY = e.pageY - this.canvas.current.offsetTop;
   if(this.props.selectedTool ==='Marker') {
		this.ctx.beginPath();
		// const canvasX = e.pageX - this.canvas.current.offsetLeft;
		// const canvasY = e.pageY - this.canvas.current.offsetTop;
		this.ctx.moveTo(canvasX, canvasY)
    
   } else {
      this.ctx.clearRect(canvasX, canvasY, 20, 20);
    }
    await this.setState({ isDown: true })
  }

  mouseMove(e) {
    const canvasX = e.pageX - this.canvas.current.offsetLeft;
		const canvasY = e.pageY - this.canvas.current.offsetTop;
    if(this.state.isDown && this.props.selectedTool ==='Marker') {
			this.ctx.lineTo(canvasX, canvasY);
			this.ctx.strokeStyle = "#000";
			this.ctx.stroke()
    } else if(this.state.isDown && this.props.selectedTool ==='Eraser') {
      this.ctx.clearRect(canvasX, canvasY, 40, 40);
    }
  }

  async mouseUp() {
    await this.setState({ isDown: false })
		this.ctx.closePath()
  }

  render () {
    let cursor = this.props.selectedTool && this.props.selectedTool.toLowerCase() === 'eraser' ? `${this.props.selectedTool.toLowerCase()}.png` : 'default.png'
    return (
      <div style={{cursor: `url('/static/${cursor}'), auto`}}>
        {this.props.shapes.map(s => {
          return <ResizableShape style={{zIndex: 100}} shape={s.shape}/>
        })}
        <canvas onMouseDown={this.mouseDown} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp} ref={this.canvas} onTouchMove={this.move} onTouchStart={this.startDraw} onTouchEnd={this.end} width={this.state.width} height={this.state.height} />
      </div>
    )
  }
}
export default Canvas
