import React from "react"
import Box from "./Box"

interface BoardProps {
  size: number
  boxes: (string | null)[]
  onClick: (i : number) => void
}

class Board extends React.Component<BoardProps> {
  render() {
    const boxes = this.props.boxes.map((value: string | null, index: number) => {
      return <Box key={index} value={value} onClick={() => {this.props.onClick(index)}} />
    })
    const boardStyle = {
      width: "100%",
      height: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(" + this.props.size + ",1fr)",
    }
    return <div style={boardStyle}>{boxes}</div>
  }
}

export default Board
