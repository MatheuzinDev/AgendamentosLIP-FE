import React from 'react';
import './Spinner.css';

const Spinner = () => (
  <div className="spinner-overlay">
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  </div>
);

export default Spinner;