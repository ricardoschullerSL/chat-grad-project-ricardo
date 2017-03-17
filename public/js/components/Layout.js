import React from "react";
import { connect } from "react-redux";
import { userOath } from "../actions/userActions"

import Footer from "./Footer";
import Header from "./Header";
import ChatWindow from "./ChatWindow";

import { fetchMessages } from "../actions/chatActions";


export default class Layout extends React.Component{
    render(){
        return(
            <div>
                <Header username="Ricardo"/>
                <ChatWindow message="Test Message" />
                <button onClick={fetchMessages}>
                    Get Messages
                </button>
                <button onClick={userOath}>Get Authenticated</button>
                <span> Error:  </span>
                <Footer />
            </div>
        );
    }
}
