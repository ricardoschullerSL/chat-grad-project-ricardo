import React from "react";
import OnlineUsersList from "./OnlineUsersWindow/OnlineUsersList.js";
import { getOnlineUsers } from "../actions/userActions.js";
import { connect } from "react-redux";


export default class OnlineUsersWindow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
        <div>
            <OnlineUsersList onlineUsers={this.props.onlineUsers}/>
        </div>
    );
    }
}
