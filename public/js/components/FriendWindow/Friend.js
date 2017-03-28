import React from "react";
import styles from "./friend.css";
import { connect } from "react-redux";
import store from "../../store.js";

@connect()
export default class Friend extends React.Component {
    changeActiveChat() {
        this.props.dispatch({type:"SET_CHAT_ID", payload:this.props.friend.chatID});
    }

    render(){
        return (
            <div class="friend" onClick={this.changeActiveChat.bind(this)}>
                <img class="friendAvatar" src={this.props.friend.avatarUrl}></img>
                <span class="name">{this.props.friend.name}</span>
            </div>
        )
    }
}
