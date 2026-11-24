package com.PolyglotMesh.service;

import jakarta.annotation.PreDestroy;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Engine;
import org.graalvm.polyglot.PolyglotException;
import org.graalvm.polyglot.ResourceLimits;
import org.graalvm.polyglot.Value;
import org.springframework.stereotype.Service;

import java.util.concurrent.*;

@Service
public class PythonExecutionService {

    private static final long TIMEOUT_SECONDS = 5;
    private static final long STATEMENT_LIMIT = 1_000_000;

    /*
     * Shared GraalVM Engine.
     *
     * The engine is created once instead of creating the
     * complete Python runtime for every request.
     */
    private final Engine engine = Engine.newBuilder().build();

    public String executePython(String code) {

        ExecutorService executor = Executors.newSingleThreadExecutor();

        try {

            Future<String> future = executor.submit(() -> {

                ResourceLimits limits = ResourceLimits.newBuilder()
                        .statementLimit(STATEMENT_LIMIT, null)
                        .build();

                try {

                    try (Context context = Context.newBuilder("python")
                            .engine(engine)
                            .allowHostAccess(org.graalvm.polyglot.HostAccess.NONE)
                            .allowHostClassLookup(className -> false)
                            .allowIO(false)
                            .allowNativeAccess(false)
                            .allowCreateThread(false)
                            .resourceLimits(limits)
                            .build()) {

                        Value result = context.eval("python", code);

                        return result.toString();
                    }

                } catch (PolyglotException e) {

                    if (e.isResourceExhausted() || e.isCancelled()) {
                        return "Execution error: Resource limit exceeded.";
                    }

                    return "Execution error: " + e.getMessage();

                } catch (Exception e) {

                    return "Execution error: " + e.getMessage();
                }
            });

            return future.get(TIMEOUT_SECONDS, TimeUnit.SECONDS);

        } catch (TimeoutException e) {

            return "Execution error: Code execution timed out.";

        } catch (InterruptedException e) {

            Thread.currentThread().interrupt();
            return "Execution error: Execution interrupted.";

        } catch (ExecutionException e) {

            Throwable cause = e.getCause();

            if (cause instanceof PolyglotException polyglotException) {

                if (polyglotException.isResourceExhausted()
                        || polyglotException.isCancelled()) {

                    return "Execution error: Resource limit exceeded.";
                }

                return "Execution error: " + polyglotException.getMessage();
            }

            return "Execution error: " + cause.getMessage();

        } finally {

            executor.shutdownNow();
        }
    }

    @PreDestroy
    public void shutdownEngine() {
        engine.close();
    }
}