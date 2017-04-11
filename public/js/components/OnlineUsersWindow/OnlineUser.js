import React from "react"
import styles from "./onlineuser.css"

export default class OnlineUser extends React.Component {
    render () {
        return (
            <div class="onlineUser">
                <span class="name">{this.props.onlineUser.userID}</span>
            </div>
        )
    }
}
