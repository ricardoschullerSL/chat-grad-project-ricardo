import React from "react";
import Friend from "./Friend.js"

export default class FriendWindow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.friends.length > 0) {
            return (
                <div>
                    <ul>
                        {this.props.friends.map((friend, index) =>
                        <li key={index}><Friend friend={friend} /></li>)}
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
