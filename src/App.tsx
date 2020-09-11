import React from "react"
import "./App.css"

import Board from "./components/Board"
import Mode from "./components/Mode"
import History from "./components/History"
import Message from "./components/Message"

import isEnd from "./isEnd"
import sharpWin from "./sharpWin"

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
      history: [Array(9).fill("#")],
      point: 0,
      turn: "X",
    }
  }

  changeMode(e: React.FormEvent<HTMLFormElement>): void {
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
  componentDidMount(){
    console.log('hi');
    this.willWin()
  }
  handleClick (i: number): void {
    const point: number = this.state.point
    const history: (string | null)[][] = this.state.history.slice(0, point + 1)
    let current: (string | null)[] = history[history.length - 1].slice()
    for(let i = 0 ; i < current.length ; i++){
      if(current[i]==="#"){
        current[i] = null;
      }
    }
    if (
      (!current[i] || current[i]==="#") &&
      !isEnd(current, this.state.size, this.state.mode, point).includes("Victory")
      ) {
        current[i] = this.state.turn
        this.setState({
          history: history.concat([current]),
          turn: this.state.turn === "X" ? "O" : "X",
          point: history.length,
        },()=>this.willWin())
      }
      
    
  }

  jumpTo(i: number): void {
    this.setState({
      point: i,
      turn: i % 2 === 0 ? "X" : "O",
    })
  }

  reset(): void {
    this.setState({
      history: [Array(this.state.size * this.state.size).fill(null)],
      point: 0,
      turn: "X",
    })
  }

  willWin(){
    const point = this.state.point
    let history = this.state.history.slice(0, point+1);
    let current = history[history.length -1].slice();
    if(isEnd(current,this.state.size,this.state.mode,point).includes("Victory")) return;
    console.log(sharpWin(current,this.state.size,this.state.mode,this.state.turn))
    history[point] = sharpWin(current,this.state.size,this.state.mode,this.state.turn)
    this.setState({
      history: history
    })
  }

  render(): JSX.Element {
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
            onSubmit={this.changeMode.bind(this)}
          />
        </header>
        <section className="Main">
          <article className="Board">
            <Board
              size={size}
              boxes={current}
              onClick={this.handleClick.bind(this)}
            />
          </article>
          <article className="History">
            <Message value={isEnd(current, size, mode, point)} />
            <History
              history={this.state.history}
              onClick={this.jumpTo.bind(this)}
              reset={this.reset.bind(this)}
              point={point}
            />
          </article>
        </section>
      </div>
    )
  }
}

export default App
