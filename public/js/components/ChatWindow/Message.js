import React from "react";

export default class Message extends React.Component {
    render(){
        return (
            <span>{this.props.message}</span>
        );
    }
}
