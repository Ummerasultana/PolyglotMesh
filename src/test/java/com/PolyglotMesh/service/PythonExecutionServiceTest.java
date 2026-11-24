package com.PolyglotMesh.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PythonExecutionServiceTest {

    private final PythonExecutionService executionService =
            new PythonExecutionService();

    @Test
    void shouldExecuteNormalPython() {
        String result = executionService.executePython("10 * 5");

        assertEquals("50", result);
    }

    @Test
    void shouldBlockJavaHostAccess() {
        String result = executionService.executePython(
                "import java.lang.System"
        );

        assertTrue(result.contains("Execution error"));
    }

    @Test
    void shouldBlockFileAccess() {
        String result = executionService.executePython(
                "open('test.txt', 'w').write('HACKED')"
        );

        assertTrue(result.contains("Execution error"));
    }

    @Test
    void shouldHandleInvalidPython() {
        String result = executionService.executePython(
                "print("
        );

        assertTrue(result.contains("Execution error"));
    }

    @Test
    void shouldHandleRuntimeError() {
        String result = executionService.executePython(
                "1 / 0"
        );

        assertTrue(result.contains("Execution error"));
    }

    @Test
    void shouldBlockInfiniteLoop() {
        String result = executionService.executePython(
                "while True: pass"
        );

        assertTrue(
                result.equals("Execution error: Code execution timed out.")
                        || result.equals("Execution error: Resource limit exceeded.")
        );
    }
}