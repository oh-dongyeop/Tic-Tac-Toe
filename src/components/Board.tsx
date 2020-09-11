import React from "react"
import Box from "./Box"

interface BoardProps {
  size: number
  boxes: (string | null)[]
  onClick: (i : number) => void
}

class Board extends React.Component<BoardProps> {
  render() : JSX.Element {
    let boxes : JSX.Element[] = this.props.boxes.map((value: string | null, index: number) => {
      return <Box key={index} value={value} onClick={this.props.onClick.bind(this,index)} />
    })
    return <div className="Boxes" style={{gridTemplateColumns: `repeat( ${this.props.size},1fr)`}}>{boxes}</div>
  }
}

export default Board
