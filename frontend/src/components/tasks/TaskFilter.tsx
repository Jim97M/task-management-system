import { useState } from 'react';

interface TaskFilterProps {
  onFilterChange: (filters: { 
    search?: string; 
    status?: string | null; 
    assignee?: string | null 
  }) => void;
}

const TaskFilter = ({ onFilterChange }: TaskFilterProps) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({ search: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onFilterChange({ status: e.target.value || null });
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        placeholder="Search tasks..."
        className="px-3 py-2 border rounded"
        value={search}
        onChange={handleSearchChange}
      />
      <select
        className="px-3 py-2 border rounded"
        value={status}
        onChange={handleStatusChange}
      >
        <option value="">All Statuses</option>
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
    </div>
  );
};

export default TaskFilter;