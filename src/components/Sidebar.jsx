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
                {/* Additional links for new sections can be added here following the same pattern */}
            </ul>
        </aside>
    );
}