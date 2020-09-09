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

  prev = (i: number) => {
    if (i > 0) {
      return this.props.onClick(i - 1)
    }
  }

  next = (i: number) => {
    if (i < this.props.history.length - 1) {
      return this.props.onClick(i + 1)
    }
  }

  render() {
    const history = this.props.history.map((_, index: number) => {
      if (index === 0) {
        return (
          <button key={index} onClick={() => this.props.reset()}>
            Reset
          </button>
        )
      }
      return (
        <button key={index} onClick={() => this.props.onClick(index)}>
          Jump to {index}
        </button>
      )
    })
    return (
      <div>
        <h1>History</h1>
        <div className="PrevNext">
          <button onClick={() => this.prev(this.props.point)}>{"<"}</button>
          <button onClick={() => this.next(this.props.point)}>{">"}</button>
          <button
            onClick={() => {
              if (this.state.switch === "Play") {
                this.setState({ switch: "Stop" })
                let i = this.props.point === this.props.history.length - 1 ? 0 : this.props.point
                const play = setInterval(() => {
                  console.log(i)
                  if (i < this.props.history.length && this.state.switch === "Stop") {
                    this.props.onClick(i++)
                  } else {
                    this.setState({ switch: "Play" })
                    clearInterval(play)
                  }
                }, 300)
              } else {
                this.setState({ switch: "Play" })
              }
            }}
          >
            {this.state.switch}
          </button>
        </div>
        {history}
      </div>
    )
  }
}

export default History
