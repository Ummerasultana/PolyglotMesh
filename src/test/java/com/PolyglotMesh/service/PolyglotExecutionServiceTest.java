package com.PolyglotMesh.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PolyglotExecutionServiceTest {

    private final PolyglotExecutionService executionService =
            new PolyglotExecutionService();

    @Test
    void shouldExecuteNormalJavaScript() {

        String result = executionService.executeJavaScript("10 * 5");

        assertEquals("50", result);
    }

    @Test
    void shouldBlockHostAccess() {

        String result = executionService.executeJavaScript(
                "Java.type('java.lang.System').getProperty('java.version')"
        );

        assertTrue(result.contains("Execution error"));
    }

    @Test
    void shouldBlockFileAccess() {

        String result = executionService.executeJavaScript(
                "Java.type('java.io.File').listRoots()"
        );

        assertTrue(result.contains("Execution error"));
    }

    @Test
    void shouldHandleInvalidJavaScript() {

        String result = executionService.executeJavaScript(
                "let x = ;"
        );

        assertTrue(result.contains("Execution error"));
    }

    @Test
    void shouldHandleRuntimeError() {

        String result = executionService.executeJavaScript(
                "undefinedVariable"
        );

        assertTrue(result.contains("Execution error"));
    }

    @Test
    void shouldBlockInfiniteLoop() {

        String result = executionService.executeJavaScript(
                "while (true) {}"
        );

        assertEquals(
                "Execution error: Resource limit exceeded.",
                result
        );
    }
}