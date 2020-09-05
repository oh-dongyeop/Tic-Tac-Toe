import React from 'react';
import Box from './Box';

type BoardProps = {
    size: number,
    boxes: (string | null)[],
    onClick : any
}

type BoardState = {

}

class Board extends React.Component<BoardProps,BoardState>{
    render(){
        const boxes = this.props.boxes.map((value: string | null, index : number) => {
            return <Box key={index} value={value} onClick={() => this.props.onClick(index)}/>
        })
        const boardStyle = {
            width : 'fit-content',
            display : 'grid',
            gridTemplateColumns : 'repeat('+this.props.size+',1fr)'
        }
        return(
            <div className="Board" style={boardStyle}>
                {boxes}
            </div>
        );
    }
}

export default Board;