import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'reactstrap'; // Assuming Reactstrap is used in the project for consistency
import { useState } from 'react';

const ToolbarButton = ({ icon, tooltipText, onClick }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };

  return (
    <>
      <div id={`Tooltip-${icon.iconName}`} onClick={onClick} style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        target={`Tooltip-${icon.iconName}`}
        toggle={toggleTooltip}
      >
        {tooltipText}
      </Tooltip>
    </>
  );
};

export default ToolbarButton;