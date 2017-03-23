import React from "react";
import Friend from "./FriendWindow/Friend.js"
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
        if(this.props.friends.length > 0) {
            return (
                <div>
                    <ul>
                        {this.props.friends.map((friend) =>
                        <li><Friend friend={friend} /></li>)}
                    </ul>
                </div>
            )
        } else {
            return(
                <div>
                    <span>No contacts yet</span>
                </div>
            )
        }
    }
}
