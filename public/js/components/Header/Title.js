import React from "react";

export default class Title extends React.Component{
    render(){
        let name = this.props.user.name || this.props.user._id;
        return(
            <div>
                <div style={{display:"flex", "align-items":"center"}}>
                    <h1 style={{float:"left"}}>Welcome {name}!</h1>
                    <img src={this.props.user.avatarUrl} style={{height:"60px"}}></img>
                </div>
                <h2 style={{display:"block"}}>This site is now encrypted with quadruple ROT13</h2>
            </div>
        );
    }
}
