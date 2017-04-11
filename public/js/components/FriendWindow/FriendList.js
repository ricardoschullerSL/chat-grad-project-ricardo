import React from "react";
import Friend from "./Friend.js";
import styles from "./friend.css";

export default class FriendWindow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.friends.length > 0) {
            return (
                <div class="friendWindow">
                    <ul class="friendList">
                        <li class="friend">Friend List</li>
                        {this.props.friends.map((friend, index) =>
                        <li key={index + 1}><Friend friend={friend} /></li>)}
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
