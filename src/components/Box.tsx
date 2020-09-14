import React from "react"

interface BoxProps {
  value: string | null
  onClick: () => void
}

function Box(props : BoxProps){
  return (
    <button className="Box" onClick={(e)=>props.onClick()}>
      <span className="value">{props.value}</span>
    </button>
  )
}

export default Box
