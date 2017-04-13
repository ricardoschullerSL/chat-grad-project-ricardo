import React from "react";
import styles from "./chatlist.css";
import { connect } from "react-redux";
import store from "../../store.js";


@connect()
export default class Friend extends React.Component {
    changeActiveChat() {
        this.props.dispatch({type:"SET_CHAT_ID", payload:this.props.chatID});
    }

    render(){
        return (
            <div class="chat" onClick={this.changeActiveChat.bind(this)}>
                <span class="name">{this.props.chatID}</span>
            </div>
        )
    }
}
