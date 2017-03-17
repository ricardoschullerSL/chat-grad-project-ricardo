import React from "react";

export default class Title extends React.Component{
    render(){
        return(
            <h1>Welcome {this.props.username}!</h1>
        );
    }
}
