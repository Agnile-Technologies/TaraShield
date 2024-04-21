import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <ul>
                <li>
                    <Link to="/dashboard/target-description">
                        Target Description
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/threat-page">
                        Threat Page
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/damage-scenarios">
                        Damage Scenarios
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/risk-assessment">
                        Risk Assessment
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/security-goals">
                        Security Goals
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/attack-tree">
                        Attack Tree
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/management-summary">
                        Management Summary
                    </Link>
                </li>
            </ul>
        </aside>
    );
}