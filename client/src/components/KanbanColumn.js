// client/src/components/KanbanColumn.js
import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import JobCard from './JobCard';

function KanbanColumn({ status, jobs, onStatusChange }) {
  return (
    <div className="kanban-column">
      <h3>{status}</h3>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="job-list"
            style={{
              background: snapshot.isDraggingOver ? 'lightblue' : 'inherit',
              paddingBottom: '10px', // Ensure space for placeholder
              minHeight: '100px' // Ensure column is droppable even if empty
            }}
          >
            {jobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} onStatusChange={onStatusChange} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default KanbanColumn;
