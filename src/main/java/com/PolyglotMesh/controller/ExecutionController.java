package com.PolyglotMesh.controller;

import com.PolyglotMesh.service.PolyglotExecutionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/execute")
public class ExecutionController {

    private final PolyglotExecutionService executionService;

    public ExecutionController(PolyglotExecutionService executionService) {
        this.executionService = executionService;
    }

    @PostMapping("/javascript")
    public String executeJavaScript(@RequestBody String code) {
        return executionService.executeJavaScript(code);
    }
}