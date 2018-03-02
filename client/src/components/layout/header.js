import React from 'react';
import { Link } from 'react-router-dom'

export default class Header extends React.Component {

    render() {
        return (
            
            <nav className="navbar navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home
                            <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/products/new">new</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">products</Link>
                    </li>
                </ul>
            </nav>
        
        );
    }

}
