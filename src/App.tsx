import React from "react"
import "./App.css"

import Board from "./components/Board"
import Mode from "./components/Mode"
import History from "./components/History"
import Message from "./components/Message"

interface State {
  size: number
  mode: number
  history: (string | null)[][]
  point: number
  turn: string
}

class App extends React.Component<{},State> {
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

  changeMode = (e:React.FormEvent<HTMLFormElement>) : void => {
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
  handleClick = (i: number) : void => {
    const point : number = this.state.point
    const history : (string | null)[][] = this.state.history.slice(0, point + 1)
    const current : (string | null)[] = history[history.length - 1].slice()
    if (!current[i] && !this.isEnd()) {
      current[i] = this.state.turn
        this.setState({
        history: history.concat([current]),
        turn: this.state.turn === "X" ? "O" : "X",
        point: history.length,
      })
    }
  }

  jumpTo = (i: number) : void => {
      this.setState({
      point: i,
      turn: i % 2 === 0 ? "X" : "O",
    })
  }

  reset = () : void => {
      this.setState({
      history: [Array(this.state.size * this.state.size).fill(null)],
      point: 0,
      turn: "X",
    })
  }

  isEnd = () : string | null | undefined => {
    const history : (string | null)[][] = this.state.history
    const current : (string | null)[] = history[this.state.point].slice()
    const size : number = this.state.size
    
    if (this.state.mode === 5) {
      for (let i = 0; i < current.length; i++) {
        if (current[i]) {
          const pattern : number[][]= [
            i % size <= size - this.state.mode ? [i, i + 1, i + 2, i + 3, i + 4] : [0, 1, 2, 3, 4],
            [i, i + size, i + size * 2, i + size * 3, i + size * 4],
            i % size <= size - this.state.mode
             ?[i, i + size + 1, i + (size + 1) * 2, i + (size + 1) * 3, i + (size + 1) * 4]
             :[0, 1, 2, 3, 4],
            i % size <= size - this.state.mode
              ? [i, i - size + 1, i - (size - 1) * 2, i - (size - 1) * 3, i - (size - 1) * 4]
              : [0, 1, 2, 3, 4],
          ]
          for (let j = 0; j < 4; j++) {
            if (
              current[pattern[j][0]] &&
              current[pattern[j][0]] === current[pattern[j][1]] &&
              current[pattern[j][1]] === current[pattern[j][2]] &&
              current[pattern[j][2]] === current[pattern[j][3]] &&
              current[pattern[j][3]] === current[pattern[j][4]]
            ) {
              return current[pattern[j][0]]
            }
          }
        }
      }
    } else if (this.state.mode === 4) {
      for (let i = 0; i < current.length; i++) {
        if (current[i]) {
          const pattern : number[][] = [
            i % size <= size - this.state.mode ? [i, i + 1, i + 2, i + 3] : [0, 1, 2, 3],
            [i, i + size, i + size * 2, i + size * 3],
            i % size <= size - this.state.mode
             ?[i, i + size + 1, i + (size + 1) * 2, i + (size + 1) * 3]
             :[0, 1, 2, 3],
            i % size <= size - this.state.mode
              ? [i, i - size + 1, i - (size - 1) * 2, i - (size - 1) * 3]
              : [0, 1, 2, 3],
          ]
          for (let j = 0; j < 4; j++) {
            if (
              current[pattern[j][0]] &&
              current[pattern[j][0]] === current[pattern[j][1]] &&
              current[pattern[j][1]] === current[pattern[j][2]] &&
              current[pattern[j][2]] === current[pattern[j][3]]
            ) {
              return current[pattern[j][0]]
            }
          }
        }
      }
    } else if (this.state.mode === 3) {
      for (let i = 0; i < current.length; i++) {
        if (current[i]) {
          const pattern : number[][] = [
            i % size <= size - this.state.mode ? [i, i + 1, i + 2] : [0, 1, 2],
            [i, i + size, i + size * 2],
            i % size <= size - this.state.mode
            ?[i, i + size + 1, i + (size + 1) * 2]
            :[0, 1, 2],
            i % size <= size - this.state.mode 
            ? [i, i - size + 1, i - (size - 1) * 2] 
            : [0, 1, 2],
          ]
          for (let j = 0; j < 4; j++) {
            if (
              current[pattern[j][0]] &&
              current[pattern[j][0]] === current[pattern[j][1]] &&
              current[pattern[j][1]] === current[pattern[j][2]]
            ) {
              return current[pattern[j][0]]
            }
          }
        }
      }
    }
    if (this.state.point === size * size) {
      return "Draw!!"
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <span>
            현재 모드 : {this.state.size} X {this.state.size} / {this.state.mode}목
          </span>
          <Mode onSubmit={(e: React.FormEvent<HTMLFormElement>) => {this.changeMode(e)}} />
        </header>
        <section className="Main">
          <article className="Board">
            <Board
              size={this.state.size}
              boxes={this.state.history[this.state.point]}
              onClick={(index: number) => this.handleClick(index)}
            />
          </article>
          <article className="History">
            <Message
              value={this.isEnd() ? this.isEnd() + " Victory!!" : "현재 턴 : " + this.state.turn}
            />
            <History
              history={this.state.history}
              onClick={(i: number) => this.jumpTo(i)}
              reset={() => this.reset()}
              point={this.state.point}
            />
          </article>
        </section>
      </div>
    )
  }
}

export default App
