import React, { Component } from "react";
import LoadingBadge from './LoadingBadge';

class Header extends Component {
    render() {
        return(
        <nav className="navbar navbar-light bg-dark">
            <LoadingBadge />
        </nav>);
    }
}

export default Header