import React from "react"

interface MessageProps {
  value: string
}

function Message(props:MessageProps){
  return <span>{props.value}</span>
}


export default Message
