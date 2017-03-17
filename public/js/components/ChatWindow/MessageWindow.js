import React from "react";
import Message from "./Message";
import { connect } from "react-redux";

@connect((store) => {
    return {
        messages: store.chat.messages
    };
})
export default class MessageWindow extends React.Component{
    render(){
        return (
            <Message message={this.props.message}></Message>
        );
    }
}
