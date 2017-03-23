import React from "react";
import { connect } from "react-redux";
import { addFriend, userOath } from "../actions/userActions";
import { fetchMessages, receiveMessages } from "../actions/chatActions";

import Footer from "./Footer";
import Header from "./Header";
import ChatWindow from "./ChatWindow";
import FriendWindow from "./FriendWindow";

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
                <img src={this.props.user.user.avatarUrl} style={{height:"50px", float:"right"}}></img>
                <div style={{width:"800px"}}>
                    <div style={{width:"500px", float:"left",}}>
                <ChatWindow message="Test Message" />
            </div>
                <div style={{width:"200px", float:"right"}}>
                    <FriendWindow friends={this.props.user.friends} />
                </div>
            </div>
            <div style={{position:"absolute", bottom:"20px"}}>
            <button>
                <a href={this.props.user.uri}>Log In</a></button>
                <button onClick={this.fetchMessages.bind(this)}>Fetch Messages</button>
                <button onClick={this.addFriend.bind(this)}>Add Test Friend</button>
                <span> Error: {this.props.user.error} </span>
                <Footer />
            </div>
            </div>
        );
    }
}
