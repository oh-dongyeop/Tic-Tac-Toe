import React from 'react';
import './App.css';

import Board from './components/Board';
import Mode from './components/Mode';
import History from './components/History';
import Message from './components/Message';

type Props = {

}

type State = {
  size : number,
  mode : number,
  history : (string | null) [][],
  point : number,
  turn : string,
}

class App extends React.Component<Props,State> {
  constructor(props : any){
    super(props);
    this.state = {
      size: 3,
      mode: 3,
      history: [Array(9).fill(null)],
      point : 0,
      turn : 'X',
    }
  }

  changeMode = (e : any) => {
    e.preventDefault();
    const newSize = Number(e.target.size.value);
    const newMode = Number(e.target.mode.value);
    if(newSize && newMode && newMode<=newSize){
      return this.setState({
        size : newSize,
        mode: newMode,
        history : [Array(newSize*newSize).fill(null)],
        point: 0,
        turn: 'X',
      })
    }else{
      alert('값 입력 오류 // 보드 사이즈를 늘리세요.');
    }
  }

  handleClick = (i : number) => {
    const point = this.state.point;
    const history = this.state.history.slice(0, point + 1);
    const current = history[history.length-1].slice();
    if(!current[i]&&!this.isEnd()){
      current[i] = this.state.turn;
      return this.setState({
        history: history.concat([current]),
        turn: this.state.turn === 'X' ? 'O' : 'X',
        point: history.length
      })
    }
  }

  jumpTo = (i : number) => {
    return this.setState({
      point: i,
      turn: i%2 === 0 ? 'X':'O'
    })
  }

  reset = () => {
    return this.setState({
      history: [Array(this.state.size*this.state.size).fill(null)],
      point : 0,
      turn : 'X',
    })
  }

  isEnd = () => {
    const history = this.state.history;
    const current = history[this.state.point].slice();
    const size = this.state.size;
    if(this.state.mode===5){
      for(let i = 0; i < current.length ; i++){
        if(current[i]){
          const pattern = 
          [i%size<size-this.state.mode?[i,i+1,i+2,i+3,i+4]:[0,1,2,3,4],
          [i,i+size,i+size*2,i+size*3,i+size*4],
          [i,i+size+1,i+(size+1)*2,i+(size+1)*3,i+(size+1)*4],
          i%size===0?[i,i-size+1,i-(size-1)*2,i-(size-1)*3,i-(size-1)*4]:[0,1,2,3,4]];
          for(let j = 0 ; j < 4 ; j++){
            if(current[pattern[j][0]]&&
            current[pattern[j][0]]===current[pattern[j][1]]&&
            current[pattern[j][1]]===current[pattern[j][2]]&&
            current[pattern[j][2]]===current[pattern[j][3]]&&
            current[pattern[j][3]]===current[pattern[j][4]]){
              return current[pattern[j][0]]+" Victory!!";
            }
          }
        }
      }
    }else if(this.state.mode===4){
      for(let i = 0; i < current.length ; i++){
        if(current[i]){
          const pattern = 
          [i%size<size-this.state.mode?[i,i+1,i+2,i+3]:[0,1,2,3],
          [i,i+size,i+size*2,i+size*3],
          [i,i+size+1,i+(size+1)*2,i+(size+1)*3],
          i%size===0?[i,i-size+1,i-(size-1)*2,i-(size-1)*3]:[0,1,2,3]];
          for(let j = 0 ; j < 4 ; j++){
            if(current[pattern[j][0]]&&
            current[pattern[j][0]]===current[pattern[j][1]]&&
            current[pattern[j][1]]===current[pattern[j][2]]&&
            current[pattern[j][2]]===current[pattern[j][3]]){
              return current[pattern[j][0]]+" Victory!!";
            }
          }
        }
      }
    }else if(this.state.mode===3){
      for(let i = 0; i < current.length ; i++){
        if(current[i]){
          const pattern = 
          [i%size<size-this.state.mode?[i,i+1,i+2]:[0,1,2],
          [i,i+size,i+size*2],
          [i,i+size+1,i+(size+1)*2],
          i%size===0?[i,i-size+1,i-(size-1)*2]:[0,1,2]];
          for(let j = 0 ; j < 4 ; j++){
            if(current[pattern[j][0]]&&
            current[pattern[j][0]]===current[pattern[j][1]]&&
            current[pattern[j][1]]===current[pattern[j][2]]){
              return current[pattern[j][0]]+" Victory!!";
            }
          }
        }
      }
    }
    if(this.state.point===size*size){
      return "Draw!!"
    }
  }

  render(){
    return (
      <div className="App">
        <header>
          <Mode onSubmit={(e : any)=>this.changeMode(e)}/>
        </header>
        <section className="Main">
          <article>
            <h1>{this.state.mode}목</h1>
            <Board 
            size={this.state.size} 
            boxes={this.state.history[this.state.point]} 
            onClick={(index : number) => this.handleClick(index)}
            />
          <Message value={this.isEnd()?this.isEnd()+"":"현재 턴 : "+ this.state.turn}/>
          </article>
          <article className="History">
            <History 
              history={this.state.history} 
              onClick={(i : number)=>this.jumpTo(i)} 
              reset={() => this.reset()}
              point={this.state.point}
            />
          </article>
        </section>
      </div>
    );
    
  }
}

export default App;
