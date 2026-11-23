package com.PolyglotMesh.service;

import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.PolyglotException;
import org.graalvm.polyglot.ResourceLimits;
import org.graalvm.polyglot.Value;
import org.springframework.stereotype.Service;

import java.util.concurrent.*;

@Service
public class PolyglotExecutionService {

    private static final long TIMEOUT_SECONDS = 5;
    private static final long STATEMENT_LIMIT = 1_000_000;

    public String executeJavaScript(String code) {

        ExecutorService executor = Executors.newSingleThreadExecutor();

        try {

            Future<String> future = executor.submit(() -> {

                ResourceLimits limits = ResourceLimits.newBuilder()
                        .statementLimit(STATEMENT_LIMIT, null)
                        .build();

                try (Context context = Context.newBuilder("js")
                        .allowHostAccess(org.graalvm.polyglot.HostAccess.NONE)
                        .allowHostClassLookup(className -> false)
                        .allowIO(false)
                        .allowNativeAccess(false)
                        .allowCreateThread(false)
                        .resourceLimits(limits)
                        .build()) {

                    try {

                        Value result = context.eval("js", code);

                        return result.toString();

                    } catch (PolyglotException e) {

                        String message = e.getMessage();

                        if (message != null &&
                                (message.contains("Statement count limit")
                                        || message.contains("Resource limit"))) {

                            return "Execution error: Resource limit exceeded.";
                        }

                        if (e.isCancelled()) {
                            return "Execution error: Resource limit exceeded.";
                        }

                        return "Execution error: " + message;
                    }
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