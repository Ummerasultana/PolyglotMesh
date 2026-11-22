package com.PolyglotMesh.service;

import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Value;
import org.springframework.stereotype.Service;

import java.util.concurrent.*;

@Service
public class PolyglotExecutionService {

    private static final long TIMEOUT_SECONDS = 5;

    public String executeJavaScript(String code) {

        ExecutorService executor = Executors.newSingleThreadExecutor();

        try {
            Future<String> future = executor.submit(() -> {

                try (Context context = Context.newBuilder("js")
                        .allowHostAccess(org.graalvm.polyglot.HostAccess.NONE)
                        .allowHostClassLookup(className -> false)
                        .allowIO(false)
                        .allowNativeAccess(false)
                        .allowCreateThread(false)
                        .build()) {

                    Value result = context.eval("js", code);

                    return result.toString();
                }
            });

            return future.get(TIMEOUT_SECONDS, TimeUnit.SECONDS);

        } catch (TimeoutException e) {

            return "Execution error: Code execution timed out.";

        } catch (Exception e) {

            return "Execution error: " + e.getMessage();

        } finally {

            executor.shutdownNow();
        }
    }
}