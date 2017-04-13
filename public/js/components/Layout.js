import React from "react";
import { connect } from "react-redux";
import { addFriend, userOath, getFriends, getOnlineUsers } from "../actions/userActions";
import { fetchAllChats, receiveMessages } from "../actions/chatActions";

import AddFriend from "./AddFriend.js";
import Footer from "./Footer.js";
import FriendWindow from "./FriendWindow.js";
import Header from "./Header.js";
import ChatWindow from "./ChatWindow.js";
import OnlineUsersWindow from "./OnlineUsersWindow.js"
import styles from "./layout.css";

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
        this.props.dispatch(userOath())
    }
    componentWillMount(){
        if(this.props.user.user !== null){
            this.props.dispatch(fetchAllChats());
            this.props.dispatch(getOnlineUsers());
        }
    }
    fetchAllChats() {
        this.props.dispatch(fetchAllChats());
    }

    toggleShowContacts() {
        this.props.dispatch({type:"SET_SHOW_FRIENDS", payload:!this.props.user.showFriends});
    }

    render(){
        if (this.props.user.loggedIn === false) {
            return (
                <a class="logIn" href={this.props.user.uri}>
            Log In</a>
            )
        } else {
            return(
                <div>
                <div>
                    <Header user={this.props.user.user}/>
                </div>
                <div class="bodyContainer">
                    <div class="friendListContainer">
                        <FriendWindow friends={this.props.user.friends} />
                        <div>
                            <AddFriend />
                        </div>
                        <div>
                            <button onClick={this.toggleShowContacts.bind(this)}>Toggle Contacts/Chats</button>
                        </div>
                    </div>
                        <div class="chatWindowContainer">
                    <ChatWindow message="Test Message" />
                </div>
                    <div class="onlineUsersWindow">
                        <OnlineUsersWindow onlineUsers={this.props.user.onlineUsers} />
                    </div>
            </div>

                <div class="bottomButtons">
                    <button onClick={this.fetchAllChats.bind(this)}>Fetch Messages</button>


                    <span> Error: {this.props.user.error} </span>
                    <Footer />
                </div>
            </div>
            );
        }
    }
}
