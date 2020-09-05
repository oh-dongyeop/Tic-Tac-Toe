import React from 'react';

type MessageProps = {
    value : string,
}

type MessageState = {

}

class Message extends React.Component<MessageProps, MessageState> {
    render(){
        return(
            <span>
                {this.props.value}
            </span>
        )
    }
}

export default Message;