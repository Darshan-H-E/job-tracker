import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import JobCard from './JobCard';

function KanbanColumn({ status, jobs }) {
  return (
    <div className="kanban-column">
      <h3>{status}</h3>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`job-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
            style={{
              background: snapshot.isDraggingOver ? '#d6eaff' : 'transparent',
            }}
          >
            {jobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default KanbanColumn;
