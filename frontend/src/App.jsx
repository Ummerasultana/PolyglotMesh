import { useState, useEffect, useCallback } from "react";
import CodeEditor from "./components/CodeEditor";
import OutputConsole from "./components/OutputConsole";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("python");

  // Separate code storage for each language
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

  // Current editor code
  const code = codes[language];

  // Code statistics
  const lineCount = code.split("\n").length;
  const characterCount = code.length;

  // Update code
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
  };

  // Run with input validation
  const handleRun = useCallback(() => {
    setOutput("");

    if (!code.trim()) {
      setStatus("Validation Error");
      setOutput(
        "Error: No code found!\nPlease write some code before clicking Run."
      );
      return;
    }

    setStatus("Ready to Execute");

    setOutput(
      "Your code has passed input validation!\n\n" +
      "Selected Language: " + language.toUpperCase() +
      "\nLines of Code: " + lineCount +
      "\nCharacters: " + characterCount +
      "\n\nWaiting for backend connection..."
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
      setOutput(
        language.toUpperCase() + " code saved successfully!"
      );
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
        setOutput(
          language.toUpperCase() + " code loaded successfully!"
        );
      } else {
        setStatus("No Saved Code");
        setOutput(
          "No saved code found for " + language.toUpperCase() + "."
        );
      }
    } catch (error) {
      setStatus("Load Failed");
      setOutput("Unable to load code: " + error.message);
    }
  }, [language]);

  // Clear only the output console
  const handleClearOutput = () => {
    setOutput("");
    setStatus("Ready");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboardShortcuts = (event) => {
      if (!event.ctrlKey) return;

      const key = event.key.toLowerCase();

      // Ctrl + Enter = Run
      if (key === "enter") {
        event.preventDefault();
        handleRun();
      }

      // Ctrl + S = Save
      if (key === "s") {
        event.preventDefault();
        handleSave();
      }

      // Ctrl + Shift + L = Load
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

      {/* Header */}
      <header className="header">
        <h1>PolyglotMesh</h1>
        <p>Multi-Language Runtime Sandbox</p>
      </header>

      <main className="dashboard">

        {/* Toolbar */}
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

          {/* Action Buttons */}
          <div className="actions">

            <button
              className="clear-btn"
              onClick={handleClear}
              title="Clear current editor"
            >
              Clear
            </button>

            <button
              className="save-btn"
              onClick={handleSave}
              title="Shortcut: Ctrl + S"
            >
              Save Code
            </button>

            <button
              className="load-btn"
              onClick={handleLoad}
              title="Shortcut: Ctrl + Shift + L"
            >
              Load Code
            </button>

            <button
              className="run-btn"
              onClick={handleRun}
              title="Shortcut: Ctrl + Enter"
            >
              ▶ Run
            </button>

          </div>
        </div>

        {/* Editor */}
        <div className="editor-heading">
          <h3>Code Editor - {language}</h3>
          <span className="editor-language">
            {language.toUpperCase()}
          </span>
        </div>

        <CodeEditor
          language={language}
          code={code}
          setCode={handleCodeChange}
        />

        {/* Code Statistics */}
        <div className="code-stats">
          <span>Language: {language}</span>
          <span>Lines: {lineCount}</span>
          <span>Characters: {characterCount}</span>
        </div>

        {/* Output Console Heading */}
        <div className="console-toolbar">
          <h3>Output Console</h3>

          <button
            className="console-clear-btn"
            onClick={handleClearOutput}
          >
            Clear Output
          </button>
        </div>

        {/* Output Console */}
        <OutputConsole
          output={output}
          status={status}
        />

        {/* Keyboard Shortcut Guide */}
        <div className="shortcuts">
          <h4>Keyboard Shortcuts</h4>
          <div className="shortcut-list">
            <span>Ctrl + Enter : Run</span>
            <span>Ctrl + S : Save</span>
            <span>Ctrl + Shift + L : Load</span>
          </div>
        </div>

      </main>

      <footer>
        PolyglotMesh | Built with React and Monaco Editor
      </footer>

    </div>
  );
}

export default App;