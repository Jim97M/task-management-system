import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Task, User } from '../../features/tasks/tasksTypes';
import AssigneeDropdown from './AssigneeDropdown';
import { Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: number) => void;
  users: any[];
}


function formatLocalDateArray(dateArray: number[]): string {
  if (!Array.isArray(dateArray) || dateArray.length < 6) return 'Invalid date';

  const [year, month, day, hour, minute, second] = dateArray;
  const date = new Date(year, month - 1, day, hour, minute, second);

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const TaskCard = ({ task, onUpdate, onDelete, users }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  console.log('Users available:', users);


  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: String(task.id),
    data: { task },
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: isDragging ? 100 : 0,
  };

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  return (
   <div ref={setNodeRef} style={style} className={`mb-3`}>
  <div
    {...attributes}
    {...listeners}
    className="cursor-move"
  >
    <h3 className="font-bold text-lg">{task.title}</h3>
  </div> 
   <div
        className={`bg-white rounded-lg shadow p-4 border-l-4 relative ${
          task.status === 'TODO' ? 'border-blue-500' :
          task.status === 'IN_PROGRESS' ? 'border-yellow-500' :
          'border-green-500'
        }`}
      >
        {isEditing ? (
        <div className="space-y-2">
  <input
    className="w-full p-2 border rounded"
    value={editedTask.title}
    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
  />
  <textarea
    className="w-full p-2 border rounded"
    value={editedTask.description}
    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
  />
  <select
    className="w-full p-2 border rounded"
    value={editedTask.priority}
    onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value as Task['priority'] })}
  >
    <option value="LOW">Low</option>
    <option value="MEDIUM">Medium</option>
    <option value="HIGH">High</option>
  </select>
<AssigneeDropdown
  task={editedTask}
  users={users}
  onAssign={(user) => setEditedTask({ ...editedTask, assignee: user })}
/>


  <div className="flex justify-end space-x-2">
    <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setIsEditing(false)}>Cancel</button>
    <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleSave}>Save</button>
  </div>
</div>

        ) : (
          <div>
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{task.title}</h3>
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete task"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <p className="text-gray-600 my-2">{task.description}</p>
            <p className="text-sm text-gray-700">Priority: {task.priority}</p>

            {task.createdAt && (
              <p className="text-sm text-gray-500 mb-2">
                Created: {formatLocalDateArray(task.createdAt)}
              </p>
            )}
            <div className="flex items-center justify-between mt-3">
           <AssigneeDropdown
  task={task}
  users={users}
  onAssign={(user) => onUpdate({ ...task, assignee: user })}
/>

              <button className="text-blue-500 hover:text-blue-700" onClick={() => setIsEditing(true)}>Edit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
