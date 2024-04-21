import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Toolbar from '../components/Toolbar';
import './MasterLayout.css';
import '../components/menuBar.css';
import logo from '../assets/logo.png';

export default function MasterLayout() {
    const location = useLocation();
    const [pageTitle, setPageTitle] = useState('');

    useEffect(() => {
        const path = location.pathname.split('/').pop();
        switch (path) {
            case 'target-description':
                setPageTitle('Target Description');
                break;
            case 'threat-page':
                setPageTitle('Threat Page');
                break;
            case 'damage-scenarios':
                setPageTitle('Damage Scenarios');
                break;
            default:
                setPageTitle('');
        }
    }, [location]);

    return (
        <div className="masterLayout">
            <header className="menuBar">
                <nav>
                    <ul>
                        <li><a href="#">File</a></li>
                        <li><a href="#">Edit</a></li>
                        <li><a href="#">View</a></li>
                        <li><a href="#">Help</a></li>
                    </ul>
                </nav>
                <div className="logo">
                    <img src={logo} alt="TaraShield Logo" />
                </div>
            </header>
            <Toolbar />
            <div className="contentArea">
                <Sidebar />
                <main className="mainContent">
                    {pageTitle && <div className="pageTitle">{pageTitle}</div>}
                    <Outlet />
                </main>
            </div>
            <footer className="footer">
                <p>Copyright © TaraShield 2023</p>
            </footer>
        </div>
    );
}