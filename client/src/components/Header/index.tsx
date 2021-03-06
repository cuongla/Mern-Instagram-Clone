import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';

const Header: React.FC = () => {
    return (
        <div className="header bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
                <Link 
                    className="navbar-brand logo" 
                    to="/"
                    onClick={() => window.scrollTo({ top: 0 })}>
                    <h1>Instakram</h1>
                </Link>
                <Search />
                <Menu />
            </nav>
        </div>
    )
}

export default Header;
