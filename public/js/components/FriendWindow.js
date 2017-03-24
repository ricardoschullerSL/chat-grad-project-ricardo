import React from "react";
import FriendList from "./FriendWindow/FriendList.js"
import { getFriends } from "../actions/userActions.js"
import { connect } from "react-redux";

@connect((store) => {
    return {
        user: store.user
    }
})
export default class FriendWindow extends React.Component{
    constructor(){
        super();
    }

    componentWillMount(){
        console.log("this.props.user is,", this.props.user);
        getFriends(this.props.user.user._id);
    }

    render(){
        return (
        <div>
            <FriendList friends={this.props.user.friends} />
        </div>
    );
    }
}
