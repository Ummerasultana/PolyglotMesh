import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import OutputConsole from "./components/OutputConsole";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState('print("Hello PolyglotMesh!")');
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("Ready");

  const handleRun = () => {
    setStatus("Frontend ready");
    setOutput(
      "Frontend is working! Backend connection will be added later."
    );
  };

  const handleClear = () => {
    setCode("");
    setOutput("");
    setStatus("Ready");
  };

  const languages = [
    { label: "Python", value: "python" },
    { label: "JavaScript", value: "javascript" },
    { label: "Java", value: "java" }
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>PolyglotMesh</h1>
        <p>Multi-Language Runtime Sandbox</p>
      </header>

      <main className="dashboard">
        <div className="toolbar">
          <div className="language-tabs">
            {languages.map((item) => (
              <button
                key={item.value}
                className={language === item.value ? "active" : ""}
                onClick={() => setLanguage(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="actions">
            <button className="clear-btn" onClick={handleClear}>
              Clear
            </button>
            <button className="run-btn" onClick={handleRun}>
              ▶ Run
            </button>
          </div>
        </div>

        <h3>Code Editor</h3>

        <CodeEditor
          language={language}
          code={code}
          setCode={setCode}
        />

        <OutputConsole output={output} status={status} />
      </main>

      <footer>
        PolyglotMesh | Built with React and Monaco Editor
      </footer>
    </div>
  );
}

export default App;