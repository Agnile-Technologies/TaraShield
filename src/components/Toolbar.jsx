import React from 'react';
import { useNavigate } from 'react-router-dom';
import ToolbarButton from './ToolbarButton'; // Import ToolbarButton component
import { faArrowLeft, faArrowRight, faFile, faFolderOpen, faSave, faTimes, faUndo, faRedo, faCut, faCopy, faPaste, faTrash, faSearchPlus, faSearchMinus, faSearch, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'; // Using solid icons for better visibility
import './Toolbar.css';

const Toolbar = () => {
    const navigate = useNavigate();

    const handleNavigateBack = () => {
        navigate(-1);
    };

    const handleNavigateForward = () => {
        navigate(1);
    };

    return (
        <div className="toolbar">
            <ToolbarButton icon={faArrowLeft} tooltipText="Back" onClick={handleNavigateBack} />
            <ToolbarButton icon={faArrowRight} tooltipText="Forward" onClick={handleNavigateForward} />
            <div className="divider">|</div>
            <ToolbarButton icon={faFile} tooltipText="New" onClick={() => {}} />
            <ToolbarButton icon={faFolderOpen} tooltipText="Open" onClick={() => {}} />
            <ToolbarButton icon={faSave} tooltipText="Save" onClick={() => {}} />
            <ToolbarButton icon={faTimes} tooltipText="Close" onClick={() => {}} />
            <ToolbarButton icon={faUndo} tooltipText="Undo" onClick={() => {}} />
            <ToolbarButton icon={faRedo} tooltipText="Redo" onClick={() => {}} />
            <ToolbarButton icon={faCut} tooltipText="Cut" onClick={() => {}} />
            <ToolbarButton icon={faCopy} tooltipText="Copy" onClick={() => {}} />
            <ToolbarButton icon={faPaste} tooltipText="Paste" onClick={() => {}} />
            <ToolbarButton icon={faTrash} tooltipText="Delete" onClick={() => {}} />
            <ToolbarButton icon={faSearchPlus} tooltipText="Zoom In" onClick={() => {}} />
            <ToolbarButton icon={faSearchMinus} tooltipText="Zoom Out" onClick={() => {}} />
            <ToolbarButton icon={faSearch} tooltipText="Find" onClick={() => {}} />
            <ToolbarButton icon={faExchangeAlt} tooltipText="Replace" onClick={() => {}} />
            {/* Additional buttons or icons for common actions can be added here */}
        </div>
    );
};

export default Toolbar;