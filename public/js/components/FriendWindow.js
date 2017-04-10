import React from "react";
import FriendList from "./FriendWindow/FriendList.js"
import { getFriends } from "../actions/userActions.js"
import { connect } from "react-redux";

@connect((store) => {
    return {
        user: store.user,
        activeChatID: store.chat.activeChatID,
    }
})
export default class FriendWindow extends React.Component{
    constructor(){
        super();
    }

    render(){
        return (
        <div>
            <FriendList friends={this.props.user.user.friends}
                activeChatID={this.props.activeChatID}/>
        </div>
    );
    }
}
