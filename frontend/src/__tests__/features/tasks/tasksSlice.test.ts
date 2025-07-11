
import tasksReducer, { updateTask, deleteTask, moveTask, setFilter } from '../../../features/tasks/tasksSlice';
import type { Task } from '../../../features/tasks/tasksTypes';

const initialState = {
  tasks: [] as Task[],
  filter: {
    search: '',
    status: null,
    assignee: null,
  },
};


describe('tasksSlice', () => {
  it('should handle initial state', () => {
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

it('should handle updateTask', () => {
  const now = new Date();
  const dateArray = [
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  ] as number[];

  const startState = {
    ...initialState,
    tasks: [
      {
        id: 1,
        title: 'Test',
        description: 'Desc',
        status: 'TODO' as const,
        priority: 'MEDIUM' as const,
        createdAt: dateArray,
        updatedAt: dateArray,
      },
    ],
  };

  const updated: Task = {
    ...startState.tasks[0],
    title: 'Updated',
    description: 'Updated',
    status: 'DONE',
    priority: 'HIGH',
    createdAt: dateArray,
    updatedAt: dateArray,
    id: 1,
  };

  const actual = tasksReducer(startState, updateTask(updated));
  expect(actual.tasks[0].title).toBe('Updated');
});


  it('should handle deleteTask', () => {
    const startState = {
      ...initialState,
      tasks: [
        {
          id: '1',
          title: 'Test',
          description: 'Desc',
          status: 'TODO',
          priority: 'MEDIUM',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as unknown as Task,
      ],
    };
    const actual = tasksReducer(startState, deleteTask('1'));
    expect(actual.tasks).toHaveLength(0);
  });

  it('should handle moveTask', () => {
    const startState = {
      ...initialState,
      tasks: [
        {
          id: '1',
          title: 'Test',
          description: 'Desc',
          status: 'TODO',
          priority: 'MEDIUM',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as unknown as Task,
      ],
    };
    const actual = tasksReducer(startState, moveTask({ taskId: '1', toStatus: 'DONE' }));
    expect(actual.tasks[0].status).toBe('DONE');
  });

  it('should handle setFilter', () => {
    const filters = { search: 'bug', status: 'DONE', assignee: '2' };
    const actual = tasksReducer(initialState, setFilter(filters));
    expect(actual.filter).toEqual(filters);
  });
});
