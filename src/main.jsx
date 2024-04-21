import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage.jsx';
import MasterLayout from './layouts/MasterLayout.jsx';
import TargetDescriptionPage from './components/TargetDescriptionPage.jsx';
import ThreatPage from './components/threat/ThreatPage.jsx'; // Updated import path for ThreatPage
import DamageScenarioPage from './components/damageScenario/DamageScenarioPage.jsx'; // Updated import path for DamageScenarioPage
import RiskAssessmentPage from './components/RiskAssessmentPage.jsx'; // Importing the RiskAssessmentPage component
import SecurityGoalsPage from './components/securityGoals/SecurityGoalsPage.jsx'; // Importing the SecurityGoalsPage component
import AttackTreePage from './components/attackTree/AttackTreePage.jsx'; // Importing the AttackTreePage component
import ManagementSummaryPage from './components/managementSummary/ManagementSummaryPage.jsx'; // Importing the ManagementSummaryPage component
import store from './store/store.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap's CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/dashboard" element={<MasterLayout />}>
            <Route path="target-description" element={<TargetDescriptionPage />} />
            <Route path="threat-page" element={<ThreatPage />} />
            <Route path="damage-scenarios" element={<DamageScenarioPage />} />
            <Route path="risk-assessment" element={<RiskAssessmentPage />} />
            <Route path="security-goals" element={<SecurityGoalsPage />} /> {/* Adding route for SecurityGoalsPage */}
            <Route path="attack-tree" element={<AttackTreePage />} /> {/* Adding route for AttackTreePage */}
            <Route path="management-summary" element={<ManagementSummaryPage />} /> {/* Adding route for ManagementSummaryPage */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);