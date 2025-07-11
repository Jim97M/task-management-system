import { vi } from 'vitest';
import { setupTestStore } from '../../test-utils';
import { tasksApi } from '../../../features/tasks/tasksApi';
import type { Task } from '../../../features/tasks/tasksTypes';

declare global {
  function createMockResponse(data: any, status?: number): Response;
}

const store = setupTestStore();

function createMockResponse(data?: any, status: number = 200): Response {
  const hasNoContent = status === 204 || data === undefined;
  return new Response(
    hasNoContent ? undefined : JSON.stringify(data),
    {
      status,
      headers: hasNoContent
        ? {}
        : { 'Content-Type': 'application/json' },
    }
  );
}


describe('tasksApi', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Description',
    status: 'TODO',
    priority: 'MEDIUM',
    createdAt: [2023, 10, 15, 12, 30, 0],
    updatedAt: [2023, 10, 15, 12, 30, 0],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('getTasks returns tasks', async () => {
    global.fetch = vi.fn().mockResolvedValue(
      createMockResponse([mockTask])
    );

    const result = await store.dispatch(tasksApi.endpoints.getTasks.initiate());
    expect(result.data).toEqual([mockTask]);
  });

test('createTask with auth token', async () => {
  localStorage.setItem('token', 'test-token');

  const newTask = {
    title: 'New Task',
    description: 'New Description',
    status: 'TODO',
    priority: 'HIGH',
  };

  global.fetch = vi.fn()
    .mockResolvedValueOnce(createMockResponse(mockTask, 201))
    .mockResolvedValueOnce(createMockResponse([mockTask]));

  const result = await store.dispatch(
    tasksApi.endpoints.createTask.initiate(newTask)
  );
  const createTaskCall = (global.fetch as any).mock.calls.find((call: any) => 
    call[0].includes('/tasks') && call[1]?.method === 'POST'
  );
  
  expect(createTaskCall).toBeDefined();
  
  const [url, options] = createTaskCall;
  expect(url).toEqual(expect.stringContaining('/tasks'));
  expect(options).toEqual(expect.objectContaining({
    method: 'POST',
    headers: expect.objectContaining({
      Authorization: 'Bearer test-token',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(newTask),
  }));
});
  test('updateTask', async () => {
    const updatedTask = {
      id: 1,
      title: 'Updated Title',
      description: 'Updated Description',
      status: 'DONE',
      priority: 'LOW',
    };

    global.fetch = vi.fn().mockResolvedValue(
      createMockResponse(updatedTask)
    );

    const result = await store.dispatch(
      tasksApi.endpoints.updateTask.initiate(updatedTask)
    );

    expect(result.data).toEqual(updatedTask);
  });


  test('getAssignableUsers', async () => {
    const mockUsers = [
      { id: 1, username: 'user1', email: 'u1@example.com' },
      { id: 2, username: 'user2', email: 'u2@example.com' },
    ];

    global.fetch = vi.fn().mockResolvedValue(
      createMockResponse(mockUsers)
    );

    const result = await store.dispatch(tasksApi.endpoints.getAssignableUsers.initiate());
    expect(result.data).toEqual(mockUsers);
  });
});
