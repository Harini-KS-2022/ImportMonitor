// src/components/FileStatusMonitor.js
import React from 'react';
import '../FileStatusMonitor.css';

const FileStatusMonitor = ({ totalFiles, successfulFiles, errorFiles }) => {
    return (
        <div className="file-status-monitor">
            <h2>File Pre-Processing Status</h2>
            <div className="status-box">
                <div className="status-item">
                    <span className="status-label">Total Files:</span>
                    <span className="status-value">{totalFiles}</span>
                </div>
                <div className="status-item">
                    <span className="status-label">Successful Files:</span>
                    <span className="status-value">{successfulFiles}</span>
                </div>
                <div className="status-item">
                    <span className="status-label">Error Files:</span>
                    <span className="status-value">{errorFiles}</span>
                </div>
            </div>
        </div>
    );
};

export default FileStatusMonitor;