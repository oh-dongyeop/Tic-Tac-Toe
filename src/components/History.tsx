import { resolve } from "dns";
import React,{useEffect, useState} from "react"

interface HistoryProps {
  history: (string | null)[][]
  onClick: any
  reset: any
  point: number
}

function History(props : HistoryProps) {

  function prev(i: number) :void {
    if (i > 0) {
      props.onClick(i - 1)
    }
  }

  function next(i: number) :void{
    if (i < props.history.length - 1) {
      props.onClick(i + 1)
    }
  }

  let [isPlay, setPlay] = useState<boolean>(false);
  
  let timer: any = null;

  useEffect(() => {
    console.log("isPlay", isPlay, timer)
    const _history : (string | null)[][] = props.history;
    const _point: number = props.point;

    if (isPlay) {
      if(timer) {
        clearInterval(timer);
      }
      let i : number = _point === _history.length - 1 ? 0 : _point
      timer = setInterval(() => {
        console.log("setInterval", timer);
        console.log(i, _history.length)
        if (i < _history.length) {
          props.onClick(i++)
        } else {
          clearInterval(timer)
        }
      }, 1000)
    } else {
      console.log("before", timer);
      clearInterval(timer)
      console.log("after", timer);
    }
  }, [isPlay]);

  // function play() : void {
  //   const _history : (string | null)[][] = props.history;
  //   const _point: number = props.point;
  //   if (control === "Play") {
  //     setControl('Stop');
  //     let i : number = _point === _history.length - 1 ? 0 : _point
  //     const play : NodeJS.Timeout= setInterval(() => {
  //       if (i < _history.length && control === "Stop") {
  //         props.onClick(i++)
  //       } else {
  //         setControl("Play");
  //         clearInterval(play)
  //       }
  //     }, 300)
  //   } else {
  //     setControl("Play");
  //   }
  // }

  function history() {
    return props.history.map((_, index: number) => {
      if (index === 0) {
        return (
          <button key={index} onClick={props.reset}>
            Reset
          </button>
        )
      }
      return (
        <button key={index} onClick={props.onClick(index)}>
          Jump to {index}
        </button>
      )
    })
  }

  function showButton(){
    const _point: number = props.point;
    if(props.history.length < 2){
      return
    }
    if(props.history.length-1 === props.point){
      return (
      <div>
        <button onClick={(e) => {prev(_point)}}>{"<"}</button>
      </div>
      )
    }else if( _point === 0){
      return <button onClick={(e) => {next(_point)}}>{">"}</button>
    }
    else{
      return (
      <div>
        <button onClick={(e) => {prev(_point)}}>{"<"}</button>
        <button onClick={(e) => {next(_point)}}>{">"}</button>
      </div>
      )
    }
  }

  return (
    <div>
      <h1>History</h1>
      <div className="PrevNext">
        {showButton()}
        <button
          onClick={() => { setPlay(!isPlay) }}
        >
          {isPlay ? `stop` : `play`}
        </button>
      </div>
      {history()}
    </div>
  )

}

export default History
