package com.backend.service.implementation;

import com.backend.domain.Task;
import com.backend.domain.User;
import com.backend.enums.TaskPriority;
import com.backend.enums.TaskStatus;
import com.backend.payload.request.CreateTaskRequest;
import com.backend.payload.request.UpdateTaskRequest;
import com.backend.repository.TaskRepository;
import com.backend.repository.UserRepository;
import com.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private BaseServiceImpl baseService;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> createTask(CreateTaskRequest request) {

        User currentUser = baseService.getUserFromSecurityContext();

        User assignee = userRepository.findById(request.getAssigneeId()).get();

        Task newTask = new Task();
        newTask.setDescription(request.getDescription());
        newTask.setTitle(request.getTitle());
        newTask.setStatus(request.getStatus());
        newTask.setPriority(request.getPriority());
        newTask.setAssignee(assignee);
        newTask.setCreator(currentUser);
        newTask.setCreatedAt(LocalDateTime.now());

        taskRepository.save(newTask);

        return ResponseEntity.status(HttpStatus.CREATED).body(newTask);
    }

    @Override
    public ResponseEntity<?> updateTask(UpdateTaskRequest request, Long taskId) {
        User currentUser = baseService.getUserFromSecurityContext();

        Task currentTask = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // Only update fields if they are present (not null in request)
        if (request.getTitle() != null) {
            currentTask.setTitle(request.getTitle());
        }

        if (request.getDescription() != null) {
            currentTask.setDescription(request.getDescription());
        }

        if (request.getStatus() != null) {
            currentTask.setStatus(request.getStatus());
        }

        if (request.getPriority() != null) {
            currentTask.setPriority(request.getPriority());
        }

        if (request.getAssigneeId() != null) {
            User assignee = userRepository.findById(request.getAssigneeId())
                    .orElseThrow(() -> new RuntimeException("Assignee not found"));
            currentTask.setAssignee(assignee);
        }

        currentTask.setUpdatedAt(LocalDateTime.now());

        taskRepository.save(currentTask);

        return ResponseEntity.status(HttpStatus.OK).body(currentTask);
    }



    @Override
    public ResponseEntity<?> getTasks() {

        List<Task> tasks = taskRepository.findAll();


        return ResponseEntity.status(HttpStatus.OK).body(tasks);
    }

    @Override
    public ResponseEntity<?> deleteTask(Long taskId) {

        Task currentTask = taskRepository.findById(taskId).get();

        taskRepository.delete(currentTask);

        return ResponseEntity.status(HttpStatus.OK).body("Task has been deleted");
    }



    @Override
    public ResponseEntity<TaskPriority> getTaskPriority() {
        return null;
    }

    @Override
    public ResponseEntity<?> getTaskById(Long taskId) {
        return null;
    }

    @Override
    public List<Task> getTasksByAssigneeAndStatus(Long assigneeId, TaskStatus status) {

        return taskRepository.findByAssigneeIdAndStatus(assigneeId, status);
    }
}
