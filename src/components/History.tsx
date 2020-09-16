import React from "react"

interface HistoryProps {
  history: (string | null)[][]
  onClick: (i: number) => void
  reset: () => void
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

  const isPlay = React.useRef<boolean>(false);
  const [control,setControl] = React.useState<boolean>(false);

  function play () : void {
    const _history : (string | null)[][] = props.history;
    const _point: number = props.point;
    let i : number = _point === _history.length - 1 ? 0 : _point
    if(!isPlay.current){
      isPlay.current = !isPlay.current;
      const timer = setInterval(() => {
        if (i < _history.length && isPlay.current) {
          props.onClick(i++)
        } else {
          isPlay.current=false;
          setControl(!control)
          clearInterval(timer)
        }
      }, 300)
    }else{
      isPlay.current = false;
      setControl(!control)
    }
  }

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
        <button key={index} onClick={()=>props.onClick(index)}>
          Jump to {index}
        </button>
      )
    })
  }

  function showButton(){
    const _point: number = props.point;
    if(props.history.length < 2){
      return (
        <div>
          <button onClick={() => {prev(_point)}} disabled>{"<"}</button>
          <button onClick={() => {next(_point)}} disabled>{">"}</button>
        </div>
        )
    }
    if(props.history.length-1 === props.point){
      return (
      <div>
        <button onClick={() => {prev(_point)}}>{"<"}</button>
        <button onClick={() => {next(_point)}} disabled>{">"}</button>
      </div>
      )
    }else if( _point === 0){
      
      return (
        <div>
          <button onClick={() => {prev(_point)}} disabled>{"<"}</button>
          <button onClick={() => {next(_point)}}>{">"}</button>
        </div>
      )
    }
    else{
      return (
      <div>
        <button onClick={() => {prev(_point)}}>{"<"}</button>
        <button onClick={() => {next(_point)}}>{">"}</button>
      </div>
      )
    }
  }

  
  return (
    <div>
      <h1>History</h1>
      <div className="PrevNext">
        {showButton()}
      </div>
      <button onClick={() => { play() }}> {isPlay.current?"stop":"play"} </button>
      {history()}
    </div>
  )

}

export default History
