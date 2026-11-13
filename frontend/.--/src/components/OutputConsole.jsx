function OutputConsole({ output, status }) {
  return (
    <div className="console-box">
      <div className="console-heading">
        <span>OUTPUT CONSOLE</span>
        <span>{status}</span>
      </div>

      <pre>
        {output || "Your program output will appear here..."}
      </pre>
    </div>
  );
}

export default OutputConsole;