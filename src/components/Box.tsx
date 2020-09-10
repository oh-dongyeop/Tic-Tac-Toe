import React from "react"

interface BoxProps {
  value: string | null
  onClick: () => void
}

class Box extends React.Component<BoxProps> {
  render() {
    return (
      <button className="Box" onClick={this.props.onClick.bind(this)}>
        <span className="value">{this.props.value}</span>
      </button>
    )
  }
}

export default Box
