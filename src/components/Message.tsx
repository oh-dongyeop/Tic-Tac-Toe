import React from "react"

interface MessageProps {
  value: string
}

class Message extends React.Component<MessageProps> {
  render() {
    return <span>{this.props.value}</span>
  }
}

export default Message
