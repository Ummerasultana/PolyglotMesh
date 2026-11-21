package com.PolyglotMesh.service;

import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Value;
import org.springframework.stereotype.Service;

@Service
public class PolyglotExecutionService {

    public String executeJavaScript(String code) {

        try (Context context = Context.newBuilder("js")
                .allowAllAccess(false)
                .build()) {

            Value result = context.eval("js", code);

            return result.toString();

        } catch (Exception e) {
            return "Execution error: " + e.getMessage();
        }
    }
}