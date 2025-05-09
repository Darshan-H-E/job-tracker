// client/src/components/JobCard.js
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

// No status changer here, status changes via drag-and-drop or column interaction
function JobCard({ job, index, onStatusChange }) { // onStatusChange is for non-dnd updates
  const STATUSES = ["Not Yet Started", "In Progress", "Completed"];

  // Fallback for non-DND status change (optional, if you want a dropdown too)
  const handleStatusSelectChange = (e) => {
    onStatusChange(job.id, e.target.value);
  };

  return (
    <Draggable draggableId={job.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`job-card ${snapshot.isDragging ? 'dragging' : ''}`}
          style={{
            ...provided.draggableProps.style,
            // any other inline styles
          }}
        >
          <h4>{job.customerName}</h4>
          <p>{job.description}</p>
          <p><strong>Status:</strong> {job.status}</p>
          {/* Optional: Fallback status changer if not using DND for everything */}
          {/* <div className="status-changer">
            <select value={job.status} onChange={handleStatusSelectChange}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div> */}
        </div>
      )}
    </Draggable>
  );
}

export default JobCard;
