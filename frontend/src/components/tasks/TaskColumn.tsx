import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import type { Task } from '../../features/tasks/tasksTypes';

interface TaskColumnProps {
  title: string;
  status: string;
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (taskId: number) => void;
  users: any[];
}

const TaskColumn = ({ title, status, tasks, onTaskUpdate, onTaskDelete, users }: TaskColumnProps) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
        <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div ref={setNodeRef} className="space-y-3 min-h-[100px]">
        {tasks.length > 0 ? (
          tasks.map((task) => (
         <TaskCard
  key={task.id}
  task={task}
  onUpdate={onTaskUpdate}
  onDelete={onTaskDelete}
  users={users} 
/>

          ))
        ) : (
          <div className="text-center py-6 text-gray-400">
            <p>No tasks in this column</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
