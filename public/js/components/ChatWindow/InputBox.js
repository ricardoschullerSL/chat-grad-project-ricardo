import React from "react";
import { connect } from "react-redux";
import { sendMessage } from "../../actions/chatActions";
import store from "../../store";
import styles from "./chatwindow.css";

@connect((store) => {
    return {
        chat: store.chat,
        user: store.user,
    }
})
export default class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log("sendMessage args:", this.state.value, this.props.chat.activeChatID);
        this.props.dispatch(sendMessage(this.state.value, this.props.chat.activeChatID))
        this.state = {value: ""};
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render(){
        return (
            <div><form class="inputBox" onSubmit={this.handleSubmit}>
            <input class="inputForm" type="text" value={this.state.value} onChange={this.handleChange}
                placeholder="Type your message" />
            <button>Send Message</button>
        </form></div>
        );
    }
}
