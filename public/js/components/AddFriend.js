import React from "react";
import AddFriendBox from "./AddFriend/AddFriendBox.js";

export default class AddFriendWindow extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <AddFriendBox />
            </div>
        );
    }
}
