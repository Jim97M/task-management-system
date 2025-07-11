package com.backend.service;

import com.backend.domain.Task;
import com.backend.enums.TaskPriority;
import com.backend.enums.TaskStatus;
import com.backend.payload.request.CreateTaskRequest;
import com.backend.payload.request.UpdateTaskRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TaskService {
    ResponseEntity<?> createTask(CreateTaskRequest request);

    ResponseEntity<?> updateTask(UpdateTaskRequest request, Long taskId);

    ResponseEntity<?> getTasks();

    ResponseEntity<?> deleteTask(Long taskId);

    ResponseEntity<TaskPriority> getTaskPriority();

    ResponseEntity<?> getTaskById(Long taskId);

    List<Task> getTasksByAssigneeAndStatus(Long assigneeId, TaskStatus status);
}
