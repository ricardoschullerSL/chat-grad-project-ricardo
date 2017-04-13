import React from "react";
import Chat from "./Chat.js";
import styles from "./chatlist.css";

export default class ChatList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.chatList !== []) {
            return (
                <div class="chatListWindow">
                    <ul class="chatList">
                        <li class="chat">Chat List</li>
                        {this.props.chatList.map((chatID, index) =>
                        <li key={index + 1}><Chat chatID={chatID} /></li>)}
                    </ul>
                </div>
            )
        } else {
            return(
                <div>
                    <span>No chats yet</span>
                </div>
            )
        }
    }
}
