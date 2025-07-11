// DroppableWrapper.tsx
import { Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

const DroppableWrapper = (props: any) => {
  // This connects the component to Redux
  useSelector(state => state); // Dummy selector to connect to store
  
  return <Droppable {...props} />;
};

export default DroppableWrapper;
