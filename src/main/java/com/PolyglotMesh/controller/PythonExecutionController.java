package com.PolyglotMesh.controller;

import com.PolyglotMesh.service.PythonExecutionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/execute")
public class PythonExecutionController {

    private final PythonExecutionService pythonExecutionService;

    public PythonExecutionController(PythonExecutionService pythonExecutionService) {
        this.pythonExecutionService = pythonExecutionService;
    }

    @PostMapping("/python")
    public String executePython(@RequestBody String code) {
        return pythonExecutionService.executePython(code);
    }
}