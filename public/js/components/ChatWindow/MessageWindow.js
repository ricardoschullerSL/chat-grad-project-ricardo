import React from "react";
import Message from "./Message";
import { connect } from "react-redux";
import styles from "./chatwindow.css"

@connect((store) => {
    if(store.chat.chats !== null) {
    return {
        messages: store.chat.chats.chat0.messages,
    };
} else {
    return{
        messages: ["No chat found yet"]
    }
}
})
export default class MessageWindow extends React.Component{

    render(){
        if (this.props.messages !== undefined) {
            return (
                <div class="messageWindow">
                    <ul class="messageList">
                    {this.props.messages.map((text, index) =>
                    <li key={index}><Message message={text} /></li>
                )}
                </ul>
            </div>
            );
        } else {
            return (
                <div> <Message message="No messages found" /></div>
            );
        }
    }
}
