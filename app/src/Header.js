import React, { Component } from "react";
import LoadingBadge from './LoadingBadge';

class Header extends Component {
    render() {
        return(
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">REAK8S</a>
            <LoadingBadge />
        </nav>);
    }
}

export default Header