import React from "react";
import styles from "./header.css";

export default class Title extends React.Component{
    render(){
        let name = this.props.user.name || this.props.user._id;
        return(
            <div class="background">
                <div class="header">
                    <h1>Welcome {name}!</h1>
                    <img class="avatar" src={this.props.user.avatarUrl}></img>
                </div>
                <h2>This site is now encrypted with quadruple ROT13</h2>
            </div>
        );
    }
}
