import React from "react"
import Box from "./Box"

interface BoardProps {
  size: number
  boxes: (string | null)[]
  onClick: (i : number) => void
}

function Board(props : BoardProps){
  let boxes : JSX.Element[] = props.boxes.map((value: string | null, index: number) => {
    return <Box key={index} value={value} onClick={()=>{props.onClick(index)}} />
  })
  return <div className="Boxes" style={{gridTemplateColumns: `repeat( ${props.size},1fr)`}}>{boxes}</div>
}


export default Board
