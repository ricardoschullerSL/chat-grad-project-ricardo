import React from "react";
import { connect } from "react-redux";
import { sendMessage } from "../../actions/chatActions";
import store from "../../store";

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
        this.props.dispatch(sendMessage(this.state.value, this.props.user.activeChatID));
        this.state = {value: ""};
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render(){
        return (
            <div><form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.value} onChange={this.handleChange}
                placeholder="Type your message" />
            <button>Send Message</button>
        </form></div>
        );
    }
}
