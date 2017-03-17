import React from "react";
import MessageWindow from "./ChatWindow/MessageWindow.js";
import InputBox from "./ChatWindow/InputBox.js";

export default class ChatWindow extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <MessageWindow message={this.props.message} />
                <InputBox />
            </div>
        );
    }
}
