// client/src/components/KanbanBoard.js
import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from './KanbanColumn';

const STATUSES = ["Not Yet Started", "In Progress", "Completed"];

function KanbanBoard({ jobs, onJobStatusChange }) {

  const handleOnDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside a droppable area

    const { source, destination, draggableId } = result;

    // If dropped in the same column and same position, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Call the parent function to update the job's status
    // draggableId is the job.id
    // destination.droppableId is the new status
    onJobStatusChange(draggableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="kanban-board">
        {STATUSES.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            jobs={jobs.filter(job => job.status === status)}
            onStatusChange={onJobStatusChange} // Pass this down if using non-DND updates
          />
        ))}
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
