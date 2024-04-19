import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage.jsx';
import MasterLayout from './layouts/MasterLayout.jsx';
import TargetDescriptionPage from './components/TargetDescriptionPage.jsx';
import ThreatPage from './components/ThreatPage.jsx';
import DamageScenarioPage from './components/DamageScenarioPage.jsx'; // Importing the DamageScenarioPage component
import store from './store/store.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/dashboard" element={<MasterLayout />}>
            <Route path="target-description" element={<TargetDescriptionPage />} />
            <Route path="threat-page" element={<ThreatPage />} />
            <Route path="damage-scenarios" element={<DamageScenarioPage />} /> {/* Adding route for DamageScenarioPage */}
            {/* Add more nested routes for other pages within MasterLayout here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);