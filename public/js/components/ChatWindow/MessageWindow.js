import React from "react";
import Message from "./Message";
import { connect } from "react-redux";

@connect((store) => {
    console.log("Store.chat is", store.chat);
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
                <div>
                    <ul>
                    {this.props.messages.map((text) =>
                    <li><Message message={text} /></li>
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
