import React from 'react';

type BoxProps = {
    value : string | null,
    onClick : any
}

type BoxState = {

}

class Box extends React.Component<BoxProps, BoxState> {
    render(){
        return(
        <button className="Box" onClick={()=>this.props.onClick()}>
            <span className="value">{this.props.value}</span>
        </button>
        );
    }
}

export default Box;