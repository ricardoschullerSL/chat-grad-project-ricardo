import React from "react";
import { connect } from "react-redux";
import { userOath, apiOauthUri } from "../actions/userActions"

import Footer from "./Footer";
import Header from "./Header";
import ChatWindow from "./ChatWindow";

import { fetchMessages, receiveMessages } from "../actions/chatActions";
import store from "../store";

store.dispatch({type:"THUNK"});

@connect((store) => {
    return {
        user: store.user,
        chat: store.chat
    }
})
export default class Layout extends React.Component{
    constructor(){
        super();
        store.dispatch(userOath());
        console.log("URI is set");
    }
    fetchMessages() {
        this.props.dispatch(fetchMessages());
    }
    receiveMessages() {
        this.props.dispatch(receiveMessages());
    }

    userOath() {
        this.props.dispatch(userOath());
    }
    render(){
        console.log("This.props" , this.props);
        console.log("This.props.user" , this.props.user);
        return(
            <div>
                <Header username="Ricardo"/>
                <ChatWindow message="Test Message" />
                <button onClick= {this.fetchMessages.bind(this)}>
                    Fetch Messages
                </button>
                <button onClick={this.receiveMessages.bind(this)}> Receive Messages</button>
                <a href={this.props.user.uri}>Get Authenticated</a>
                <button onClick={apiOauthUri}>API Oath Uri</button>
                <span> Error:  </span>
                <Footer />
            </div>
        );
    }
}
