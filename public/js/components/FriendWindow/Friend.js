import React from "react";

export default class Friend extends React.Component {
    render(){
        return (
            <span>{this.props.friend.friendID}</span>
        )
    }
}
