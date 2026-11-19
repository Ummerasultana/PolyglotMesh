package com.PolyglotMesh.service;

import com.PolyglotMesh.entity.Script;
import com.PolyglotMesh.repository.ScriptRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScriptService {

    private final ScriptRepository scriptRepository;

    public ScriptService(ScriptRepository scriptRepository) {
        this.scriptRepository = scriptRepository;
    }

    public Script saveScript(Script script) {
        return scriptRepository.save(script);
    }

    public List<Script> getAllScripts() {
        return scriptRepository.findAll();
    }

    public Optional<Script> getScriptById(Long id) {
        return scriptRepository.findById(id);
    }

    public Script updateScript(Long id, Script updatedScript) {
        Script existingScript = scriptRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Script not found with id: " + id));

        existingScript.setName(updatedScript.getName());
        existingScript.setLanguage(updatedScript.getLanguage());
        existingScript.setCode(updatedScript.getCode());

        return scriptRepository.save(existingScript);
    }

    public void deleteScript(Long id) {
        scriptRepository.deleteById(id);
    }
}