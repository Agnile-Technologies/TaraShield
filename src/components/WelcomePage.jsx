import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProject } from '../store/projectActions';
import './WelcomePage.css'; // Assume we'll create CSS for styling WelcomePage
import './menuBar.css'; // Importing menuBar styles
import './footer.css'; // Importing footer styles
import logo from '../assets/logo.png'; // Importing logo image correctly
import './modal.css'; // Importing modal styles for styling the project creation modal

function WelcomePage() {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDirectory, setProjectDirectory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleCreateProject = async () => {
    setShowModal(false);
    if (projectDirectory) {
      const filePath = await window.electron.ipcRenderer.invoke('create-project', { name: projectName, description: projectDescription, directory: projectDirectory }).catch(error => {
        console.error('Error creating project:', error);
        alert('Failed to create project');
      });
      if (filePath) {
        dispatch(createProject({ name: projectName, description: projectDescription, path: filePath }));
        // Navigate to Master Layout here (Assuming React Router is set up)
        console.log(`Project ${projectName} created at ${filePath}`);
      }
    }
  };

  const handleOpenProject = async () => {
    const filePath = await window.electron.ipcRenderer.invoke('open-project').catch(error => {
      console.error('Error opening project:', error);
      alert('Failed to open project');
    });
    if (filePath) {
      // Logic to handle opening and reading the project file goes here
      console.log(`Project opened from ${filePath}`);
      // Dispatch action to update state with opened project details
      // Navigate to Master Layout with the opened project details
    }
  };

  const selectDirectory = async () => {
    const directory = await window.electron.ipcRenderer.invoke('select-directory').catch(error => {
      console.error('Error selecting directory:', error);
    });
    if (directory) {
      setProjectDirectory(directory);
    }
  };

  return (
    <div className="welcomePage">
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
      <main>
        <h1>Welcome to TaraShield</h1>
        <p>Select an option to get started.</p>
        <div className="action-buttons">
          <button onClick={() => setShowModal(true)}>Create Project</button>
          <button onClick={handleOpenProject}>Open Project</button>
        </div>
        {showModal && (
          <>
            <div className="overlay"></div>
            <div className="modal">
              <input 
                value={projectName} 
                onChange={(e) => setProjectName(e.target.value)} 
                placeholder="Project Name" 
              />
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Project Description"
              />
              <div className="directory-selection">
                <input 
                  value={projectDirectory} 
                  placeholder="Project Directory" 
                  readOnly
                />
                <button onClick={selectDirectory}>Browse</button>
              </div>
              <button onClick={handleCreateProject}>Create Project</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </>
        )}
      </main>
      <footer className="footer">
        <p>Copyright © TaraShield 2023</p>
      </footer>
    </div>
  );
}

export default WelcomePage;