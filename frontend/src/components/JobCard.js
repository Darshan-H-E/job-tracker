import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

function JobCard({ job, index }) {
  const getStatusClass = (status) => {
    if (!status) return '';
    return `status-${status.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const formatJobId = (id) => {
    return id ? id.substring(0, 5) : 'N/A';
  }

  return (
    <Draggable draggableId={job.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`job-card ${getStatusClass(job.status)} ${snapshot.isDragging ? 'dragging' : ''}`}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <h4 className="job-card-title">{job.jobTitle || 'Untitled Job'}</h4>
          
          <div className="job-card-detail">
            <span className="material-icons job-card-icon">description</span>
            <p className="job-description">{job.description}</p>
          </div>

          <div className="job-card-detail">
            <span className="material-icons job-card-icon">person</span>
            <p>{job.customerName}</p>
          </div>
          
          <div className="job-card-detail">
            <span className="material-icons job-card-icon">tag</span>
            <p className="job-id-text">{formatJobId(job.id)}</p>
          </div>

          <span className={`status-text ${getStatusClass(job.status)}`}>
            {job.status}
          </span>
        </div>
      )}
    </Draggable>
  );
}

export default JobCard;
