import React from "react"

interface HistoryProps {
  history: (string | null)[][]
  onClick: any
  reset: any
  point: number
}

interface HistoryState {
  switch: string
}

class History extends React.Component<HistoryProps, HistoryState> {
  constructor(props: HistoryProps) {
    super(props)
    this.state = {
      switch: "Play",
    }
  }

  prev(i: number) :void {
    if (i > 0) {
      this.props.onClick(i - 1)
    }
  }

  next(i: number) :void{
    if (i < this.props.history.length - 1) {
      this.props.onClick(i + 1)
    }
  }

  play() : void {
    const _history : (string | null)[][] = this.props.history;
    const _point: number = this.props.point;
    if (this.state.switch === "Play") {
      this.setState({ switch: "Stop" })
      let i : number = _point === _history.length - 1 ? 0 : _point
      const play : NodeJS.Timeout= setInterval(() => {
        if (i < _history.length && this.state.switch === "Stop") {
          this.props.onClick(i++)
        } else {
          this.setState({ switch: "Play" })
          clearInterval(play)
        }
      }, 300)
    } else {
      this.setState({ switch: "Play" })
    }
  }

  history() {
    return this.props.history.map((_, index: number) => {
      if (index === 0) {
        return (
          <button key={index} onClick={this.props.reset}>
            Reset
          </button>
        )
      }
      return (
        <button key={index} onClick={this.props.onClick.bind(this,index)}>
          Jump to {index}
        </button>
      )
    })
  }
  showButton(){
    const _point: number = this.props.point;
    if(this.props.history.length < 2){
      return
    }
    if(this.props.history.length-1 === this.props.point){
      return (
      <div>
        <button onClick={this.prev.bind(this,_point)}>{"<"}</button>
      </div>
      )
    }else if( _point === 0){
      return <button onClick={this.next.bind(this,_point)}>{">"}</button>
    }
    else{
      return (
      <div>
        <button onClick={this.prev.bind(this,_point)}>{"<"}</button>
        <button onClick={this.next.bind(this,_point)}>{">"}</button>
      </div>
      )
    }
  }

  render() : JSX.Element {
    
    return (
      <div>
        <h1>History</h1>
        <div className="PrevNext">
          {this.showButton()}
          <button
            onClick={this.play.bind(this)}
          >
            {this.state.switch}
          </button>
        </div>
        {this.history.bind(this)()}
      </div>
    )
  }
}

export default History
