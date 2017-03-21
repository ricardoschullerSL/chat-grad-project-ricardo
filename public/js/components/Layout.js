import React from "react";
import { connect } from "react-redux";
import { userOath } from "../actions/userActions";

import Footer from "./Footer";
import Header from "./Header";
import ChatWindow from "./ChatWindow";

import { fetchMessages, receiveMessages } from "../actions/chatActions";
import store from "../store";


@connect((store) => {
    return {
        user: store.user,
        chat: store.chat
    }
})
export default class Layout extends React.Component{
    constructor(props){
        super(props);
        store.dispatch(userOath());
        console.log("URI is set");
    }
    fetchMessages() {
        this.props.dispatch(fetchMessages());
    }
    receiveMessages() {
        this.props.dispatch(receiveMessages());
    }

    render(){
        console.log("This.props" , this.props);
        console.log("This.props.user" , this.props.user);
        return(
            <div>
                <Header username="Ricardo"/>
                <ChatWindow message="Test Message" />
                <button>
                    <a href={this.props.user.uri}>Get Authenticated</a></button>
                <button onClick={this.fetchMessages.bind(this)}>Fetch Messages</button>
                <span> Error:  </span>
                <Footer />
            </div>
        );
    }
}
