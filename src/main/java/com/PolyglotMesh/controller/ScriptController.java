package com.PolyglotMesh.controller;

import com.PolyglotMesh.entity.Script;
import com.PolyglotMesh.service.ScriptService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scripts")
public class ScriptController {

    private final ScriptService scriptService;

    public ScriptController(ScriptService scriptService) {
        this.scriptService = scriptService;
    }

    // Save a new script
    @PostMapping
    public ResponseEntity<Script> createScript(
            @Valid @RequestBody Script script) {

        Script savedScript = scriptService.saveScript(script);
        return ResponseEntity.ok(savedScript);
    }

    // Get all scripts
    @GetMapping
    public ResponseEntity<List<Script>> getAllScripts() {
        return ResponseEntity.ok(scriptService.getAllScripts());
    }

    // Get one script
    @GetMapping("/{id}")
    public ResponseEntity<Script> getScriptById(@PathVariable Long id) {
        return scriptService.getScriptById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update a script
    @PutMapping("/{id}")
    public ResponseEntity<Script> updateScript(
            @PathVariable Long id,
            @Valid @RequestBody Script script) {

        try {
            Script updatedScript = scriptService.updateScript(id, script);
            return ResponseEntity.ok(updatedScript);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a script
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScript(@PathVariable Long id) {
        scriptService.deleteScript(id);
        return ResponseEntity.noContent().build();
    }
}