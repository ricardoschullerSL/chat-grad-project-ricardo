import React from "react";
import { connect } from "react-redux";
import { addFriend, userOath } from "../actions/userActions";
import { fetchMessages, receiveMessages } from "../actions/chatActions";

import Footer from "./Footer";
import Header from "./Header";
import ChatWindow from "./ChatWindow";

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
        this.props.dispatch(fetchMessages(this.props.user.activeChatID));
    }
    addFriend() {
        this.props.dispatch(addFriend(this.props.user.user._id,
            {friendID:"testfriend", chatID: "testchat0"}));
    }

    render(){
        return(
            <div>
                <Header username={this.props.user.user.name}/>
                <img src={this.props.user.user.avatarUrl} height="60px"></img>
                <ChatWindow message="Test Message" />
                <button>
                    <a href={this.props.user.uri}>Log In</a></button>
                <button onClick={this.fetchMessages.bind(this)}>Fetch Messages</button>
                <button onClick={this.addFriend.bind(this)}>Add Test Friend</button>
                <span> Error: {this.props.user.error} </span>
                <Footer />
            </div>
        );
    }
}
