import React from "react";
import Message from "./Message";
import { connect } from "react-redux";
import styles from "./chatwindow.css"

@connect((store) => {
    if(store.chat.chats !== null) {
    return {
        chats: store.chat.chats,
        activeChatID: store.chat.activeChatID
    };
} else {
    return{
        messages: ["No chat found yet"]
    }
}
})
export default class MessageWindow extends React.Component{

    render(){

        if (this.props.chats !== undefined) {
            return (
                <div class="messageWindow">
                    <span>ActiveChatID is {this.props.activeChatID}</span>
                    <ul class="messageList">
                    {this.props.chats[this.props.activeChatID].messages.map((text, index) =>
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
