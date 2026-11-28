import { useState, useEffect, useCallback } from "react";
import CodeEditor from "./components/CodeEditor";
import OutputConsole from "./components/OutputConsole";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("python");

  const [codes, setCodes] = useState({
    python: 'print("Hello PolyglotMesh!")',
    javascript: 'console.log("Hello PolyglotMesh!");',
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello PolyglotMesh!");
    }
}`
  });

  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("Ready");
  const [executionTime, setExecutionTime] = useState(null);

  const code = codes[language];

  const lineCount = code.split("\n").length;
  const characterCount = code.length;

  // Update editor code
  const handleCodeChange = (newCode) => {
    setCodes((previousCodes) => ({
      ...previousCodes,
      [language]: newCode
    }));
  };

  // Change language
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setOutput("");
    setStatus("Ready");
    setExecutionTime(null);
  };

  // Run code validation
  const handleRun = useCallback(() => {
    setOutput("");
    setExecutionTime(null);

    if (!code.trim()) {
      setStatus("Validation Error");
      setOutput(
        "Error: No code found!\nPlease write some code before clicking Run."
      );
      return;
    }

    setStatus("Checking...");

    setOutput(
      "Code validation successful!\n\n" +
      "Selected Language: " + language.toUpperCase() +
      "\nLines of Code: " + lineCount +
      "\nCharacters: " + characterCount +
      "\n\nWaiting for backend integration...\n" +
      "Actual code execution is not connected yet."
    );
  }, [code, language, lineCount, characterCount]);

  // Clear editor
  const handleClear = () => {
    setCodes((previousCodes) => ({
      ...previousCodes,
      [language]: ""
    }));

    setOutput("");
    setStatus("Ready");
    setExecutionTime(null);
  };

  // Save code
  const handleSave = useCallback(() => {
    try {
      const savedCodes = JSON.parse(
        localStorage.getItem("polyglotmesh_codes") || "{}"
      );

      savedCodes[language] = code;

      localStorage.setItem(
        "polyglotmesh_codes",
        JSON.stringify(savedCodes)
      );

      setStatus("Saved");
      setOutput(language.toUpperCase() + " code saved successfully!");
      setExecutionTime(null);

    } catch (error) {
      setStatus("Save Failed");
      setOutput("Unable to save code: " + error.message);
    }
  }, [language, code]);

  // Load code
  const handleLoad = useCallback(() => {
    try {
      const savedCodes = JSON.parse(
        localStorage.getItem("polyglotmesh_codes") || "{}"
      );

      if (
        Object.prototype.hasOwnProperty.call(savedCodes, language) &&
        typeof savedCodes[language] === "string"
      ) {
        setCodes((previousCodes) => ({
          ...previousCodes,
          [language]: savedCodes[language]
        }));

        setStatus("Loaded");
        setOutput(language.toUpperCase() + " code loaded successfully!");
      } else {
        setStatus("No Saved Code");
        setOutput("No saved code found for " + language.toUpperCase() + ".");
      }

      setExecutionTime(null);

    } catch (error) {
      setStatus("Load Failed");
      setOutput("Unable to load code: " + error.message);
    }
  }, [language]);

  // Clear output
  const handleClearOutput = () => {
    setOutput("");
    setStatus("Ready");
    setExecutionTime(null);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboardShortcuts = (event) => {
      if (!event.ctrlKey) return;

      const key = event.key.toLowerCase();

      if (key === "enter") {
        event.preventDefault();
        handleRun();
      }

      if (key === "s") {
        event.preventDefault();
        handleSave();
      }

      if (key === "l" && event.shiftKey) {
        event.preventDefault();
        handleLoad();
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcuts);

    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcuts);
    };
  }, [handleRun, handleSave, handleLoad]);

  const languages = [
    { label: "Python", value: "python" },
    { label: "JavaScript", value: "javascript" },
    { label: "Java", value: "java" }
  ];

  return (
    <div className="app">

      <header className="header">
        <div className="header-content">
          <div className="brand">
            <div className="brand-icon">PM</div>
            <div>
              <h1>PolyglotMesh</h1>
              <p>Multi-Language Runtime Sandbox</p>
            </div>
          </div>

          <div className="header-status">
            <span className="status-dot"></span>
            Frontend Active
          </div>
        </div>
      </header>

      <main className="dashboard">

        <div className="welcome-section">
          <div>
            <h2>Code Playground</h2>
            <p>Write, manage and prepare your code for execution.</p>
          </div>
          <span className="project-tag">Developer Workspace</span>
        </div>

        <div className="toolbar">

          <div className="language-tabs">
            {languages.map((item) => (
              <button
                key={item.value}
                className={language === item.value ? "active" : ""}
                onClick={() => handleLanguageChange(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="actions">
            <button className="clear-btn" onClick={handleClear}>
              Clear
            </button>

            <button className="save-btn" onClick={handleSave}>
              Save Code
            </button>

            <button className="load-btn" onClick={handleLoad}>
              Load Code
            </button>

            <button className="run-btn" onClick={handleRun}>
              ▶ Run
            </button>
          </div>
        </div>

        <section className="editor-section">
          <div className="section-heading">
            <div>
              <h3>Code Editor</h3>
              <p>Currently editing: {language.toUpperCase()}</p>
            </div>

            <span className="editor-badge">
              {language.toUpperCase()}
            </span>
          </div>

          <CodeEditor
            language={language}
            code={code}
            setCode={handleCodeChange}
          />

          <div className="code-stats">
            <span>Language: {language}</span>
            <span>Lines: {lineCount}</span>
            <span>Characters: {characterCount}</span>
          </div>
        </section>

        <section className="output-section">
          <div className="section-heading">
            <div>
              <h3>Output Console</h3>
              <p>Execution messages and validation results</p>
            </div>

            <button
              className="console-clear-btn"
              onClick={handleClearOutput}
            >
              Clear Output
            </button>
          </div>

          <OutputConsole
            output={output}
            status={status}
            executionTime={executionTime}
          />
        </section>

        <section className="shortcuts">
          <h3>Keyboard Shortcuts</h3>

          <div className="shortcut-list">
            <span><kbd>Ctrl</kbd> + <kbd>Enter</kbd> Run</span>
            <span><kbd>Ctrl</kbd> + <kbd>S</kbd> Save</span>
            <span>
              <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> Load
            </span>
          </div>
        </section>

      </main>

      <footer>
        <strong>PolyglotMesh</strong>
        <span>Built with React and Monaco Editor</span>
      </footer>

    </div>
  );
}

export default App;