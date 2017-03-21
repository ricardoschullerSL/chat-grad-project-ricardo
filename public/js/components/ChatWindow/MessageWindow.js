import React from "react";
import Message from "./Message";
import { connect } from "react-redux";

@connect((store) => {
    console.log("Store.messages is", store.chat.messages);
    return {
        messages: store.chat.messages,
    };
})
export default class MessageWindow extends React.Component{

    render(){
        return (
            <div>
                <ul>
                {this.props.messages.map((text) =>
                <li><Message message={text} /></li>
            )}
            </ul>
        </div>
        );
    }
}
