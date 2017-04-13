import React from "react";
import FriendList from "./FriendWindow/FriendList.js";
import ChatList from "./FriendWindow/ChatList.js";
import { getFriends } from "../actions/userActions.js";
import { connect } from "react-redux";

@connect((store) => {
    return {
        friends: store.user.user.friends,
        activeChatID: store.chat.activeChatID,
        chatList: store.chat.chatList,
        showFriends: store.user.showFriends
    }
})
export default class FriendWindow extends React.Component{
    constructor(){
        super();
    }

    render(){
        if (this.props.showFriends) {
            return (
                <div>
                    <FriendList friends={this.props.friends}/>
                </div>
            )
        } else {
            return (
                <div>
                    <ChatList chatList={this.props.chatList} />
                </div>
            )
        }
    }
}
