// components/DragDropContainer.tsx
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';
import { useAppDispatch } from '../app/hooks';
import { moveTask } from '../features/tasks/tasksSlice'; // Correct named import

export const DragDropContainer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    dispatch(moveTask({
      taskId: draggableId,
      toStatus: destination.droppableId as 'TODO' | 'IN_PROGRESS' | 'DONE'
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  );
};
