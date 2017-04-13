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
    componentDidUpdate(){
        var chatWindow = document.getElementById("messageWindow");
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    render(){

        if (this.props.activeChatID !== "") {
            return (
                <div class="messageWindow" id="messageWindow">

                    <ul class="messageList">
                    {this.props.chats[this.props.activeChatID].messages.map((message, index) =>
                    <li key={index}><Message text={message.text} sentBy={message.sentBy} /></li>
                )}
                </ul>
            </div>
            );
        } else {
            return (
                <div class="messageWindow" id="messageWindow"> <ul class="messageList">
                    <li><Message text="No messages found" sentBy="Error" /></li>
                </ul></div>
            );
        }
    }
}
