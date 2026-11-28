function OutputConsole({ output, status, executionTime }) {
  return (
    <div className="console-box">

      <div className="console-heading">
        <span>OUTPUT CONSOLE</span>
        <span className="console-status">{status}</span>
      </div>

      <pre>
        {output || "Your program output will appear here..."}
      </pre>

      {executionTime !== null && executionTime !== undefined && (
        <div className="execution-time">
          Execution Time: {executionTime} ms
        </div>
      )}

    </div>
  );
}

export default OutputConsole;