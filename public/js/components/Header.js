import React from "react";
import Title from "./Header/Title"

export default class Header extends React.Component{

    render(){
        return(
            <div>
                <Title username={this.props.username}/>
            </div>
        );
    }
}
