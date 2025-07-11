package com.backend.web;


import com.backend.domain.Task;
import com.backend.enums.TaskStatus;
import com.backend.payload.request.CreateTaskRequest;
import com.backend.payload.request.UpdateTaskRequest;
import com.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@Slf4j
@RequiredArgsConstructor
public class TaskController {

    @Autowired
    TaskService taskService;

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody CreateTaskRequest request) {
           return taskService.createTask(request);
    }

    @PatchMapping("/{taskId}")
    public ResponseEntity<?> updateTask(@RequestBody UpdateTaskRequest request, @PathVariable Long taskId) {
        return taskService.updateTask(request, taskId);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<?> getTask(@PathVariable Long taskId) {
        return taskService.getTaskById(taskId);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        return taskService.deleteTask(taskId);
    }

    @GetMapping
    public ResponseEntity<?> getTasks(
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) Long assigneeId) {

        if (status != null && assigneeId != null) {
            return ResponseEntity.ok(taskService.getTasksByAssigneeAndStatus(assigneeId, status));
        }

        return taskService.getTasks();
    }

}
