import React from "react"
import "./App.css"

import Board from "./components/Board"
import Mode from "./components/Mode"
import History from "./components/History"
import Message from "./components/Message"

import isEnd from "./isEnd"

interface State {
  size: number
  mode: number
  history: (string | null)[][]
  point: number
  turn: string
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      size: 3,
      mode: 3,
      history: [Array(9).fill(null)],
      point: 0,
      turn: "X",
    }
  }

  changeMode = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const newSize: number = Number(target.size.value)
    const newMode: number = Number(target.mode.value)
    if (newSize && newMode && newMode <= newSize) {
      this.setState({
        size: newSize,
        mode: newMode,
        history: [Array(newSize * newSize).fill(null)],
        point: 0,
        turn: "X",
      })
    } else {
      alert("값 입력 오류 // 보드 사이즈를 늘리세요.")
    }
  }

  handleClick = (i: number): void => {
    const point: number = this.state.point
    const history: (string | null)[][] = this.state.history.slice(0, point + 1)
    const current: (string | null)[] = history[history.length - 1].slice()
    if (
      !current[i] &&
      !isEnd(current, this.state.size, this.state.mode, point).includes("Victory")
    ) {
      current[i] = this.state.turn
      this.setState({
        history: history.concat([current]),
        turn: this.state.turn === "X" ? "O" : "X",
        point: history.length,
      })
    }
  }

  jumpTo = (i: number): void => {
    this.setState({
      point: i,
      turn: i % 2 === 0 ? "X" : "O",
    })
  }

  reset = (): void => {
    this.setState({
      history: [Array(this.state.size * this.state.size).fill(null)],
      point: 0,
      turn: "X",
    })
  }

  render() {
    const point: number = this.state.point
    const history: (string | null)[][] = this.state.history.slice(0, point + 1)
    const current: (string | null)[] = history[history.length - 1].slice()
    const size: number = this.state.size
    const mode: number = this.state.mode
    return (
      <div className="App">
        <header>
          <span>
            현재 모드 : {size} X {size} / {mode}목
          </span>
          <Mode
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              this.changeMode(e)
            }}
          />
        </header>
        <section className="Main">
          <article className="Board">
            <Board
              size={size}
              boxes={current}
              onClick={(index: number) => this.handleClick(index)}
            />
          </article>
          <article className="History">
            <Message value={isEnd(current, size, mode, point)} />
            <History
              history={this.state.history}
              onClick={(i: number) => this.jumpTo(i)}
              reset={() => this.reset()}
              point={point}
            />
          </article>
        </section>
      </div>
    )
  }
}

export default App
