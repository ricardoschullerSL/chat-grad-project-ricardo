import React from "react";

export default class Title extends React.Component{
    render(){
        return(
            <div>
            <h1>Welcome {this.props.username}!</h1>
        <h2>This site is now encrypted with quadruple ROT13</h2>
    </div>
        );
    }
}
