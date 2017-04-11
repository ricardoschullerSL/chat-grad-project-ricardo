import React from "react";
import OnlineUser from "./OnlineUser.js"

export default class FriendWindow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.onlineUsers.length > 0) {
            return (
                <div class="onlinUsersWindow">
                    <ul class="onlineUsersList">
                        <li class="onlineUsersListTitle">Users Online</li>
                        {this.props.onlineUsers.map((user, index) =>
                        <li key={index}><OnlineUser onlineUser={user} /></li>)}
                    </ul>
                </div>
            )
        } else {
            return(
                <div>
                    <span>No online users found.</span>
                </div>
            )
        }
    }
}
