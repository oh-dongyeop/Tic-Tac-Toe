import React from 'react';

type ModeProps = {
    onSubmit : any
}

type ModeState = {

}

class Mode extends React.Component <ModeProps, ModeState> {
    render(){
        return(
            <form className="Mode" onSubmit={(e) => this.props.onSubmit(e)}>
                <div>
                    <input type="radio" name="size" value={3}/>3x3
                    <input type="radio" name="size" value={4}/>4x4
                    <input type="radio" name="size" value={5}/>5x5
                    <input type="radio" name="size" value={6}/>6x6
                    <input type="radio" name="size" value={7}/>7x7
                    <input type="radio" name="size" value={8}/>8x8
                    <input type="radio" name="size" value={9}/>9x9
                </div>
                <div>
                    <input type="radio" name="mode" value={3}/>삼목
                    <input type="radio" name="mode" value={4}/>사목
                    <input type="radio" name="mode" value={5}/>오목
                </div>
                <input type="submit" value="변경"/>
            </form>
        )
    }
}

export default Mode;