import React from "react";
import styles from "./friend.css";

export default class Friend extends React.Component {
    render(){
        return (
            <div class="friend">
                <img src={this.props.friend.avatarUrl}></img>
                <span>{this.props.friend.friendID}</span>

            </div>
        )
    }
}
