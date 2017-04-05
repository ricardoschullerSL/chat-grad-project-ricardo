import React from "react";

export default class Message extends React.Component {
    render(){
        return (
            <div class="message">
            <span>{this.props.sentBy}:{this.props.text}</span>
        </div>
        );
    }
}
