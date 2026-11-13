import Editor from "@monaco-editor/react";

function CodeEditor({ language, code, setCode }) {
  return (
    <div className="editor-box">
      <Editor
        height="400px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
          wordWrap: "on"
        }}
      />
    </div>
  );
}

export default CodeEditor;