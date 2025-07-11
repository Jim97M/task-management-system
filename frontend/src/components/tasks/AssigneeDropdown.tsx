import { useState } from 'react';
import type { Task, User } from '../../features/tasks/tasksTypes';

interface AssigneeDropdownProps {
  task: Task;
  users: User[];
  onAssign: (user: User) => void;
}

const AssigneeDropdown = ({ task, users, onAssign }: AssigneeDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
      >
        <span>{task.assignee?.username || 'Unassigned'}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border">
          {users.map(user => (
            <button
              key={user.id}
              onClick={() => {
                onAssign(user);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
            >
              {user.username}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssigneeDropdown;
