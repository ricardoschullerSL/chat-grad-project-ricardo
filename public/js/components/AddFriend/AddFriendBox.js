import React from "react";
import { connect } from "react-redux";
import { addFriend } from "../../actions/userActions";
import store from "../../store";

@connect((store) => {
    return {
        user: store.user,
    }
})
export default class AddFriendBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        if (this.props.user.user.friends.filter(friend => friend.friendID === this.state.value).length > 0) {
            this.props.dispatch({
                type:"SET_ERROR",
                payload:"User already in friendList"});
        } else {
        this.props.dispatch(addFriend(this.state.value));
        this.state = {value: ""};
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render(){
        return (
            <div><form class="addFriendBox" onSubmit={this.handleSubmit}>
            <input class="addFriendForm" type="text" value={this.state.value} onChange={this.handleChange}
                placeholder="Who is yo boy?" />
            <button>Add Friend</button>
        </form></div>
        );
    }
}
